//import sequelize model, datatypes,etc
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection'); 
//bcrypt (security for user logins & passwords)
const bcrypt = require('bcrypt');

// create the User Model
class User extends Model { //User model inherits Sequelize's Model functionality
    //bcrypt password checker
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

// create columns (id, username, & password) for the User model
User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,12] //password between 6 and 12 characters long
            }
        }
    },
    {
        //hooks
        hooks: {

        },

        //sequelize configuration/options for the table
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)