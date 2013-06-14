#!/usr/bin/python3
# Description:
# Logger, which writes message from msg parameter into a logfile log/$app.log
# The app parameter determines the part before .log.
#
# Author:
# Thomas Skora <thomas@skora.net>

import cgi
import re
import sys
import datetime

print("Content-Type: text/plain")
print("X-Content-Type-Options: nosniff")
print("")

param = cgi.FieldStorage()
app = param.getfirst("app")
msg = param.getfirst("msg")

if app == None:
    app = "default"
if msg == None:
    msg = "### No message ###"

if not re.match("^[a-z\d]+$", app, re.I):
    print("Error: app parameter must only contain alphanumeric characters.")
    sys.exit(0)

try:
    f = open("log/{}.log".format(app), "a")
    now = datetime.datetime.now()
    f.write("{:02d}.{:02d}.{:4d} {:02d}:{:02d}:{:02d}.{:06d} - {}\n".format(now.day, now.month, now.year, now.hour, now.minute, now.second, now.microsecond, msg))
    f.close()
except EnvironmentError as e:
    print("Error while writing log: " + e.strerror)
    sys.exit(0)

print("Logged!")
