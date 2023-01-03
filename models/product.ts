import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Product = db.define('Product',{
    name:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    measures:{
        type:DataTypes.STRING
    },
    color:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.NUMBER
    },
    stock:{
        type:DataTypes.NUMBER
    },
    serialNumber:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    }
});

export default Product;