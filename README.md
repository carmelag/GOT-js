# Introduction: js script to test Prisma + mysql

This Node.js example uses the [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md) in a **simple Node.js script** to write, update and read data from a mysql database. Mysql database runs locally on localhost:3306 ports.

The example was built on top of this [javascript script](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/script) provided by Prisma.

The script is a simple CLI to perform some basic operations on the DB through the Prisma Client. 
The actions are specified by the argument passed together with the node command to start the script.


## How to use

### 1. Create the DB locally

Recreate the Characters DB using the [SQL dump](https://gist.github.com/carmelag/0492aa6251923560d94c43fa75e1887e) on your mysql server on your machine.

### 2. Download the example & install dependencies

Clone this repository:

```
git clone git@github.com:carmelag/GOT-js.git
```

Install npm dependencies:

```
cd GOT-js
npm install

```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`. If you have issue with this try the following:

```
npm install -g prisma2
prisma2 generate
```

### 3. Run the script

Execute the script with these commands: 


   1. __`npm run dev writeDB`__   Write an array of Game of Thrones Characters to the DB
   2. __`npm run dev updateDB`__    Find out the real name of Jon Snow (Spoiler Alert!)
   3. __`npm run dev readDB`__   See all the characters stored within the DB
