const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  //Zerowanie modelu jest ze względu na mocha --watch.
  //Ponieważ przeszliśmy na onchange, to można by to skasować.
  after(() => {
    mongoose.models = {};
  })

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });

  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
  
    }
  
  });

  it('should throw an error if "name" length not between 5 and 20', () => {

    const cases = ['Dept', 'Too Long Department Name'];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
  
    }
  
  });

  it('should not throw if "name" is correct', () => {
    const dep = new Department({name: 'Test Department'});
    dep.validate(err => {
      expect(err).to.be.null;
    })
  });

});