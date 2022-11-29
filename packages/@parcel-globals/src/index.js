#!/usr/bin/env node

const file_system = require('fs');
const parcel_generation = require("../../@parcel-generation")

module.exports = {
    /**
        * This function looks through the parcel-package.json file and sees if there is anything that can be optimised.
        * @param {string} root - The root path of the application.
    */
   flattenDependencyTree: function(root) {
        const currentPackageFile = this.getPackageFile(root);
   },

    /**
        * This function looks through the root of the application and gets the package. If there is no package, it will
        * prompt the user to create a new project.
        * @param {string} root - The root path of the application.
        * @return {JSON} The package file as a JSON format.
    */
    getPackageFile: function(root) {
        const packageFileExists = file_system.existsSync(`${root}/parcel-package.json`);

        if(!packageFileExists) {
            return JSON.parse(parcel_generation.generatePackageFile(root));
        } else {
            return JSON.parse(file_system.readFileSync(`${root}/parcel-package.json`));
        }
    }
}