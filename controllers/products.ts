import { request, Request, Response } from "express";
import { Op } from "sequelize";
import Favorite from "../models/favorite";
import Product from "../models/product";
import Category from '../models/category';

export const getProducts = async(req:Request, res:Response)=>{
    const products = await Product.findAll();
    const favorites = await Favorite.findAll();
    console.log(favorites)
    res.json(products);
}

export const getProduct = async (req:Request, res:Response)=>{

    const { id } = req.params;
    console.log(id)
  const product = await Product.findByPk(id);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No existe ese producto" });
  }
}

export const getProductByName = async (req:Request, res:Response)=>{
  const { name } = req.params;
  
  const product = await Product.findAll({
    where:{
      name:{[Op.like]:`%${name}%`}
    }})
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No hay ningún valor asociado" });
  }
}

export const getProductByNameInCategory = async (req:Request, res:Response)=>{
  const { name } = req.params;
  const array = name.split('---')
  const category = array[0];
  const search = array[1];
  
  const product = await Product.findAll({
    where:{
      category:category,
      name:{[Op.like]:`%${search}%`}
    }})
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No hay ningún valor asociado" });
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
    res.status(404).json({ msg: "No existe ese producto" });
  }
}

export const getProductsBySN = async (req:Request, res:Response)=>{
  const { SN } = req.params;
  
  const product = await Product.findAll({where:{serialNumber:SN}})
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No existe ese producto" });
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

export const getProductByCategory = async (req:Request, res:Response)=>{
  const { name } = req.params;
  
  const product = await Product.findAll({
    where:{
      category:name
    }})
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ msg: "No hay ningún valor asociado" });
  }
}

export const getProductCategories = async (req:Request, res:Response)=>{
  const category = await Category.findAll()
  if (category) {
    res.json({ category });
  } else {
    res.status(404).json({ msg: "Hubo un error con las categorías" });
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