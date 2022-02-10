const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model that inherits Sequelize Model class
class Post extends Model {};

// create columns for Post model (id, title of post, text of post, user who posted)
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3] //at least 3 characters long
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [3] //at least 3 characters long
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        } 
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

model.exports = Post;