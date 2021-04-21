const { DataTypes, Model } = require('sequelize');

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
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
        modelName: 'post',
        tableName: 'posts',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.NonMember);
    db.Post.belongsToMany(db.User, { through: 'Like' });
  }
};
