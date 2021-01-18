const { PrismaClient } = require('@prisma/client')
const chalk = require('chalk');

//Prisma Client creation
const prisma = new PrismaClient()

var cmd = process.argv[2];


console.log(chalk.blue('This is a simple CLI in node js to test Prisma with mysql DB.You can perform the following actions:\n'));
console.log(chalk.magenta('1. Write an array of Game of Thrones Characters to the DB. Plaease run: ') + chalk.red('npm run dev writeDB'));
console.log(chalk.magenta('2. Find out the real name of Jon Snow. Please run: ') + chalk.red('npm run dev updateDB'));
console.log(chalk.magenta('3. See all the characters stored within the DB. Please run: ') + chalk.red('npm run dev readDB'));

var allCharacters = [
  {
    id: 1, name: "Jon", surname: "Snow", age: 22, socialStatus: "SINGLE", gender: "MALE"
  },
  {
    id: 2, name: "Arya", surname: "Stark", age: 17, socialStatus: "SINGLE", gender: "FEMALE"
  },
  {
    id: 3, name: "Daenerys", surname: "Targaryen", age: 24, socialStatus: "WIDOWER", gender: "FEMALE"
  },
  {
    id: 4, name: "Tyrion", surname: "Lannister", age: 33, socialStatus: "MARRIED", gender: "MALE"
  },
  {
    id: 5, name: "Sansa", surname: "Stark", age: 24, socialStatus: "MARRIED", gender: "FEMALE"
  },
  {
    id: 6, name: "Cercei", surname: "Lannister", age: 37, socialStatus: "WIDOWER", gender: "FEMALE"
  },
  {
    id: 7, name: "Theon", surname: "Greyjoy", age: 22, socialStatus: "SINGLE", gender: "MALE"
  },
  {
    id: 8, name: "Oberyn", surname: "Martel", age: 45, socialStatus: "MARRIED", gender: "MALE"
  }
];


// A `main` function so that we can use async/await
async function main() {
  try {
    switch (cmd) {
      //Create new GOT characters
      case "writeDB":
        var fullDB = false;
        const checkTable = await prisma.charachter.findMany();
        if (checkTable && checkTable.length) {
          fullDB = true;
          console.log(chalk.red("\nYou have already performed the write operation on Characters DB, go ahead with actions 2 or 3"));
          break;
        }
        else {
          console.log(chalk.bgWhite("Writing the DB..."));
          for (let index = 0; index < allCharacters.length; index++) {
            const personOfGOT = allCharacters[index];
            const currentPerson = await prisma.charachter.create({
              data: {
                id: personOfGOT.id,
                age: personOfGOT.age,
                name: personOfGOT.name,
                surname: personOfGOT.surname,
                status: personOfGOT.socialStatus,
                gender: personOfGOT.gender
              }
            });
            console.log(chalk.yellow(`Created character is: ${currentPerson.name}`));
          }
        }
        break;
      case "updateDB":
        console.log(chalk.bgWhite("Updating the DB..."));
        //Update a GOT character, Jon Snow, with his real name
        const nameUpdated = await prisma.charachter.update({
          where: { id: 1 },
          data: {
            name: "Aegon",
            surname: " Targaryen"
          }
        });
        console.log(chalk.yellow(`WOW...Jon Snow's actual name is ${nameUpdated.name} ${nameUpdated.surname}!`));
        break;
      case "readDB":
        //Read the DB and returns everything
        console.log(chalk.bgWhite("Reading the DB..."));
        const all = await prisma.charachter.findMany();
        console.log(all);
      default:
      // code block
    }

  } catch (e) {
    console.error(e);
  }

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })
