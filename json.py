#!/usr/bin/env python

import simplejson
from google.appengine.ext import db
from models import Counters



# First of all get the pointer number out of pointers
counters = db.GqlQuery("SELECT * FROM Counters")
limit = request.get('limit');

#print 'Content-Type: application/json; charset=UTF-8'
print limit
