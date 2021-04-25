[![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500/actions/workflows/tests.yml) [![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500/actions/workflows/coveralls.yml) [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500?branch=master) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500) 

# Informe Práctica 8: Aplicación de procesamiento de notas de texto.

## Introducción

Esta práctica tiene como propósito adquirir nociones básicas sobre el uso del sistema de ficheros de NodeJS en modo síncrono, además de familiarizarnos con las herramientas yargs y chalk.

## Herramientas

### Yargs

Yargs es un paquete que nos permite procesar de forma sencilla argumentos que pasemos desde la línea de comandos al programa a ejecutar.

Yargs nos permite definir comandos, que seguirán la siguiente estructura:

~~~ typescript
import * as yargs from 'yargs';

yargs.command({ //Define un nuevo comando
  command: 'nombre_del_comando', //Nombre del nuevo comando. Será el nombre que debemos introducir desde la línea de comandos
  describe: 'Descripción del comando', //Descripción del comando. ¿Qué hace este comando? Esta información se mostrará en el --help, implementado por defecto en yargs
  builder: { // En esta estructura incluimos tantas opciones como queramos que tenga el comando
    nombre_de_la_opción: { //Se escribirá --nombre_de_la_opción en la línea de comandos. Podemos incluir tantas opciones como  queramos.
      describe: 'Descripción de la opción', //Descripción de la opción.
      demandOption: true / false, // ¿Es una opción obligatoria para el funcionamiento del comando o se puede omitir?
      type: 'tipo', //Tipo de dato que espera recibir esta opción
    },
  },
  handler(argv) {
     //HANDLER. El código que se ejecutará si se invoca este comando va aquí.
  },
});

~~~

Para poder usar las funciones de yargs debemos instalar previamente las dependencias:

~~~
npm install --save-dev yargs @types/yargs
~~~

### Chalk

El paquete chalk nos permite cambiar la apariencia de la información mostrada por pantalla a través de la consola. Para el desarrollo de esta práctica se han usado las funciones del paquete chalk que permiten modificar el color del texto. Esto es posible mediante el comando:

~~~ typescript
console.log(chalk.[color](“Texto a colorear”))

~~~

Para poder usar las funciones de chalk debemos instalar previamente la dependencia:

~~~
npm install --save-dev chalk
~~~

### Sistema de ficheros de Node

Esta API de node nos permite acceder al sistema de ficheros de nuestra máquina, pudiendo así crear, modificar, eliminar, y manipular ficheros. Además, esta API nos permite operar en modo síncrono o asíncrono, aunque en esta práctica vamos a emplear las funcionalidades que nos ofrece la API en modo síncrono.

Para acceder a las funcionalidades de cualquier API de Node es necesario instalar como dependencia los tipos de node:

~~~ 
npm install --save-dev @types/node
~~~

Las funciones del sistema de ficheros que han sido empleadas en el desarrollo de esta práctica han sido las siguientes:

* mkdirSync(ruta): Crea un nuevo directorio especificado en la ruta.
* existsSync(ruta): Comprueba si existe el fichero especificado en la ruta. Devuelve un valor booleano, true en caso de que exista y false en caso contrario.
* writeFileSync(ruta, contenido): Escribe el contenido sobre un fichero especificado en la ruta. Si el fichero no existe, crea uno nuevo.
* readFileSync(ruta): Lee el contenido del fichero especificado en la ruta. El valor devuelto es del tipo buffer, por lo que es necesaria una conversión a String para que su contenido sea legible.
* rmSync(ruta): Elimina el fichero especificado en la ruta. Si el fichero no existe devuelve un mensaje de error.
* readdirSync(ruta): Lee el contenido de un directorio especificado en la ruta. Devuelve un vector de String con el nombre de los ficheros contenidos en el directorio.

## Programa principal

El programa principal, index.ts, se encarga de parsear los comandos introducidos por el usuario y ejecutar el código correspondiente en consecuencia:

~~~ typescript
import * as chalk from "chalk";
import * as yargs from "yargs";
import {NoteClass} from "./noteClass";

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
      if ((typeof argv.title === 'string')&&(typeof argv.user === 'string')&&(typeof argv.body === 'string')&&(typeof argv.color === 'string')) {
        if (["red", "green", "blue", "yellow"].filter((v) => (v == argv.color)).length > 0){
            new NoteClass(argv.user).addNote(argv.title, argv.body, argv.color);
        } else {
            console.log(chalk.red("Color not valid"));
        }
      }
      else{
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
      if ((typeof argv.title === 'string')&&(typeof argv.user === 'string')) {
        new NoteClass(argv.user).rmNote(argv.title);
      }
      else{
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
      if ((typeof argv.title === 'string')&&(typeof argv.user === 'string')) {
        if (argv.color == undefined || ["red", "green", "blue", "yellow"].filter((v) => (v == argv.color)).length > 0){
          new NoteClass(argv.user).modifyNote(argv.title, argv.ntitle, argv.body, argv.color);
        } else {
            console.log(chalk.red("Color not valid"));
        }
      }
      else{
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
        new NoteClass(argv.user).lsNote();
      }
      else{
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
      if ((typeof argv.title === 'string')&&(typeof argv.user === 'string')) {
        new NoteClass(argv.user).readNote(argv.title);
      }
      else{
        console.log(chalk.red("Invalid type for the params"));
      }
    },
  });
  yargs.parse();

~~~

Como se puede apreciar, los comandos recurren a la clase NoteClass para implementar las funcionalidades requeridas. Esta clase será explicada en el próximo apartado. Los comandos implementados han sido los siguientes:

* **add**: Permite añadir una nueva nota a la lista de notas del usuario. Este comando recibe las opciones adicionales:
	* --user: Obligatorio. Indica el usuario que desea añadir una nota.
	* --title: Obligatorio. Título de la nota que se desea añadir.
	* --body: Obligatorio. Contenido de la nota que se desea guardar..
	* --color: Obligatorio. Color con el que se debe imprimir la nota por pantalla. Se comprueba que el color sea válido.
Este comando invoca al método **addNote** de la **NoteClass**.

* **rm**: Elimina una nota de la lista de notas del usuario. Este comando recibe las opciones adicionales:
	* --user: Obligatorio. Indica el usuario que desea eliminar una nota.
	* --title: Obligatorio. Título de la nota que se desea eliminar.
Este comando invoca al método **rmNote** de la **NoteClass**.

* **mod**: Modifica el contenido de una nota existente. Este comando recibe las opciones adicionales:
  * --user: Obligatorio. Indica el usuario que desea añadir una nota.
  * --title: Obligatorio. Título de la nota que se desea modificar.
	* --ntitle: Opcional: Nuevo título de la nota modificada. En caso de ser omitido se conserva el valor anterior.
	* --body: Opcional. Nuevo valor del contenido de la nota. En caso de ser omitido se conserva el valor anterior.
	* --color: Opcional. Nuevo color con el que se debe imprimir la nota por pantalla. En caso de ser omitido se conserva el valor anterior.
Este comando invoca al método **modifyNote** de la **NoteClass**.

* **ls**: Lista el contenido de la lista de notas del usuario, imprimiendo el título de cada nota con el color especificado en su contenido. Este comando recibe las opciones adicionales:
	* --user: Obligatorio. Indica el usuario que desea listar sus notas.
Este comando invoca al método **lsNote** de la **NoteClass**.

* **read**: Imprime por pantalla el contenido de la nota especificada por el usuario de su lista de notas usando el color especificado en la nota.. Este comando recibe las opciones adicionales:
	* --user: Obligatorio. Indica el usuario que desea leer la nota.
	* --title: Obligatorio. Título de la nota que se desea leer.
Este comando invoca al método **readNote** de la **NoteClass**.

## NoteClass

Esta clase tiene una serie de métodos que nos permiten manipular notas de un usuario apoyándonos en las funcionalidades que nos proporciona la API del sistema de ficheros de Node. La clase recibe como parámetro en el constructor el nombre del usuario cuyas notas serán objeto de las operaciones.

### Función getJSON:
~~~ typescript
getJSON(title:string, body:string, color:string){
        return `{\n\t\"title\":\"${title}\",\n\t\"body\":\"${body}\",\n\t\"color\":\"${color}\"\n}`;
    }

~~~

Dado que nuestro programa almacena las notas de los usuarios en ficheros con formato JSON, resulta de gran utilidad definir una función que permita obtener una cadena formateada a partir de los parámetros título, cuerpo y color.

### Función addNote:
~~~ typescript
addNote(title:string, body:string, color:string){
        if(!filesys.existsSync(`./files/${this.user}`)){
            filesys.mkdirSync(`./files/${this.user}`);
        }
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)){
            console.log(chalk.red("The note already exists!"));
        } else {
            filesys.writeFileSync(`./files/${this.user}/${title}.json`, this.getJSON(title, body, color));
            console.log(chalk.green("Succesfully created!"));
        }
    }

