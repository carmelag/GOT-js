const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

var cmd = process.argv[2];

var allCharacters = [
  {
    id: 1, name: "Jon", surname: "Snow", age: 28, socialStatus: "SINGLE", gender: "MALE"
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
    id: 6, name: "Cercei", surname: "Lannister", age: 43, socialStatus: "WIDOWER", gender: "FEMALE"
  },
  {
    id: 7, name: "Theon", surname: "Greyjoy", age: 28, socialStatus: "SINGLE", gender: "MALE"
  },
  {
    id: 8, name: "Oberyn", surname: "Martel", age: 45, socialStatus: "MARRIED", gender: "MALE"
  }
];

//Create new GOT characters
async function createPrismaCharacter(personOfGOT) {
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
  console.log(`Created character is: ${currentPerson.name}`);
}

async function updatePrismaCharacter(newName) {
  //Update a GOT character 
  const nameUpdated = await prisma.charachter.update({
    where: { id: 1 },
    data: {
      name: newName,
      surname: " Targaryen"
    }
  });
  console.log(`WOW...Jon Snow's actual name is ${nameUpdated.name} ${nameUpdated.surname}!`);
}

// A `main` function so that we can use async/await
function main() {
  try {
    switch (cmd) {
      case "writeDB":
        console.log("writing");
        allCharacters.forEach(person => {
          try {
            createPrismaCharacter(person);
          } catch (e) {
            console.error(e);
          }
        });
        break;
      case "updateDB":
        console.log("updating");
        updatePrismaCharacter();
        break;
      default:
      // code block
    }

  } catch (e) {
    console.error(e);
  }

}

main();