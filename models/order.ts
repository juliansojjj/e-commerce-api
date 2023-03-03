import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Order = db.define('Order',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.NUMBER
    },
    payment_option:{
        type:DataTypes.STRING
    },
    send_option:{
        type:DataTypes.STRING
    },
    address_id:{
        type:DataTypes.NUMBER
    },
    tracking_code:{
        type:DataTypes.STRING
    },
    user_discharged:{
        type:DataTypes.BOOLEAN
    },
    post_dispatched:{
        type:DataTypes.BOOLEAN
    },
    user_received:{
        type:DataTypes.BOOLEAN
    },
    total_price:{
        type:DataTypes.NUMBER
    },
    send_price:{
        type:DataTypes.NUMBER
    },
    sucursal:{
        type:DataTypes.STRING
    },
});

export default Order;