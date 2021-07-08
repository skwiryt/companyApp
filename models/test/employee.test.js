const Employee = require('../employee.model');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('Employee', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw error if no arguments', () => {
    const employee = new Employee({});
    employee.validate((err) => {
      expect(err.errors).to.exist;
    });
  });

  it('should throw error if no firstName argument', () => {
    const employee = new Employee({lastName: 'some', department: 'some'});
    employee.validate((err) => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it('should throw error if no lastName argument', () => {
    const employee = new Employee({firstName: 'some', department: 'some'});
    employee.validate((err) => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it('should throw error if no department argument', () => {
    const employee = new Employee({firstName: 'some', lastName: 'some'});
    employee.validate((err) => {
      expect(err.errors.department).to.exist;
    });
  });

  it('should NOT throw error if arguments are OK', () => {
    const employee = new Employee({firstName: 'some', lastName: 'some', department: 'some'});
    employee.validate((err) => {
      expect(err).to.be.null;
    });
  });

});