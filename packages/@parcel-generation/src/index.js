#!/usr/bin/env node

const file_system = require('fs');
const parcelPackageTemplate = `{\n    "name": "package-name-here",\n    "description": "Enter your package description here.",\n    "author": "Enter your own name here.",\n    "repository": "Enter your GitHub repository URL here if applicable."\n}`
const defaultParcelPackageData = `{}`

module.exports = {
    /**
        * This function generates a packages folder.. 
        * @param {string} folder - The folder to generate the test in.
    */
   generatePackageFolder: function(folder) {
        file_system.mkdirSync(`${folder}/parcel-packages`);
   },

   /**
        * This function sees if a package already exists within the parcel-packages folder.
        * @param {string} folder - The folder to verify the package in.
        * @param {string} package - The package to verify.
        * @return {boolean} - If the package folder exists.
    */
    verifyPackage: function(folder, package) {
        return file_system.existsSync(`${folder}/parcel-packages/@${package}`);
   },

    /**
        * This function sees if a package folder already exists.
        * @param {string} folder - The folder to verify the package in.
        * @return {boolean} - If the parcel-packages folder exists.
    */
   verifyPackageFolder: function(folder) {
        return file_system.existsSync(`${folder}/parcel-packages`);
   },

   /**
       * This function installs a new package to the parcel-packages folder.
       * @param {string} folder - The root path of the application.
       * @param {string} package - The name of the package to be installed.
   */
   installPackage: function(folder, package) {
       const expectedPackagePath = `${folder}/parcel-packages/@${package}`;

       if(!file_system.existsSync(expectedPackagePath)) {
           file_system.mkdirSync(expectedPackagePath);
           file_system.writeFileSync(`${expectedPackagePath}/.parcel-package.json`, defaultParcelPackageData, 'utf-8');
       }
   },

   /**
       * This function uninstalls a new package from the parcel-packages folder.
       * @param {string} folder - The root path of the application.
       * @param {string} package - The name of the package to be uninstalled.
   */
    uninstallPackage: function(folder, package) {
        if(file_system.existsSync(`${folder}/parcel-packages/@${package}`)) {
            file_system.rmSync(`${folder}/parcel-packages/@${package}`,  {recursive: true, force: true });
        }
   },

   /**
       * This function generates a new parcel package file.
       * @param {string} folder - The root path of the application.
       * @param {Buffer} - The package file.
   */
    generatePackageFile: function(folder) {
        file_system.writeFileSync(`${folder}/parcel-package.json`, parcelPackageTemplate, 'utf-8');
        return file_system.readFileSync(`${folder}/parcel-package.json`)
   }
}