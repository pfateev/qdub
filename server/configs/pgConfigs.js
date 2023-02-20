const knex = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        user: "user",
        password: "password",
        database: "database",
        port: 5432
    }
});

// example for knex -- to connect to db & execute queries
async function start() {

    try {
        const a = await knex.raw('SELECT * FROM courses WHERE id = 403');
        console.log(a);
    } catch (e) {
        console.error(e);
    };
}

start();