const { DataTypes, Model } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(70),
          allowNull: false,
          unique: false,
        },
        name: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: false,
        },
        phone: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        profileUrl: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        underscored: false,
        timestamps: false,
        modelName: 'user',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: 'Like' });
  }
};
