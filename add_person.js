const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client   : 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const myArgs = process.argv.slice(2);

knex.insert({first_name: myArgs[0], last_name: myArgs[1], birthdate: myArgs[2]}).into("famous_people")
.asCallback((error, results) => {
  console.log(`Success. You have added ${myArgs[0]} ${myArgs[1]} with the
  birthday ${myArgs[2]} to the database, famous_people.`);
});






