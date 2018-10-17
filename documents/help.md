# 1. Pre-requisites (for development only)

Node.js - https://nodejs.org/en/

Game of Sins is written in JavaScript (Node.js is for Javascript what the JVM / JDK / JRE is for Java).

Code editor - You could use any but I recommend Visual Studio Code - https://code.visualstudio.com

# 2. First time only

Once you have Node.js installed you need to clone the source repository from github

Once you have the source code locally, in the command prompt type<br>
<br><em>cd project-folder</em><br><br> 
and then run the command<br> 
<br><em>npm install</em><br><br> 
this command will take some time to download / install all the project dependencies (libraries) defined in the file
<em>package.json</em>

# 3. Usual development commands

Once all dependencies have been downloaded you can start to "code" - following are few commands to be used during development process

<br><strong><em>npm run start</em></strong> - will start the application in "development" mode - once started you can edit the application source files which should be automatically hot-reloaded on save (without having to stop / start again) (I found that hot-reload sometimes does not work and a stop/start of the application is required for the changes to take effect)

<br><strong><em>npm run package</em></strong> - will compile for production, run the end-to-end tests and, if all the tests are passing, package the <em>game-of-sins.zip</em> application zip file

# 4. End-to-End tests

Game of Sins comes with end-to-end tests to validate the application works fine. End-to-End source code is found in the <em>e2e</em> folder

The command to execute all e2e tests is 

<br><strong><em>npm run e2e</em></strong> - command to run all tests found in the <em>e2e</em> folder

e2e tests run directly on the "production" <em>Game of Sins.exe</em> file which means that the file <em>Game of Sins.exe</em> should be "built" before running the tests.

<br><strong><em>npm run package:prepare</em></strong> - command to build <em>Game of Sins.exe</em>

# 5. package.json

<br><strong><em>package.json</em></strong> - it is an important file because it declares all the dependencies / libraries used in the project along with all the
"commands" which can be executed - take a look at this file - you can find all the available commands under the "scripts" section.