~~~

Esta función crea una nota. En primer lugar, comprueba que el directorio del usuario existe y en caso contrario lo crea. A continuación se comprueba si ya existe un fichero en dicho directorio que comparta nombre con el título de la nota que queremos añadir. Si se valida esta condición quiere decir que ya existe una nota con el título que queremos insertar, luego emite un mensaje de error a través de la terminal. En caso contrario, crea un fichero con writeFileSync. A la función writeFileSync le pasamos la ruta del nuevo archivo y una cadena con formato JSON que contiene la información del título, body y color. Esta cadena la obtenemos a partir de la función definida anteriormente **getJSON**

## Función rmNote:
~~~ typescript
 rmNote(title:string){
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)){
            filesys.rmSync(`./files/${this.user}/${title}.json`);
        } else {
            console.log(chalk.red("That note does not exist."));
        }
    }

~~~

Esta función elimina una nota. En primer lugar, comprueba que la ruta al fichero existe. Si no existe emite un mensaje de error a través de la terminal, mientras que en caso contrario elimina el fichero haciendo uso de la función rmSync, que recibe como parámetro la ruta al fichero.

### Función modifyNote:
~~~ typescript
 modifyNote(title:string, ntitle:string|unknown, body:string|unknown, color:string|unknown){
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)){
            let jsonobj = JSON.parse(String(filesys.readFileSync(`./files/${this.user}/${title}.json`)));
            if (ntitle != undefined){
                jsonobj.title = String(ntitle);
            }
            if (body != undefined){
                jsonobj.body = String(body);
            }
            if (color != undefined){
                jsonobj.color = String(color);
            }
            filesys.rmSync(`./files/${this.user}/${title}.json`);
            filesys.writeFileSync(`./files/${this.user}/${jsonobj.title}.json`, this.getJSON(jsonobj.title, jsonobj.body, jsonobj.color));
            console.log(chalk.green("Succesfully modified!"));
        } else {
            console.log(chalk.red("That note does not exist."));
        }
    }

