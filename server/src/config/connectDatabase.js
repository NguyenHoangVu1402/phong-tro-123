const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('phongtro123','root','Hoangvu1402001',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
export default connectDatabase;