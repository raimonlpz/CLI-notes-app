const chalk = require("chalk");
const yargs = require("yargs");
const { addNote, listNotes, readNote, removeNote } = require("./notes");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    console.log("Removing a note...");
    removeNote(argv.title);
  }
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note...",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    console.log("Reading a note...");
    readNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: "list",
  describe: "List all the notes",
  handler() {
    console.log(chalk.inverse("Your notes".toUpperCase()));
    listNotes();
  }
});

const cm = yargs.argv["_"][0];
if (cm !== "list" && cm !== "read" && cm !== "remove" && cm !== "add") {
  console.log(
    chalk.red.inverse("Command not found"),
    "- try 'list', 'read', 'remove' or 'add'..."
  );
}

yargs.parse();