~~~

Esta función modifica una nota existente. En primer lugar, comprueba que la ruta al fichero existe. En caso de que no exista, emite un mensaje de error por la terminal. En caso contrario, lee el contenido del archivo y lo carga en un objeto JSON. Esto es posible gracias a la función JSON.parse, que recibe un string que siga la sintaxis de JSON y devuelve el objeto que representa. A continuación, comprueba los parámetros opcionales. En caso de ser undefined, la propiedad correspondiente del objeto conservará su valor anterior. En caso de ser string, la propiedad correspondiente del objeto se actualiza con su nuevo valor. Finalmente, elimina el archivo existente y crea uno nuevo, guardando el contenido del objeto JSON auxiliar.

### Función lsNote:
~~~ typescript
lsNote(){
        if(!filesys.existsSync(`./files/${this.user}`)){
            console.log(chalk.red(`User ${this.user} has no notes`));
        } else {
            if(filesys.readdirSync(`./files/${this.user}`).length == 0){
                console.log(chalk.red(`User ${this.user} has no notes`));
            } else {
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

~~~

Esta función imprime el listado de notas del usuario. En primer lugar, comprueba que el directorio del usuario exista y que haya al menos un fichero en él, imprimiendo un mensaje de error en caso contrario. Para poder imprimir el título de cada nota usando el color especificado en la propia nota es necesario:
	1. Obtener un array de string con los ficheros existentes en el directorio.
	2. Para cada fichero, abrirlo, cargarlo en un objeto JSON y comprobar el color.
	3. Mediante un switch, imprimir por pantalla el contenido del título usando una función de chalk dentro de un console.log() usando un color equivalente al color indicado en la nota.

### Función readNote:
~~~ typescript
 readNote(title:string){
        if (filesys.existsSync(`./files/${this.user}/${title}.json`)){
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
        } else {
            console.log(chalk.red("That note does not exist."));
        }
    }

~~~

Esta función imprime el contenido de una nota. Su funcionamiento es similar a lsNote: En primer lugar, comprueba que el fichero exista, imprimiendo un mensaje de error en caso contrario. A continuación, carga el contenido del fichero en un objeto JSON y se imprime el contenido del título y el body por pantalla usando una estructura switch para determinar el color de la letra.

## Integración continua: GitHub Actions.

Las GitHub actions nos permiten ejecutar una serie de acciones cuando se detecta un cambio en el repositorio (push o pull request), que emplearemos para comprobar cómo han afectado los cambios al código. Para usar las GitHub Actions debemos haber creado, ya sea manualmente o desde la página, una carpeta .github/workflows. Además, deberemos instalar como dependencias de desarrollo todos los paquetes que tengamos instalados de forma global en la máquina y que estemos empleando en el proyecto, ya que las actions se ejecutarán en máquinas virtuales que instalarán las dependencias especificadas en el package.json antes de ejecutar los pasos especificados.

En nuestro caso, emplearemos las GitHub Actions para comprobar los tests y lanzar coveralls y SonarCloud:

### Tests:

Para ejecutar los tests debemos añadir el siguiente fichero yml a la carpeta workflows:

~~~
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Tests

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 15.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test

~~~

Podemos ver por los últimos comandos que la función de este fichero es ejecutar el comando test de nuestro package.json, el cual simplemente recurre a mocha para ejecutar las pruebas. Estas pruebas se ejecutan en las versiones 14.x y 15.x de node, pues para versiones anteriores las pruebas fallarán debido a que no existen algunas funciones de la API síncrona del sistema de ficheros de node para dichas versiones.

### Coveralls:

Para realizar las pruebas de cubrimiento del código de Coveralls deberemos incluir el siguiente código en un fichero yml en la carpeta workflows:

~~~
name: Coveralls

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  coveralls:

    runs-on: ubuntu-latest

   
    steps:
    - name: Cloning repo
      uses: actions/checkout@v2
    - name: Use Node.js 15.x
      uses: actions/setup-node@v2
      with:
        node-version: 15.x
    - name: Installing dependencies
      run: npm install
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@master
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}

~~~

En este caso los pasos se ejecutarán sólo en la versión 15.x de Node. Tras instalar las dependencias ejecuta el comando coverage de nuestro package.json, que emplea istambul para generar un fichero con la información de cubrimiento que empleará coveralls. A continuación se hace uso de la GitHub Action de Coveralls.

### SonarCloud:

SonarCloud es una herramienta que nos permite visualizar estadísticas del código que estamos desarrollando. Para incluir un flujo de trabajo de SonarCloud en nuestro repositorio debemos acceder a la página de Sonar Cloud y desactivar la opción de análisis automático, accediendo a continuación a la opción de “seguir el tutorial” que nos muestra la página inmediatamente después. Este tutorial consiste en añadir a nuestro repo un secreto de SonarCloud y los siguientes ficheros:

En workflows, sonarcloud.yml:
~~~
name: Sonar-Cloud

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master
      
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - name: Cloning Repo
        uses: actions/checkout@v2
        with:
          fetch-depth: 0  # Shallow clones should be disabled for a better relevancy of analysis
      - name: Uses Node.js
        uses: actions/setup-node@v1
        with: 
          node-version: 15.x
      - name: Installing dependencies
        run: npm install
      - name: Generating coverage report
        run: npm run coverage
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # Needed to get PR information, if any
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

~~~

En la carpeta raiz, sonar-project.properties:

~~~
sonar.projectKey=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500
sonar.organization=ull-esit-inf-dsi-2021

# This is the name and version displayed in the SonarCloud UI.
sonar.projectName=ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-alu0101209500
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
sonar.sources=src

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8

# Coverage info
sonar.javascript.lcov.reportPaths=coverage/lcov.info

~~~

Es importante tener en cuenta que para que todo esto funcione correctamente el repositorio debe tener visibilidad pública.
