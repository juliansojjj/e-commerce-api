import {DataTypes} from 'sequelize';
import db from '../db/connection';

const OrderProduct = db.define('Order_Product',{
    item_id:{
        type:DataTypes.NUMBER
    },
    order_id:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    type:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.NUMBER
    },
    serialNumber:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    }
});

export default OrderProduct;