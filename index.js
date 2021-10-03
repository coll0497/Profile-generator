// Required Packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generate = require("./generate.js");

// Inquirer prompts
const questions = [
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "username",
  },
  {
    type: "input",
    message: "What is the GitHub repo name?",
    name: "repo",
  },
 
];
//write to file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Success! Your README.md file has been generated");
  });
}
const writeFileAsync = util.promisify(writeToFile);
// Returning writeFileAsync promise
async function init() {
  try {
    // Prompt Inquirer questions
    const userInputs = await inquirer.prompt(questions);
    console.log("Your responses: ", userInputs);

    // Pass Inquirer userInputs and GitHub userInfo to generate
    console.log("README file generating...");
    const generateReadMe = generate(userInputs);

    await writeFileAsync(`robotREADME.md`, generateReadMe);
  } catch (error) {
    console.log(error);
  }
}
