module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD : '5118586',
    DB: 'testdb',
    dialect: 'mysql',
    // sequelize connection pool 세팅
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }   
}