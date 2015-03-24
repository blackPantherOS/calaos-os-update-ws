var request = require('supertest');  
var assert = require("assert")

request = request('http://calaos.fr/update');

var tests = [
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v1.0', type: 'stable', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v1.5', type: 'stable', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v1.99', type: 'stable', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v2.0-beta1-1-SHA1', type: 'stable', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v2.0-rc1-10-SHA1', type: 'stable', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v2.0', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v2.1', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v2.99', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0-beta1-1-SHA1', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0-rc1-1-SHA1', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0', type: 'stable', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v1.99-1-SHA1', type: 'testing', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v2.0-beta1-1-SHA1', type: 'testing', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'update v2.0', machine: 'raspberrypi', version: 'v2.0-rc1-1-SHA1', type: 'testing', expected_status: 'update', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0-beta2-1-SHA1', type: 'testing', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0-rc1-1-SHA1', type: 'testing', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200},
    {desc: 'noupdate', machine: 'raspberrypi', version: 'v3.0', type: 'testing', expected_status: 'noupdate', expected_version: 'v2.0', httpCode: 200}
];

describe('Test Calaos OS update webservice', function() {

    for (i in tests)
    {
	describe(tests[i].desc, function() {
	    it('should return the right version', function(done) {
		request.get('?machine=' + tests[i].machine + '&version=' + tests[i].version + '&type=' + tests[i].type)
		    .expect(tests[i].httpCode)
		    .end(function(err, res) {
			if (err) {
			    throw err;
			}
			//			console.log(res.body);
			assert.equal(res.body.status, tests[i].expected_status);
			assert.equal(res.body.status, tests[i].expected_status);
			if (tests[i].expected_status == "update")
			{
			    assert.equal(res.body.version.version, tests[i].expected_version);
			}
			done();
		    });
	    });
	});
    }
});
