import { request, Request, Response } from "express";
import Order from "../models/order";
import Cart from "../models/cart";

/*
- Cart controllers
- Address controllers
- Order controllers
*/


//----------CART----------

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

export const getOrderCart = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const order = await Cart.findAll({where:{order_id:id}});

if (order) {
  res.json({ order });
} else {
  res.status(404).json({ msg: "No existe tal carrito" });
}
}