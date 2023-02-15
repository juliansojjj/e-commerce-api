import express from 'express';
import productRoutes from '../routes/product'
import userRoutes from '../routes/user'
import favoriteRoutes from '../routes/favorite'
import checkoutRoutes from '../routes/checkout'
import orderRoutes from '../routes/order'
import cors from 'cors';
import db from '../db/connection';

export default class Server{
    private app : express.Application;
    private port : string;
    private paths = {
        products:'/api/products',
        users:'/api/users',
        favorites:'/api/favorites',
        checkout:'/api/checkout',
        orders:'/api/orders'
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
        this.app.use(this.paths.products, productRoutes);
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.favorites, favoriteRoutes);
        this.app.use(this.paths.checkout, checkoutRoutes);
        this.app.use(this.paths.orders, orderRoutes);
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('server running on ' + this.port);
        })
    }

}