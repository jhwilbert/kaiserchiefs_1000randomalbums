#!/usr/bin/env python
from google.appengine.ext import db

class Counters(db.Model):
  json              = db.TextProperty()
  counter           = db.IntegerProperty(default=0)
