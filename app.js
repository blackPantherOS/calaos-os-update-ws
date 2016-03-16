var express = require('express')
var app = express()
var versions = []

app.get('/', function(req, res) {
    res.type('application/json');

    var machine = req.query.machine
    var version = req.query.version
    var type = req.query.type

    versions = require('./versions.json')

    if (req.query['versions'])
    {
        res.type('application/json');
        res.json(versions);
        return;
    }

    if (version.charAt(0) != 'v')
    {
	console.log("malformed version, should begin with 'v'");
	res.status(500).send('malformed version, should begin with v');
	return
    }

    console.log("Parameter: " + machine)
    console.log("Parameter: " + version)
    console.log("Parameter: " + type)

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


    /* Get Max stable version relative to the machine in versions.txt file */
    var idx_stable = findMaxStable(versions, machine)

    /* Get the Max testing version relative to machine in versions.txt file */
    var idx_testing = findMaxTesting(versions, machine)

    /* neither stable nor testing version found, the version in parameter is the most recent one, or does not exists */
    if (idx_stable == -1 && idx_testing == -1)
    {
        v =  {status: "no new version"}
    }
    else
    {
	/* Get the stable and testing json object */
        stable = versions[idx_stable]
        testing = versions[idx_testing]

        console.log("Latest stable version : " + stable.version)
        console.log("Latest testing version : " + testing.version)

	/* Stable */
        if (type == "stable")
        {
	    /* we asked for a version which is the most recent stable, no reason to update */
            if (version > stable.version)
            {
		/* if testing version contains stable version e.g v2.0-beta1-X-SHA1 contains v2.0, the most recent version is the stable one */
		if (testing.version.search(stable.version) != -1)
		{
                    v = {status: "noupdate"}
		}
		else
		    v = {status: "update", version: stable}

            }
	    else if (version == stable.version)
	    {
		v = {status: "noupdate"}
	    }
	    /* We return the most recent stable version */
            else
            {
		v = {status: "update", version: stable}
            }
        }
	/* testing */
        else if (type == "testing")
        {
	    /* the current version is a stable version */
            if (version.search("beta") == -1  && version.search("rc")  == -1 && version.search(".99")  == -1)
            {
		/* And  is greater or equal to the most recent stable version, returns no update */
                if (version >= stable.version)
                {
                    v = {status: "noupdate"}
                }
		/* else returns the greater testing version */
                else
                {
                    v = {status: "update", version: testing}
                }
            }
            else
            {
                console.log("compare " + version + "and " + testing.version)
		/* current version is greater or equal to the most recent testing version, returns no update */
                if (version >= testing.version)
                {
                    v = {status: "noupdate"}
                }
		/* Else returns the most recent testing revision */
                else
                {
		    if (testing.version.search(stable.version) != -1)
		    {
			v = {status: "update", version: stable}
		    }
		    else
			v = {status: "update", version: testing}
                }
            }
        }
	/* Unknown case : return noupdate */
	else
        {
	    v = {status: "noupdate"}
        }
    }

    //console.log(v);
    /* returns the object */
    update = new Object()
    update = v
    res.json(update)
});

console.log("Calaos Versions WebService : http://127.0.0.1:8428")
app.listen(process.env.PORT || 8428)
