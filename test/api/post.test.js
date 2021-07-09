const chai = require('chai');
const chaiHttp = require('chai-http');
const Department = require('../../models/department.model');
//const { mongoose } = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

let server;
describe('POST', () => {
  before(() => {
    server = require('../../server.js');
  });
  after(() => {
    //mongoose.connection.close();
    server.close();
  })
  describe('/api/departments', () => {
    after(async () => {
      await Department.deleteMany();
    });

    it('/ should insert new document to db and return success', async () => {
      const res = await request(server).post('/api/departments').send({ name: '#Department #1' });
      const newDepartment = await Department.findOne({ name: '#Department #1' });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(newDepartment).to.not.be.null;
    });
  });
});
