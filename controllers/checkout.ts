import { request, Request, Response } from "express";
import Cart from "../models/cart";

export const getUserCart = async (req:Request, res:Response)=>{

    const { id } = req.params;
    
  const cart = await Cart.findAll({where:{user_id:id}});

  if (cart) {
    res.json({ cart });
  } else {
    res.status(404).json({ msg: "No existe ese usuario" });
  }
}

export const postItemToCart = async (req:Request, res:Response)=>{

  const {body} = req;
    if(!body.user_id || !body.item_id) res.status(400).json('Rellene los campos de usuario e item')
    else try {
        const cart = await Cart.create(body);
        res.json({cart});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
}

export const updateCartItemAmount = async (req:Request, res:Response)=>{

  const {body} = req;
  const { id } = req.params;
  const data = id.split('-')
  const user_id = data[0]
  const item_id = data[1]
  console.log(user_id,item_id)
  
try{
  const cart = await Cart.findOne({where:{user_id:user_id,item_id:item_id}});
  if (cart){
    await cart.update(body)
    .then(()=>res.json(cart));
  }
  else return res.status(404).json({msg:'Este producto no estaba en su carrito'});
}catch(err){
  console.log(err);
}

}

export const deleteCartItem = async (req:Request, res:Response)=>{

  const { id } = req.params;
  const data = id.split('-')
  const user_id = data[0]
  const item_id = data[1]
  console.log(user_id,item_id)
  
try{
  const cart = await Cart.findOne({where:{user_id:user_id,item_id:item_id}});
  if (cart){
    cart.destroy().then(()=>res.json(cart));
  }
  else return res.status(404).json({msg:'Este producto no estaba en su carrito'});
}catch(err){
  console.log(err);
}

}