// TODO in future use AWS SSM
module.exports = {
    sequelize:
        {
            dialect: 'postgres',
            host: 'your-database-host',
            username: 'your-database-username',
            password: 'your-database-password',
            database: 'your-database-name',
        }
}