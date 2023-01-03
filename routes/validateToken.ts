import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";

const validateToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        const bearerToken = token.slice(7);
        // si usamos sola la funcion hace un throw de jwt error (está arriba en el index de la funcion) 
        // y detiene todo si es erroneo
        // Para personalizarlo tenemos que usar try/catch (es útil para casos donde funciuone NO son promesas)
        try {
            const validate = jwt.verify(bearerToken, process.env.SECRET_KEY!);
            next();
        } catch (err) {
            res.status(400).json({error:'Invalid token'});
            //console.log(err)
        } 
    }
    else{
        res.status(400).json({error:'Access denied'});
     }
    
}

export default validateToken;