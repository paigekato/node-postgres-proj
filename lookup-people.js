
const pg = require('pg');
const settings = require("./settings"); // settings.json
const myArgs = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function checkFamousPeople (result) {
  if(result.rows.length > 0) {
    for(var key in result.rows) {
      let id = result.rows[key].id;
      let firstName = result.rows[key].first_name;
      let lastName = result.rows[key].last_name;
      let date = result.rows[key].birthdate;
      let birthday = date.toLocaleDateString();


      console.log(`Found ${id} person(s) by the name "${myArgs}"" `);
      console.log(`- ${id}: ${firstName} ${lastName}, born '${birthday}'`);
    }
  } else {
    console.log("Sorry, no Famous People were found.");
  }
}

client.connect((error) => {
  console.log("Searching...");
  if(error) {
    return console.error("Connection error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE '${myArgs}' OR last_name LIKE '${myArgs}'`, (error, results) => {
    if(error) {
      return console.error("Error running query", err);
    }
  checkFamousPeople(results);
    client.end();
  });
});



