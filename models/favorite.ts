import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Favorite = db.define('Favorite',{
    user_id:{
        type:DataTypes.NUMBER
    },
    item_id:{
        type:DataTypes.NUMBER
    }
});

export default Favorite;