import { request, Request, Response } from "express";
import Cart from "../models/cart";
import Address from '../models/address';
import Order from "../models/order";
import Product from "../models/product";

/*
- Cart controllers
- Address controllers
- Order controllers
*/


//----------CART----------

export const getUserCart = async (req:Request, res:Response)=>{

    const { id } = req.params;
    
  const cart = await Cart.findAll({where:{user_id:id, order_id:'0'}});

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


//----------Address----------

export const getUserAddresses = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const address = await Address.findAll({where:{user_id:id}});

if (address) {
  res.json({ address });
} else {
  res.status(404).json({ msg: "No tiene direcciones" });
}
}

export const getOldAddress = async (req:Request, res:Response)=>{

  const { id } = req.params;
  
const address = await Address.findByPk(id);

if (address) {
  res.json({ address });
} else {
  res.status(404).json({ msg: "No tiene direcciones" });
}
}

export const postAddress = async (req:Request, res:Response)=>{

  const {body} = req;
    if(!body.user_id
      || !body.name_surname
      || !body.phone
      || !body.province
      || !body.postal_code
      || !body.street
      || !body.number) res.status(400).json('Rellene los campos')
    else try {
        const address = await Address.create(body);
        res.json({address});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
}

export const updateAddress = async (req:Request, res:Response)=>{

  const {body} = req;
  const { id } = req.params;
if(!body.user_id
      || !body.name_surname
      || !body.phone
      || !body.province
      || !body.postal_code
      || !body.street
      || !body.number) res.status(400).json('Rellene los campos')
      
else try{
  const address = await Address.findByPk(id);
  if (address){
    await address.update(body)
    .then(()=>res.json(address));
  }
  else return res.status(404).json({msg:'Este producto no estaba en su carrito'});
}catch(err){
  console.log(err);
}

}

export const deleteAddress = async (req:Request, res:Response)=>{

  const { id } = req.params;

try{
  const address = await Address.findByPk(id);
  if (address){
    address.destroy()
    .then(()=>res.json(address));
  }
  else return res.status(404).json({msg:'No existe esa dirección'});
}catch(err){
  console.log(err);
}
}


//----------Orders (ÚNICAMENTE creacion)----------
export const postAfterOrder = async (req:Request, res:Response)=>{
  const {body} = req;
  const { id } = req.params;
  console.log(id)
  console.log(body)
  //comprobacion de campos
  if( !body.id ||
      !body.payment_option ||
      !body.send_option ||
      !body.address_id ||
      !body.items){
        res.status(400).json('Informacion incompleta')
  } else {
    //comprobacion precios y cantidades
    let totalPrice = 0;
    Promise.all(body.items.map((unit:any)=>{
      const promise = new Promise(async(resolve) => {
        await Cart.update({order_id:body.id},{where:{user_id:id,item_id:unit.productId}})
        const product = await Product.findByPk(unit.productId);
        //elimina stock del item
        await product?.update({stock:product.dataValues.stock - unit.amount})
        const itemPrice = unit.amount * product?.dataValues.price
        //suma precio por item al total
        totalPrice += itemPrice
        resolve(true)
      })
      return promise
    }))
    .then(async()=>{
      if(totalPrice && body.send_option !== 'local'){
        const userAddress = await Address.findByPk(body.address_id)
        const userPostalCode = userAddress?.dataValues.postal_code
        const sendPrice = await fetchSendPrice(userPostalCode)
        totalPrice += sendPrice
        try{
          const order = await Order.create({
          id:body.id,
          payment_option:body.payment_option,
          send_option:body.send_option,
          address_id:body.address_id,
          user_id:id,
          user_discharged:0,
          post_dispatched:0,
          user_received:0,
          total_price:totalPrice,
          send_price:sendPrice
        });
        res.json({order});
      }catch(err){
        console.log(err)
      }
      } else if(totalPrice)try{
          const order = await Order.create({
          id:body.id,
          payment_option:body.payment_option,
          send_option:body.send_option,
          address_id:body.address_id,
          user_id:id,
          user_discharged:0,
          post_dispatched:0,
          user_received:0,
          total_price:totalPrice,
          send_price:0
        });

        res.json({order});
      }catch(err){
        console.log(err)
      }
    })
  }
}

const fetchSendPrice = async (userPostalCode:string) => {
  const sendPrice:Promise<number> = new Promise(resolve=>{
    setTimeout(() => {
      // api de correo argentino o distribuidor del local
      resolve(parseInt(userPostalCode) + 150)
    }, 300);
  })
  return sendPrice
};