Calaos OS update Webservice.
This nodejs webservice serve OTA for calaos OS.
Client ask for new version by getting address : http://ws_ip:ws_port/update?version=2.0&machine=raspberrypi&type=testing and this webservice returns the url of the newest image for this machine if it exists.