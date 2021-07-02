const Department = require('../models/department.model');


exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find())
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getRandom = async (req, res) => {  
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {  
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {  
  try {
    const { name } = req.body;
    let newDepartment = new Department({ name: name });
    newDepartment = await newDepartment.save();
    res.json(newDepartment);
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.edit =  async (req, res) => {
  const { name } = req.body;
  try {
    let dep = await Department.findById(req.params.id);
    if(dep) {
      dep.name = name;
      dep = await dep.save();
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {  
  try {
    const dep = await Department.findOne({_id: req.params.id});
    if (dep) {
      await Department.deleteOne({_id: req.params.id});
      res.json(dep);
    } else {
      res.status(404).json({message: 'Not found'});
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }
}

