const { User, Employee } = require('./models');

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email, password });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return {
        eid: 1, 
        name: user.username,
        email: user.email,
        password: user.password,
        position: null,
        department: null
      };
    },

    // Get all employees from the Employee collection
    getAllEmployees: async (_, args, context, info) => {
      const employees = await Employee.find();
      return employees.map(emp => ({
        eid: emp._id, 
        name: `${emp.f_name} ${emp.l_name}`,
        email: emp.email,
        password: "",
        position: emp.position,
        department: emp.department
      }));
    },

    // Search an employee by ID.
    searchEmployeeByID: async (_, { eid }, context, info) => {
      const employee = await Employee.findById(eid);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return {
        eid: employee._id,
        name: `${employee.f_name} ${employee.l_name}`,
        email: employee.email,
        password: "",
        position: employee.position,
        department: employee.department
      };
    },

    // Search employees by position and department.
    searchEmployeeByDnD: async (_, { position, department }, context, info) => {
      const query = {};
      if (position) query.position = position;
      if (department) query.department = department;
      const employees = await Employee.find(query);
      return employees.map(emp => ({
        eid: emp._id,
        name: `${emp.f_name} ${emp.l_name}`,
        email: emp.email,
        password: "",
        position: emp.position,
        department: emp.department
      }));
    }
  },

  Mutation: {
    // Sign up a new user
    signUp: async (_, { email, password }, context, info) => {
      const username = email.split('@')[0];
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
      return {
        eid: 1,
        name: savedUser.username,
        email: savedUser.email,
        password: savedUser.password,
        position: null,
        department: null
      };
    },

    // Add a new employee
    addNewEmployee: async (_, { name, email, password }, context, info) => {
      const parts = name.split(' ');
      const f_name = parts[0];
      const l_name = parts.slice(1).join(' ') || '';
      const newEmployee = new Employee({
        f_name,
        l_name,
        email,
        position: "Developer",   
        salary: 1000,                
        date_of_joining: new Date(), 
        department: "IT",          
        employee_photo: ""
      });
      const employee = await newEmployee.save();
      return {
        eid: employee._id,
        name: `${employee.f_name} ${employee.l_name}`,
        email: employee.email,
        password: "",
        position: employee.position,
        department: employee.department
      };
    },

    // Update an existing employee
    updateEmployee: async (_, { eid, name, email, password }, context, info) => {
      const parts = name.split(' ');
      const f_name = parts[0];
      const l_name = parts.slice(1).join(' ') || '';
      const updatedEmployee = await Employee.findByIdAndUpdate(
        eid,
        { f_name, l_name, email },
        { new: true }
      );
      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }
      return {
        eid: updatedEmployee._id,
        name: `${updatedEmployee.f_name} ${updatedEmployee.l_name}`,
        email: updatedEmployee.email,
        password: "",
        position: updatedEmployee.position,
        department: updatedEmployee.department
      };
    },

    // Delete employee.
    deleteEmployee: async (_, { eid }, context, info) => {
      const deletedEmployee = await Employee.findByIdAndDelete(eid);
      if (!deletedEmployee) {
        throw new Error('Employee not found');
      }
      return {
        eid: deletedEmployee._id,
        name: `${deletedEmployee.f_name} ${deletedEmployee.l_name}`,
        email: deletedEmployee.email,
        password: "",
        position: deletedEmployee.position,
        department: deletedEmployee.department
      };
    }
  }
};

module.exports = resolvers;
