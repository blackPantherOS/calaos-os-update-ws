Calaos OS update Webservice.
This nodejs webservice serve OTA for calaos OS.
Client ask for new version by getting address : http://ws_ip:ws_port/update?version=2.0&machine=raspberrypi&type=testing and this webservice returns the url of the newest image for this machine if it exists.


#Run web service

1- Install all you need for running the app :

```
npm install express
```

2- Launch webservice
```
node app.js
```

#Unit tests

1. install dependencies to run tests :
```
npm install supertest
npm install assert
npm install -g mocha
```

2. run the test suite
```
mocha
```