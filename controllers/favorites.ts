import { request, Request, Response } from "express";
import Favorite from "../models/favorite";

export const getUserFavorites = async (req:Request, res:Response)=>{

    const { id } = req.params;
    
  const favorite = await Favorite.findAll({where:{user_id:id}});

  if (favorite) {
    res.json({ favorite });
  } else {
    res.status(404).json({ msg: "No existe ese usuario" });
  }
}
export const postFavorite = async (req:Request, res:Response)=>{

    const {body} = req;
    if(!body.user_id || !body.item_id) res.status(400).json('Rellene los campos de usuario e item')
    else try {
        const product = await Favorite.create(body);
        res.json({product});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Revise the error" });
    }
}

export const deleteFavorite = async (req:Request, res:Response)=>{

    const { id } = req.params;
    const data = id.split('-')
    const user_id = data[0]
    const item_id = data[1]
    console.log(user_id,item_id)
    
  try{
    const favorite = await Favorite.findOne({where:{user_id:user_id,item_id:item_id}});
    if (favorite){
      favorite.destroy().then(()=>res.json(favorite));
    }
    else return res.status(404).json({msg:'No le dio like a esto antes'});
  }catch(err){
    console.log(err);
  }
  
}