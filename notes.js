const fs = require("fs");
const chalk = require("chalk");

const listNotes = () => {
  const notes = loadNotes();
  notes.map(note =>
    console.log(
      chalk.green(note.title.toUpperCase()),
      "-",
      chalk.red(note.body)
    )
  );
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added."));
  } else {
    console.log(
      chalk.red.inverse(
        "Seems like this title already exists, try changing it to add new task..."
      )
    );
  }
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(name => name.title == title);
  if (note) {
    console.log(
      chalk.green(note.title.toUpperCase()),
      "-",
      chalk.red(note.body)
    );
    return;
  }
  console.log("Sorry, this note doesn't exist yet. Try other title...");
};

const removeNote = title => {
  const notes = loadNotes();

  const updatedNotes = notes.filter(note => note.title !== title);

  if (notes.length > updatedNotes.length) {
    saveNotes(updatedNotes);
    console.log(chalk.green.inverse("Note removed successfully."));
    return;
  }
  console.log(
    chalk.red.inverse("Sorry, this note doesn't exist yet. Try other title...")
  );
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("tasks.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("tasks.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  listNotes,
  addNote,
  readNote,
  removeNote
};
