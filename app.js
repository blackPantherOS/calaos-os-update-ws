var express = require('express');
var app = express();
var versions = require('./versions.json');

app.get('/update', function(req, res) {
    res.type('application/json');
    var machine = req.query.machine
    var version = req.query.version;
    var type = req.query.type;

    console.log("Parameter: " + machine);
    console.log("Parameter: " + version);
    console.log("Parameter: " + type);


    var findMaxStable = function(object, type)
    {
    var max = "";
    var k;
    for (var key in object) {
        if(object[key].version > max)
        {
            if (type == "stable" && object[key].version.search("beta") == -1  && object[key].version.search("rc")  == -1 && object[key].version.search(".99")  == -1)
            {
                max = object[key].version;
                k = key;
            }
            else if (type != "stable")
            {
                max = object[key].version;
                k = key;
            }
        }
    }

    if (max != 0)
        return k;
    }



    var max = findMaxStable(versions, type)
    v1 = versions[max]

    if (type != "stable")
    {
        var max = findMaxStable(versions, "stable")
        v2 = versions[max]
        if (v1.version.search(v2.version) != -1)
            v1 = v2
    }

    console.log(v1);


    update = new Object();
    update.machine = machine;
    update.url = "test";
    update.version = v1;


    res.json(update);
});


app.listen(process.env.PORT || 8428);
