import { request, Request, Response } from "express";
import { Sequelize } from "sequelize";
import Product from "../models/product";

export const getProducts = async(req:Request, res:Response)=>{
    const products = await Product.findAll();
    
    res.json(products);
}

export const getProduct = async (req:Request, res:Response)=>{

    const { id } = req.params;
    console.log(id)
  const product = await Product.findByPk(id);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No existe ese usuario" });
  }
}

export const getProductByType = async (req:Request, res:Response)=>{
  const { name } = req.params;
  const array = name.split('-')
  const type = array[0];
  const id = array[1];
  
  const product = await Product.findOne({where:{id:id, type:type}})
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No existe ese usuario" });
  }
}
export const postProduct = async (req:Request, res:Response)=>{

    const {body} = req;

    if (!body.serialNumber.trim()){res.status(400).json({msg:'Introduzca el número de serie del producto'})}
    else try {
        const serialNumber = await Product.findOne({where:{serialNumber:body.serialNumber}});
        if(serialNumber){res.status(409).json({msg:'El producto ya existe'})}
        else {
            const product = await Product.create(body);
            res.json({product});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
}

export const putProduct = async (req:Request, res:Response)=>{

    const {id} = req.params;
    const {body} = req;

    const product = await Product.findByPk(id);
    if(product) try {
        const serialNumber = await Product.findOne({where:{serialNumber:body.serialNumber}});
        if(serialNumber) res.status(409).json({msg:'El producto ya existe'});
        else{
            await product.update(body)
            .then(()=>res.json(product));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
    else res.status(404).json({msg:'No existe el producto'});
}

export const deleteProduct = async (req:Request, res:Response)=>{

    const { id } = req.params;

  try{
    const product = await Product.findByPk(id);
    if (product){
        product.destroy().then(()=>res.json(product));
    }
    else return res.status(404).json({msg:'No existe el producto'});
  }catch(err){
    console.log(err);
  }
}