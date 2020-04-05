const Employee = require("./Employee");

function Manager(name, id, email, officeNumber) {
  Employee.call(this, name, id, email);

  this.officeNumber = officeNumber;
  this.role = "Manager";
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.getOfficeNumber = function () {
  return this.officeNumber;
};

module.exports = Manager;
