const Employee = require("./Employee");

function Intern(name, id, email, school) {
  Employee.call(this, name, id, email);

  this.school = school;
  this.role = "Intern";
}

Intern.prototype = Object.create(Employee.prototype);
Intern.prototype.constructor = Intern;

Intern.prototype.getSchool = function () {
  return this.school;
};

module.exports = Intern;
