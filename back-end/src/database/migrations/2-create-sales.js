module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      sellerId: {
        field: 'seller_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING,
        allowNull: false,
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sales');
  },
  };
  