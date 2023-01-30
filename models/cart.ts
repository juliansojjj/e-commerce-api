import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Cart = db.define('Cart',{
    user_id:{
        type:DataTypes.NUMBER
    },
    item_id:{
        type:DataTypes.NUMBER
    },
    amount:{
        type:DataTypes.NUMBER
    }
});

export default Cart;