"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteClass = void 0;
const filesys = require("fs");
const chalk = require("chalk");
class NoteClass {
    constructor(user) {
        this.user = user;
    }
    getJSON(title, body, color) {
        return `{\n\t\"title\":\"${title}\",\n\t\"body\":\"${body}\",\n\t\"color\":\"${color}\"\n}`;
    }
    addNote(title, body, color) {
        if (!filesys.existsSync(`./files/${this.user}`)) {
            filesys.mkdirSync(`./files/${this.user}`);
        }
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)) {
            console.log(chalk.red("The note already exists!"));
        }
        else {
            filesys.writeFileSync(`./files/${this.user}/${title}.json`, this.getJSON(title, body, color));
            console.log(chalk.green("Succesfully created!"));
        }
    }
    rmNote(title) {
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)) {
            filesys.rmSync(`./files/${this.user}/${title}.json`);
        }
        else {
            console.log(chalk.red("That note does not exist."));
        }
    }
    lsNote() {
        if (!filesys.existsSync(`./files/${this.user}`)) {
            console.log(chalk.red(`User ${this.user} has no notes`));
        }
        else {
            if (filesys.readdirSync(`./files/${this.user}`).length == 0) {
                console.log(chalk.red(`User ${this.user} has no notes`));
            }
            else {
                console.log(chalk.green(`Notes of ${this.user}: \n`));
                filesys.readdirSync(`./files/${this.user}`).forEach((elem) => {
                    let jsonobj = JSON.parse(String(filesys.readFileSync(`./files/${this.user}/${elem}`)));
                    switch (jsonobj.color) {
                        case "red":
                            console.log(chalk.red(jsonobj.title));
                            break;
                        case "blue":
                            console.log(chalk.blue(jsonobj.title));
                            break;
                        case "green":
                            console.log(chalk.green(jsonobj.title));
                            break;
                        case "yellow":
                            console.log(chalk.yellow(jsonobj.title));
                            break;
                        default:
                            console.log(chalk.red("The color of this note is not valid"));
                            break;
                    }
                });
            }
        }
    }
    readNote(title) {
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)) {
            let jsonobj = JSON.parse(String(filesys.readFileSync(`./files/${this.user}/${title}.json`)));
            switch (jsonobj.color) {
                case "red":
                    console.log(chalk.red(jsonobj.title + "\n" + jsonobj.body));
                    break;
                case "blue":
                    console.log(chalk.blue(jsonobj.title + "\n" + jsonobj.body));
                    break;
                case "green":
                    console.log(chalk.green(jsonobj.title + "\n" + jsonobj.body));
                    break;
                case "yellow":
                    console.log(chalk.yellow(jsonobj.title + "\n" + jsonobj.body));
                    break;
                default:
                    console.log(chalk.red("The color of this note is not valid"));
                    break;
            }
        }
        else {
            console.log(chalk.red("That note does not exist."));
        }
    }
    modifyNote(title, ntitle, body, color) {
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)) {
            let jsonobj = JSON.parse(String(filesys.readFileSync(`./files/${this.user}/${title}.json`)));
            if (ntitle != undefined) {
                jsonobj.title = String(ntitle);
            }
            if (body != undefined) {
                jsonobj.body = String(body);
            }
            if (color != undefined) {
                jsonobj.color = String(color);
            }
            filesys.rmSync(`./files/${this.user}/${title}.json`);
            filesys.writeFileSync(`./files/${this.user}/${jsonobj.title}.json`, this.getJSON(jsonobj.title, jsonobj.body, jsonobj.color));
            console.log(chalk.green("Succesfully modified!"));
        }
        else {
            console.log(chalk.red("That note does not exist."));
        }
    }
}
exports.NoteClass = NoteClass;
//# sourceMappingURL=noteClass.js.map