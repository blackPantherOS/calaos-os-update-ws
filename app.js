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

    var findMaxStable = function(object, machine)
    {
        var max = "";
        var k = -1;
        for (var key in object) {

            if(object[key].machine == machine && object[key].version > max)
            {
                if (object[key].version.search("beta") == -1  && object[key].version.search("rc")  == -1 && object[key].version.search(".99")  == -1)
                {
                    max = object[key].version;
                    k = key;
                }
            }
        }
        return k;
    }


    var findMaxTesting = function(object, machine)
    {
        var max = "";
        var k = -1;
        for (var key in object) {
            if(object[key].machine == machine && object[key].version > max)
            {
                    max = object[key].version;
                    k = key;
            }
        }

        return k;
    }



    var idx_stable = findMaxStable(versions, machine)
    var idx_testing = findMaxTesting(versions, machine)

    if (idx_stable == -1 && idx_testing == -1)
    {
        v =  {status: "no new version"}
    }
    else
    {

        stable = versions[idx_stable]
        testing = versions[idx_testing]
        console.log("Latest stable version : " + stable.version)

        console.log("Latest testing version : " + testing.version)

        if (testing.version.search(stable.version) != -1)
        {
            testing = stable
            console.log("Testing contains stable, Latest testing version is" + stable.version)
        }

        if (type == "stable")
        {
            if (stable.version == version)
            {
                v = {status: "no new version"}
                console.log("Stable version == checked version." + stable.status)
            }
            else
            {
                v = stable
            }
        }
        else if (type == "testing")
        {
            if (version.search("beta") == -1  && version.search("rc")  == -1 && version.search(".99")  == -1)
            {
                if (version > stable.version)
                {
                    v =  {status: "no new version"}
                }
                else
                {
                    console.log("HEEEEEEERRRRRRE")
                    v = testing
                }
            }
            else
            {
                console.log("compare " + version + "and " + "testing.version")
                if (version >= testing.version)
                {
                    v =  {status: "no new version"}
                }
                else
                {
                    v = testing
                }
            }
        }

    }
    console.log(v);

    update = new Object();
    update = v;

    res.json(update);

});

console.log("Calaos Versions WebService : http://127.0.0.1:8428")
app.listen(process.env.PORT || 8428);
