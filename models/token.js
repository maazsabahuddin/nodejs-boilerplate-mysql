const { Model } = require("sequelize");
const { get_time } = require("../services/utils/common_utils");

module.exports = (sequelize, DataTypes) => {
    class Token extends Model { }
    Token.init(
        {
            uid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expiry_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_expired: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            channel: {
                type: DataTypes.STRING,
                allowNull: false
            },
            purpose: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.BIGINT,
                defaultValue: get_time(),
                allowNull: false
            },
            updated_at: {
                type: DataTypes.BIGINT,
                defaultValue: get_time(),
                allowNull: false
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: "Token",
            tableName: "token",
            timestamps: false
        }
    )

    return Token;
}
