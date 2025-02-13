import { request, Request, Response } from "express";
import Order from "../models/order";
import Cart from "../models/cart";
import OrderProduct from "../models/order_product";

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

export const getOrderProduct = async (req:Request, res:Response)=>{

  const { id } = req.params;
  console.log(id)
const orderProduct = await OrderProduct.findByPk(id);

if (orderProduct) {
  res.json({ orderProduct });
} else {
  res.status(404).json({ msg: "No existe producto" });
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

export const updateOrderSucursal = async (req:Request, res:Response)=>{
  const {body} = req;
  const { id } = req.params;
  console.log(body)
const order = await Order.findByPk(id);

if (order) {
  order.update(body)
  .then(()=> res.json({ order }))
  .catch(err=> res.status(404).json({ msg: err}))
  
} else {
  res.status(404).json({ msg: "No existe esa orden" });
}
}