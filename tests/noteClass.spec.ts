import "mocha";
import {expect} from "chai";
import {NoteClass} from "../src/noteClass";
import * as filesys from "fs";

let note = new NoteClass('Pruebas');
filesys.readdirSync('./files/Pruebas').forEach((elem) => {
  filesys.rmSync(`./files/Pruebas/${elem}`);
});
describe('Note Class:', () =>{
  it('Se debe poder crear una nota', () =>{
    expect(filesys.existsSync(`./files/Pruebas/Nota.json`)).to.be.eq(false);
    expect(note.addNote('Nota', 'Body', 'red')).to.be.undefined;
    expect(filesys.existsSync(`./files/Pruebas/Nota.json`)).to.be.eq(true);
    expect(note.addNote('Nota', 'Body', 'red')).to.be.undefined;
  });
  it('Se debe poder eliminar una nota', () =>{
    expect(filesys.existsSync(`./files/Pruebas/Nota.json`)).to.be.eq(true);
    expect(note.rmNote('Nota')).to.be.undefined;
    expect(filesys.existsSync(`./files/Pruebas/Nota.json`)).to.be.eq(false);
    expect(note.rmNote('Nota')).to.be.undefined;
    expect(filesys.existsSync(`./files/Pruebas/Nota.json`)).to.be.eq(false);
  });
  it('Se debe poder modificar una nota', () =>{
    expect(note.addNote('Nota', 'Body', 'red')).to.be.undefined;
    expect(note.modifyNote('EstaNoExiste', 'NuevoTítulo', 'New Body', 'green')).to.be.undefined;
    expect(note.modifyNote('Nota', 'NuevoTítulo', 'New Body', 'red')).to.be.undefined;
    expect(note.modifyNote('NuevoTítulo', undefined, undefined, 'green')).to.be.undefined;
    expect(filesys.existsSync(`./files/Pruebas/NuevoTítulo.json`)).to.be.eq(true);
    let jsonobj = JSON.parse(String(filesys.readFileSync(`./files/Pruebas/NuevoTítulo.json`)));
    expect((jsonobj.body)).to.be.eq('New Body');
    expect((jsonobj.color)).to.be.eq('green');
  });
  it('Se debe poder listar los ficheros', () =>{
    expect(note.lsNote()).to.be.undefined;
    filesys.rmSync(`./files/Pruebas/NuevoTítulo.json`);
    expect(note.lsNote()).to.be.undefined;
    expect(note.addNote('NuevoTítulo', 'New Body', 'green')).to.be.undefined;
    expect(note.addNote('Nota1', 'New Body', 'red')).to.be.undefined;
    expect(note.addNote('Nota2', 'New Body', 'blue')).to.be.undefined;
    expect(note.addNote('Nota3', 'New Body', 'yellow')).to.be.undefined;
    expect(note.addNote('Nota4', 'New Body', 'unvalid')).to.be.undefined;
    expect(note.lsNote()).to.be.undefined;
  });
  it('Se debe poder leer un fichero', () =>{
    expect(note.readNote('NuevoTítulo')).to.be.undefined;
    filesys.rmSync(`./files/Pruebas/NuevoTítulo.json`);
    expect(note.readNote('NuevoTítulo')).to.be.undefined;
    expect(note.readNote('Nota1')).to.be.undefined;
    expect(note.readNote('Nota2')).to.be.undefined;
    expect(note.readNote('Nota3')).to.be.undefined;
    expect(note.readNote('Nota4')).to.be.undefined;
  });
  it('Se debe poder obtener un string en formato JSON', () =>{
    expect(note.getJSON('Title', 'Body', 'red')).to.be.eq(`{\n\t\"title\":\"Title\",\n\t\"body\":\"Body\",\n\t\"color\":\"red\"\n}`);
  });
});