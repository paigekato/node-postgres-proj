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

const myArgs = process.argv[2];


function checkFamousPeople (result) {
  if(result.length > 0) {
    for(var key of result) {
      let id = key.id;
      let firstName = key.first_name;
      let lastName = key.last_name;
      let date = new Date(key.birthdate).toDateString();

      console.log(`Found ${id} person(s) by the name "${myArgs}" `);
      console.log(`- ${id}: ${firstName} ${lastName}, born '${date}'`);
    }
  } else {
    console.log("Sorry, no Famous People were found.");
  }
}

knex.select()
  .from('famous_people')
  .where('first_name', myArgs)
  .orWhere('last_name', myArgs)
  .asCallback((error, results) => {
    // handle error
      checkFamousPeople(results);
});


