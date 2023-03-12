import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Category = db.define('Category',{
    name:{
        type:DataTypes.STRING
    },
    disabled:{
        type:DataTypes.BOOLEAN
    }
});

export default Category;