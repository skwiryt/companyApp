const Employee = require('../employee.model');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {
  before(async () => {

    try {
      const fakeDB = await MongoMemoryServer.create();
      const uri = await fakeDB.getUri();
  
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    } catch(err) {
      console.log(err);
    }
  
  });

  after(async () => {
    mongoose.connection.close();
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmplOne = new Employee({ firstName: 'Employee #1', lastName: 'One', department: 'Dept 1' });
      await testEmplOne.save();
  
      const testEmplTwo = new Employee({ firstName: 'Employee #2', lastName: 'Two', department: 'Dept 2'  });
      await testEmplTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by various params with "findOne" method', async () => {
      const employeeFirst = await Employee.findOne({ firstName: 'Employee #1' });
      const expectedFirst = 'Employee #1';
      expect(employeeFirst.firstName).to.be.equal(expectedFirst);

      const employeeLast = await Employee.findOne({ lastName: 'Two' });
      const expectedLast = 'Two';
      expect(employeeLast.lastName).to.be.equal(expectedLast);

      const employeeDept = await Employee.findOne({ department: 'Dept 1' });
      const expectedDept = 'Dept 1';
      expect(employeeDept.department).to.be.equal(expectedDept);

    });
  
  });
  
  describe('Creating data', () => {

    after(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Employee #1', lastName: 'One', department: 'Dept' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  
  });
  
  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmplOne = new Employee({ firstName: 'Employee #1', lastName: 'One', department: 'Dept' });
      await testEmplOne.save();
  
      const testEmplTwo = new Employee({ firstName: 'Employee #2', lastName: 'Two', department: 'Dept'  });
      await testEmplTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Employee #1' }, { $set: { firstName: '=Employee #1=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });
    
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      employee.firstName = '=Employee #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });
    
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: '=Employee #1=' }});
      const updatedEmployees = await Employee.find({ firstName: '=Employee #1=' });
      expect(updatedEmployees.length).to.equal(2);
    });
    
  });
  
  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmplOne = new Employee({ firstName: 'Employee #1', lastName: 'One', department: 'Dept' });
      await testEmplOne.save();
  
      const testEmplTwo = new Employee({ firstName: 'Employee #2', lastName: 'Two', department: 'Dept'  });
      await testEmplTwo.save();
    });
    
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({firstName: 'Employee #1'});
      const employeesLeft = await Employee.find();
      expect(employeesLeft.length).to.equal(1);
      expect(employeesLeft[0].firstName).to.equal('Employee #2');
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ fistName: 'Employee #1' });
      expect(removedEmployee).to.be.null;      
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employeesLeft = await Employee.findOne();
      expect(employeesLeft).to.be.null;
      
    });
  
  });
  
});