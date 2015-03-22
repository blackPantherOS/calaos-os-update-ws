#!/usr/bin/env node

var fs = require('fs');
var filename = './versions.json';
var arguments = process.argv.slice(2);


// Arguments : machine, version, type, url

if (arguments.length != 4) {
    console.log("Usage: " + process.argv[0] + ' ' + process.argv[1] + " MACHINE version type url")
    console.log("\tMACHINE: raspberrypi, cubieboard ...")
    console.log("\tversion: v2.0, v2.0-beta1, ...")
    console.log("\t   type: stable or testing")
    console.log("\t    url: url where to download the image of this version")
    process.exit(1);
}

var versions = [];

if (fs.existsSync(filename)) {
    versions = require(filename)
}



var machine = arguments[0]
var version = arguments[1]
var type = arguments[2]
var url = arguments[3]
var found = false;

for (var v in versions)
{
    if (versions[v].machine == machine && versions[v].version == version &&
        versions[v].type == type && versions[v].url == url)
            found = true
}

if (!found) {
    versions.push({machine: machine,
                   version: version,
                      type: type,
                       url: url})
                       console.log("Version added : " + process.argv.slice(2))
    fs.writeFile(filename, JSON.stringify(versions, null, 4))
}
else
{
    console.log("This version already exists! Not added.")
}
