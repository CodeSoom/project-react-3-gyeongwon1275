const { DataTypes, Model } = require('sequelize');

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        url: {
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
        modelName: 'image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};
