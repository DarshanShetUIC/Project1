const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.connect();

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/about', (req, res) => res.send('Hello World!'))

app.get('/db', (req, res) => {
	client.query('SELECT * FROM test_table;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
         console.log(JSON.stringify(row));
      }
      client.end();
    });
})