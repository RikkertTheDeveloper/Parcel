#!/usr/bin/env node

/**
    * Parcel.js, a package manager for the luau language.   
    * @author Rick Arendsen
*/

//* Instantiate required packages:
const file_system = require('fs');
const parcel_generation = require('./packages/@parcel-generation');
const parcel_globals = require('./packages/@parcel-globals');

//* Instantiate application text constants:
const textTemplate_packageInstallation = `Successfully installed package %s.`
const textTemplate_scanningDependencyTree = `Scanning dependency tree for project %s.`
const textTemplate_packageUninstallation = `Successfully uninstalled package %s.`
const textTemplate_commandNotFound = `Command %s is not known within the command registry.`
const textTemplate_packageExists = `Package %s already exists.`
const textTemplate_packageNotFound = `Package %s could not be located.`
const textTemplate_commandErrorMessage = `An exception occured while executing command %s.`

//* Instantiate command line arguments.
const commandArguments = process.argv;
const commandArgument_command = commandArguments[2] ?? "None";
const commandArgument_parameter = commandArguments[3] ?? "None";

/**
    * Main application process.
    * @desc This part of the application sees what command is being executed.
    * @author Rick Arendsen 
*/
const currentDirectory_path = __dirname;
const currentProject_packageFile = parcel_globals.getPackageFile(currentDirectory_path);

//* Before we start executing commands, make sure that the parcel-packages folder exists.
if(!parcel_generation.verifyPackageFolder(currentDirectory_path)) {
    parcel_generation.generatePackageFolder(currentDirectory_path)
}

//* Now, see what command we are trying to execute:
switch (commandArgument_command) {
    case 'install':

        //* See if the package does not already exist, if so, return an error message.
        if(parcel_generation.verifyPackage(currentDirectory_path, commandArgument_parameter)) {
            console.log(textTemplate_packageExists, commandArgument_parameter)
        } else {
            parcel_generation.installPackage(currentDirectory_path, commandArgument_parameter);
            console.log(textTemplate_packageInstallation, commandArgument_parameter)
        }

        break;

    case 'uninstall':

        //* See if the package does indeed exist, if not, return an error message.
        if(parcel_generation.verifyPackage(currentDirectory_path, commandArgument_parameter)) {
            parcel_generation.uninstallPackage(currentDirectory_path, commandArgument_parameter);
            console.log(textTemplate_packageUninstallation, commandArgument_parameter)
        } else {
            console.log(textTemplate_packageNotFound, commandArgument_parameter)
        }
        break;

    case 'flatten':

        /** 
            * This function will scan through the dependency tree and make sure that the dependencies are 'flattend'.
            * What this means is that the file size is smaller due to less duplicate dependencies existing.
        */
        console.log(textTemplate_scanningDependencyTree, currentProject_packageFile.name)
        parcel_globals.flattenDependencyTree(currentDirectory_path)
        break;


    //* If a command could not be resolved, make sure to communicate this back to the user.
    default:
        console.log(textTemplate_commandNotFound, commandArgument_command)
        break;
}
