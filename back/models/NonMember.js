const { DataTypes, Model } = require('sequelize');

module.exports = class NonMember extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: false,
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
        modelName: 'nonMember',
        tableName: 'nonMembers',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Post);
  }
};
