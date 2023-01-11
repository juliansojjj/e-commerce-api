import { request, Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type Usuario = {
    id:number;
    name:string;
    email:string;
    password:string;
    role:string;
    createdAt?:string;
    updatedAt?:string;
    oAuth:boolean;
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
            const user = await User.create({name,email,password:hashPass,oAuth:0});
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
                id: user.dataValues.id,
                name: user.dataValues.name,
                email:user.dataValues.email,
                role:user.dataValues.role
            }
            await bcrypt.compare(password,hashPass)
            .then((result:any)=>{
                if(result){
                    res.json(resUser);  
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

export const oAuth = async(req:Request, res:Response)=>{
    /* dos casos de REGISTRO
    1- se registra con oAuth y YA tennia una cuenta con ese mail: va a vincular el usuario con el oauth. 
    2- se registra con oAuth y NO tenia una cuenta antes: se crea una cuenta especial

    ÚNICO caso de login
    - verifica si existe la cuenta, SINO la crea, y vamos al paso de arriba
    */ 
    const {name,email} = req.body;

        const user = await User.findOne({where:{email:email}})
        if(user){
            await user.update({oAuth:1})
            .then(()=>res.json({
                id: user.dataValues.id,
                name: user.dataValues.name, 
                email:user.dataValues.email, 
                role:user.dataValues.role}));
        }
        else{
            const user : any = await User.create({name,email,password:'@',oAuth:1, role:'client'});
            res.json({
                id: user.dataValues.id,
                name: user.dataValues.name, 
                email:user.dataValues.email, 
                role:user.dataValues.role});
        }
}