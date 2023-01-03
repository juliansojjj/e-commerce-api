import express from 'express';
import productRoutes from '../routes/product'
import userRoutes from '../routes/user'
import cors from 'cors';
import db from '../db/connection';

export default class Server{
    private app : express.Application;
    private port : string;
    private paths = {
        products:'/api/products',
        users:'/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection()
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database connected');
        } catch (err:any) {
            throw new Error(err);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        
        //BODY
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));//nombre de carpeta
    }

    routes(){
        //CREO que acá podriamos poner varias lineas de estas, combinadas con paths de arriba, para crear distintos entrypoints
        this.app.use(this.paths.products, productRoutes);
        this.app.use(this.paths.users, userRoutes);
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('server running on ' + this.port);
        })
    }

}