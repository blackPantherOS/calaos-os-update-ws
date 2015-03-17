var fs = require('fs');
var express = require('express');
var app = express();
var semver = require('semver');
var versions = require('./versions.json');

app.get('/update', function(req, res) {
    res.type('application/json');
    var machine = req.query.machine
    var version = req.query.version;
    var type = req.query.type;

    console.log("Parameter: " + machine);
    console.log("Parameter: " + version);
    console.log("Parameter: " + type);

    if (!type)
        type = "stable"

    var v = new Object();
    v.version = version;
    for(var index in versions) {
        if (machine == versions[index].machine &&
            semver.gt(versions[index].version, v.version))
            {

                //console.log(versions[index], type, versions[index].version.search("beta"), versions[index].version.search("rc"));

                if (type == "testing" || ( type == "stable" && versions[index].version.search("beta") == -1 &&
                                                               versions[index].version.search("rc") == -1))
                {
                    v = versions[index];
                    console.log(v);
                }
            }
    }

    //var url = "http://calaos.fr/download/" + type + "/calaos_os/";


    update = new Object();
    update.machine = machine;
    update.url = "test";
    update.version = v;


    res.json(update);
});


app.listen(process.env.PORT || 8428);
