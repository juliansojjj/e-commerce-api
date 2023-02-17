import { request, Request, Response } from "express";
import Order from "../models/order";
import Cart from "../models/cart";

/*
- Cart controllers
- Address controllers
- Order controllers
*/


export const getUserOrders = async (req:Request, res:Response)=>{

    const { id } = req.params;
    
  const order = await Order.findAll({where:{user_id:id}});

  if (order) {
    res.json({ order });
  } else {
    res.status(404).json({ msg: "No existe esa orden" });
  }
}

export const getUniqueOrder = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const order = await Order.findByPk(id);

if (order) {
  res.json({ order });
} else {
  res.status(404).json({ msg: "No tiene direcciones" });
}
}

export const getCurrentOrder = async (req:Request, res:Response)=>{

  const { id } = req.params;
  const data = id.split('---')
  const orderId = data[0]
  const orderType = data[1]
  
const order = await Order.findOne({where:{id:orderId,payment_option:orderType, user_discharged:0}})

if (order) {
  res.json({ order });
} else {
  res.status(404).json({ msg: "No existe esa orden" });
}
}

export const getOrderCart = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const order = await Cart.findAll({where:{order_id:id}});

if (order) {
  res.json({ order });
} else {
  res.status(404).json({ msg: "No existe tal carrito" });
}
}

export const fulfillOrderPayment = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const order = await Order.findByPk(id);

if (order) {
  order.update({user_discharged:1})
  .then(()=> res.json({ order }))
  .catch(err=> res.status(404).json({ msg: err}))
  
} else {
  res.status(404).json({ msg: "No existe esa orden" });
}
}