# 1. How to modify existing user interface?

For the component which you need modified update *.html file and sometimes (rarely you'll do this) update the corresponding *.scss file (look and feel / colors
come from the used libraries and you should rarely need to worry about this)

# 2. How to modify existing application logic?

For the component which you need modified update the corresponding *.ts file

# 3. How to add a new screen?

The application is built from "components" - While this is not mandatory usually for 1 application screen you will find 1 component under the <em>src/app/components</em> folder

For building a new screen start by copy pasting the simplest existing screen / component which is <strong>help-about</strong> - rename the new folder / files / component to match your screen / component and then in the existing source code trace where the help-about component / screen is referenced and similarly update your component.

If you need to read / write from the database look at the existing <em>src/app/components/options</em> component which is the simplest screen which is also reading/writing to the database.

If you need more complicated examples look at <em>sinner-list</em> and <em>sinner-form</em> existing components.

<hr>

# Other information

<hr>

## 4. Development background information

Game of Sins is a desktop application build using web technologies. Historically JavaScript was used in the browser however since few years Node.js https://en.wikipedia.org/wiki/Node.js bought JavaScript on the server also. In addition to JavaScript / Node.js Game of Sins uses also Electron which is a framework built by GitHub which allows to 'Build cross platform desktop apps with JavaScript, HTML, and CSS' - https://electronjs.org - 

Side Note - Visual Studio Code from Microsoft is also built using Electron / Node.js / JavaScript

Node.js and Electron are the main technologies which are used. Besides Node.js and Electron there are (many) other frameworks / libraries used to build the application. The most important one is Angular - https://angular.io which 'is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google' - https://en.wikipedia.org/wiki/Angular_(application_platform)

Angular tutorial (easy to follow) - https://angular.io/guide/quickstart

<strong>User interface libraries used</strong>

<br>https://getbootstrap.com - Build responsive, mobile-first projects on the web with the world's most popular front-end component library.
<br>https://adminlte.io - Best open source admin dashboard & control panel theme. Built on top of Bootstrap 3, AdminLTE provides a range of responsive, reusable, and commonly used components.
<br>https://valor-software.com/ngx-bootstrap/#/ - Bootstrap components, powered by Angular

<strong>Other libraries used</strong>

You can find the full list of use libraries in the file <em>package.json</em> under the dependencies and devDependencies sections

    "@toverux/ngx-sweetalert2": "^4.0.0", //when you delete a sin a modal is asking "Are you sure?" sweetalert2 is used for that modal
    
    "sweetalert2": "^7.28.4",
    
    "admin-lte": "^2.4.8", //Admin LTE is an "admin" theme built on top of bootstrap - the general look and feel of the app is coming from Admin LTE (and bootstrap)
    
    "bcryptjs": "^2.4.3", //used for hashing the data which needs to be hashed
    "bookshelf": "^0.13.3", // used to save and load from the database
    "bootstrap": "^3.3.7", // bootstrap is the fundational user interface library used (admin lte is built on top of bootstrap)
    "font-awesome": "^4.7.0", //nice looking icons
    "jquery": "^3.2.1", //required by bootstrap and admin lte
    "knex": "^0.15.2", // required by the above bookshelf and is used to save and load from the database
    "moment": "^2.22.2", // used from some date-time manipulation
    "ngx-bootstrap": "^3.0.1", // library which makes bootstrap work nice with Angular
    "slash": "^2.0.0", //small path utility
    "sqlite3": "^4.0.2", //database engine
    "toastr": "^2.1.4" //when you do actions in the application you get some nice message on the top write - this is the library which handles these.


