import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Cart = db.define('Cart',{
    user_id:{
        type:DataTypes.NUMBER,
    },
    item_id:{
        type:DataTypes.NUMBER
    },
    order_item_id:{
        type:DataTypes.NUMBER
    },
    order_id:{
        type:DataTypes.STRING
    },
    amount:{
        type:DataTypes.NUMBER
    }
});

export default Cart;