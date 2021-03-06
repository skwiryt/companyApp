const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => { 
  try {
    res.json(await Employee.find().populate('department'));
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {  
  try {
    const count = await Employee.countDocuments();
    const random = Math.floor(Math.random() * count);
    const empl = await Employee.findOne().skip(random).populate('department');
    if (empl) {
      res.json(empl);
    } else {
      res.status(404).json({message: 'Not found'});
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }  
};

exports.getOne = async (req, res) => { 
  try {
    const empl = await Employee.findById(req.params.id).populate('department');
    if (!empl) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(empl);
    }
  } catch(err) {
    res.status(500).json({message: err});
  }  
};

exports.addOne = async (req, res) => {
  const { firstName, lastName, department } = req.body;  
  try {
    const employee = new Employee({firstName: firstName, lastName: lastName, department: department});
    await employee.save();
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({message: err});
  }
}

exports.edit = async (req, res) => {
  const { firstName, lastName, department } = req.body;  
  try {
    const empl = await Employee.findById(req.params.id);
    if (!empl) {
      res.status(404).json({message: 'Not found'});
    } else {
      empl.firstName = firstName ? firstName : empl.firstName;
      empl.lastName = lastName ? lastName : empl.lastName;
      empl.department = department ? department : empl.department;
      await empl.save();
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {  
  try {
    const empl = Employee.findById(req.params.id);
    if (!empl) {
      res.status(404).json({message: 'Not found'});
    } else {
      await Employee.deleteOne({_id: req.params.id});      
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
};