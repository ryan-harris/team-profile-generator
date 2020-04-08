const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

createTeam();

function createTeam() {
  askQuestions("manager")
    .then(answers => {
      employees.push(
        new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        )
      );
      return createMembers();
    })
    .then(() => {
      console.log(employees);
    });
}

async function createMembers() {
  let continueAsking = true;
  while (continueAsking) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]);

    switch (answer.type) {
      case "Engineer":
      case "Intern":
        await askQuestions(answer.type).then(answers => {
          createEmployee(answer.type, answers);
        });
        break;
      default:
        continueAsking = false;
    }
  }
}

function createEmployee(role, answers) {
  switch (role.toLowerCase()) {
    case "engineer":
      return employees.push(
        new Engineer(answers.name, answers.id, answers.email, answers.github)
      );
    case "intern":
      return employees.push(
        new Intern(answers.name, answers.id, answers.email, answers.school)
      );
    default:
      return;
  }
}

function askQuestions(role) {
  role = role.toLowerCase();
  return inquirer.prompt([
    {
      name: "name",
      message: `What is your ${role}'s name?`
    },
    {
      name: "id",
      message: `What is your ${role}'s id?`
    },
    {
      name: "email",
      message: `What is your ${role}'s email?`
    },
    {
      name: "officeNumber",
      message: `What is your ${role}'s office number?`,
      when: role === "manager"
    },
    {
      name: "github",
      message: `What is your ${role}'s GitHub username?`,
      when: role === "engineer"
    },
    {
      name: "school",
      message: `What is your ${role}'s school?`,
      when: role === "intern"
    }
  ]);
}
