import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Address = db.define('Address',{
    user_id:{
        type:DataTypes.NUMBER
    },
    name_surname:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    province:{
        type:DataTypes.STRING
    },
    postal_code:{
        type:DataTypes.STRING
    },
    street:{
        type:DataTypes.STRING
    },
    number:{
        type:DataTypes.NUMBER
    },
    department:{
        type:DataTypes.STRING
    },
    note:{
        type:DataTypes.STRING
    },
});

export default Address;