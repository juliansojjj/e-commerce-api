import { request, Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type Usuario = {
    id:number;
    name:string;
    email:string;
    password:string;
    createdAt:string;
    updatedAt:string;
}

export const addUser = async (req:Request,res:Response)=>{
    const {name,email,password} = req.body;

    if(!name.trim() || !email.trim()|| !password.trim()){
        res.status(400).json({msg:'Complete los campos'});
    }
    else { 
        const mail = await User.findOne({where:{email:email}})
        if(mail){
            res.status(409).json({msg:'El usuario existe'});
        }
        else{
            const hashPass = await bcrypt.hash(password,10)
            const user = await User.create({name,email,password:hashPass});
            res.json({user});
        }
    }
} 

export const signInUser = async (req:Request,res:Response)=>{
    const {email,password} = req.body;

    if(!email.trim() || !password.trim()){
        res.status(400).json({msg:'Complete los campos'});
    }
    else { 
        const user = await User.findOne({where:{email:email}})
        if(user){
            const hashPass = user.dataValues.password;
            const resUser = {
                name: user.dataValues.name,
                email:user.dataValues.email,
                role:user.dataValues.role
            }
            await bcrypt.compare(password,hashPass)
            .then((result:any)=>{
                if(result){
                    const token = jwt.sign({email:email},
                        process.env.SECRET_KEY!)
                    res.json({token,resUser});
                    
                    /* para agreagar periodo de tiempo
                    jwt.sign({email:email},
                        process.env.SECRET_KEY!, {expiresIn:'10000'}) 10 segundos medidos en milis
                    */
                }
                else res.status(400).json({msg:'Contraseña incorrecta'})
            })
        }
        else{
            res.status(404).json({msg:'No existe ese usuario'});
        }
    }
} 

export const getUsers = async (req:Request,res:Response)=>{
    const users = await User.findAll();
    res.json({users});
}

export const deleteUser = async (req:Request,res:Response)=>{
    const {id} = req.params;

    const user  = await User.findByPk(id);
    if(user){
        user.destroy().then(()=>res.json(user));
    }
    else { res.status(404).json({msg:'No existe ese usuario'})}
} 