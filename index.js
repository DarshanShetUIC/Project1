const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors');

app.use(cors())

var Request = require('request');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://xidlemqkhgpplz:30ad931e175c211b92dfe567cca42b119ac9a103df99e7471b47bbed10e8ebbf@ec2-54-83-9-169.compute-1.amazonaws.com:5432/d3k5vmrk5j8afn',
  ssl: true
});

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/about', (req, res) => res.send('Hello World!'))

app.get('/customers', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM customer');
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/customers/:customerID', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM customer WHERE id = $1', [req.params.customerID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/customers/:customerID/accounts', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM account WHERE customer_id = $1', [req.params.customerID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/customers/:customerID/positions', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM position WHERE customer_id = $1', [req.params.customerID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })


app.get('/accounts', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM account');
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/accounts/:accountID', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM account WHERE id=$1',[req.params.accountID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/accounts/:accountID/transactions', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM transaction WHERE id=$1',[req.params.accountID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/positions', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM position');
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/securities', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM asset');
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/securities/:securityID', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM asset WHERE id = $1', [req.params.securityID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/securities/:securityID/current-price', async (req, res) => {
	var URL1 = "https://api.worldtradingdata.com/api/v1/stock?symbol=";
	var URL2 = "&api_token=qfFAP0PmFU2v198cEP7lLFgAXG4tgiqJvu4ffDS770bSomZGad1B8LQS5UFM";
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT symbol FROM asset WHERE id = $1', [req.params.securityID]);
      var results = { 'results': (result) ? result.rows : []};
		var symbol = results.results[0].symbol;
		var URL = URL1.concat(symbol, URL2);
		Request.get(URL, (error, response, body) => {
			if(error)
			{
				return console.dir(error);
			}
			res.json(JSON.parse(body));
		});
		client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/employees', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM employee');
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/employees/:employeeID', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM employee WHERE id = $1', [req.params.employeeID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('/employees/:employeeID/accounts', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM account WHERE employee_id = $1', [req.params.employeeID]);
      const results = { 'results': (result) ? result.rows : []};
      res.json(results.results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get('*',function(req, res){
	res.status(404).send('Invalid URL or Query Not Valid...');
})
