"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yargs = require("yargs");
const noteClass_1 = require("./noteClass");
/**
 * Add New note command
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Content of the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color used to print the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.title === 'string') && (typeof argv.user === 'string') && (typeof argv.body === 'string') && (typeof argv.color === 'string')) {
            if (["red", "green", "blue", "yellow"].filter((v) => (v == argv.color)).length > 0) {
                new noteClass_1.NoteClass(argv.user).addNote(argv.title, argv.body, argv.color);
            }
            else {
                console.log(chalk.red("Color not valid"));
            }
        }
        else {
            console.log(chalk.red("Invalid type for the params"));
        }
    },
});
/**
 * Remove an existing note command
 */
yargs.command({
    command: 'rm',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
            new noteClass_1.NoteClass(argv.user).rmNote(argv.title);
        }
        else {
            console.log(chalk.red("Invalid type for the params"));
        }
    },
});
/**
 * Modifies a note command
 */
yargs.command({
    command: 'mod',
    describe: 'Modify an existing',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
        ntitle: {
            describe: 'New title',
            demandOption: false,
            type: 'string',
        },
        body: {
            describe: 'Content of the note',
            demandOption: false,
            type: 'string',
        },
        color: {
            describe: 'Color used to print the note',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
            if (argv.color == undefined || ["red", "green", "blue", "yellow"].filter((v) => (v == argv.color)).length > 0) {
                new noteClass_1.NoteClass(argv.user).modifyNote(argv.title, argv.ntitle, argv.body, argv.color);
            }
            else {
                console.log(chalk.red("Color not valid"));
            }
        }
        else {
            console.log(chalk.red("Invalid type for the params"));
        }
    },
});
/**
 * Print list of notes command
 */
yargs.command({
    command: 'ls',
    describe: 'List the notes of a user',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            new noteClass_1.NoteClass(argv.user).lsNote();
        }
        else {
            console.log(chalk.red("Invalid type for the params"));
        }
    },
});
/**
 * Read a note command
 */
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
            new noteClass_1.NoteClass(argv.user).readNote(argv.title);
        }
        else {
            console.log(chalk.red("Invalid type for the params"));
        }
    },
});
yargs.parse();
//# sourceMappingURL=index.js.map