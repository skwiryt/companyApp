const chai = require('chai');
const chaiHttp = require('chai-http');
const Department = require('../../models/department.model');
//const { mongoose } = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

let server;
describe('PUT', () => {
  before(() => {
    server = require('../../server.js');
  });
  after(() => {
    //mongoose.connection.close();
    server.close();
  })
  describe('/api/departments', () => {
    before(async () => {
      const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
      await testDepOne.save();
    });
    after(async () => {
      await Department.deleteMany();
    });

    it('/:id should update chosen document and return success', async () => {
      const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: '###Department #1##' });
      const newDepartment = await Department.findOne({ name: '###Department #1##' });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(newDepartment).to.not.be.null;
    });
  });
});