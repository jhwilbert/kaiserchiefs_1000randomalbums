#!/usr/bin/env python
#
# Code to grab the tracks used in user created albums on the Kaiser Chief's
# website
#
# Quickly hacked together with not enough error checking
#
import simplejson
from google.appengine.ext import db
from models import Counters



# First of all get the pointer number out of pointers
counters = db.GqlQuery("SELECT * FROM Counters")
limit = request.get('limit');

#print 'Content-Type: application/json; charset=UTF-8'
print limit
#print ''
#print counters[0].json
