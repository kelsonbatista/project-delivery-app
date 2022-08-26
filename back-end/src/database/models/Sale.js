const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      // field: 'seller_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      // field: 'total_price',
      type: DataTypes.DECIMAL,
    },
    deliveryNumber: {
      // field: 'delivery_number',
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryAddress: {
      // field: 'delivery_address',
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      // field: 'sale_date',
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
    , {
      tableName: 'sales',
      timestamps: false,
      underscored: true
    });
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'customer',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', 
      as: 'seller',
    });
  }

  return Sale;
};

module.exports = Sale;
