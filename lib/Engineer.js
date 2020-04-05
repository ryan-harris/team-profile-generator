const Employee = require("./Employee");

function Engineer(name, id, email, github) {
  Employee.call(this, name, id, email);

  this.github = github;
  this.role = "Engineer";
}

Engineer.prototype = Object.create(Employee.prototype);
Engineer.prototype.constructor = Engineer;

Engineer.prototype.getGithub = function () {
  return this.github;
};

module.exports = Engineer;
