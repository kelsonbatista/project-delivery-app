const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {    
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      urlImage: {
        field: 'url_image',
        type: DataTypes.STRING,
      }}
      ,{
        tableName: 'products',
        timestamps: false
      });
    return Product;
  };

module.exports = Product;