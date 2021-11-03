const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { get_time } = require("../services/utils/common_utils");

module.exports = (sequelize, DataTypes) => {
    class User extends Model { 
        generateHash(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
        comparePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phonenumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email_address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
            // created_at: {
            //     type: DataTypes.INTEGER,
            //     defaultValue: get_time(),
            //     allowNull: false
            // },
            // updated_at: {
            //     type: DataTypes.INTEGER,
            //     defaultValue: get_time(),
            //     allowNull: false
            // }
        },
        {
            sequelize,
            paranoid: true,
            modelName: "User",
            tableName: "users"

        }
    )
    // User.beforeUpdate((user, options) => {
    //     if (options.fields.indexOf("password") > -1 && user.password) {
    //       const hashedPassword = user.generateHash(user.password);
    //       user.password = hashedPassword;
    //     }
    //   });
    
    User.beforeCreate((user, options) => {
        const hashedPassword = user.generateHash(user.password);
        user.password = hashedPassword;
    });

    return User;
}
