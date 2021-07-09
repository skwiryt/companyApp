const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

const devDBString = 'mongodb://localhost:27017/companyDB';
const testDBString = 'mongodb://localhost:27017/companyDB-test';
const dbURI = process.env.NODE_ENV === 'test' ? testDBString : devDBString; 
// connects our backend code with the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;
