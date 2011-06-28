#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import simplejson
import sys
import urllib2

from google.appengine.ext import db
from google.appengine.ext import webapp
from models import Counters
from models import Highlighted
from google.appengine.ext.webapp import util
from BeautifulSoup import BeautifulSoup
from google.appengine.api import urlfetch
from google.appengine.ext.webapp import template
from django.utils import simplejson as json
import random

############################################ Main ###################################################

class MainHandler(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, {}))


############################################ JSON ouputs ############################################
class outputdb(webapp.RequestHandler):
    def get(self):
        counters = db.GqlQuery("SELECT * FROM Counters")
        for x in counters:
            covers = x.json        
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(covers)

class outputhighlighted(webapp.RequestHandler):
    def get(self):
        counters = db.GqlQuery("SELECT * FROM Highlighted")
        for x in counters:
            covers = x.json        
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(covers)
           
############################################ Highlighting ############################################     

class highlight(webapp.RequestHandler):
    def get(self):
        highlighted = db.GqlQuery("SELECT * FROM Highlighted")
        coverjson = {}

        if highlighted.count() == 0:
            counter = Highlighted() # instantiates model
            counter.counter = 1113
            counter.json = simplejson.dumps(coverjson)
            counter.put()
        else:
            counter = highlighted[0]
            coverjson = simplejson.loads(counter.json)

        # get highlighted album from request
        usernameHighlighted = self.request.get("username")
        url = 'http://www.kaiserchiefs.com/'+usernameHighlighted

        result = urlfetch.fetch(url=url)

        # scrape image from page
        if result.status_code != 200:
            self.response.out.write('Couldnt find album')
        else:
            body = BeautifulSoup(result.content)
            body.prettify()            
            try:
                # locate image
                image = body.findAll("img", height="316")
            except:
                print ''
                sys.exit()
            if len(image) == 0:
                print 'image not found'
            else:
                src = str(image[0])
                imageArray = src.split(" ")

                stripedPath = imageArray[1].lstrip('src="')[0:-1] # image path               
                username = imageArray[2].lstrip('alt="')[0:-2] # username

                if username not in coverjson:
                     imagepath = 'http://www.kaiserchiefs.com' + stripedPath.replace("/service/ResizeImage/316/316/","/service/ResizeImage/300/300/")
                     coverjson[counter.counter] = {"path":  imagepath, "username":  username, "highlight":  1 }


                self.response.out.write(counter.counter)
                self.response.out.write(username)
                self.response.out.write(imagepath)

                counter.json = simplejson.dumps(coverjson)
                counter.counter-=1
                counter.put()
############################################ Scraping ############################################           
# Based on Dan Catt's "The Most Statistically Correct Kaiser Chiefs Album" 
# https://github.com/revdancatt/kaiserchiefstrackcounter

class scrape(webapp.RequestHandler):
    def get(self):
        counters = db.GqlQuery("SELECT * FROM Counters")
        coverjson = {}
        
        if counters.count() == 0:
            counter = Counters() # instantiates model
            counter.counter = 1113
            counter.json = simplejson.dumps(coverjson)
            counter.put()
        else:
            counter = counters[0]
            coverjson = simplejson.loads(counter.json)
            
        # get album URL
        url = 'http://www.kaiserchiefs.com/album/%s' % counter.counter
        result = urlfetch.fetch(url=url)

        if result.status_code != 200:
            counter.counter+=1
            counter.put()
            self.response.out.write('<script>document.location="/scrape"</script>')
        else:
            body = BeautifulSoup(result.content)
            body.prettify()
            try:
                images = body.findAll("img", height="316")                
            except:
                print ''
                print pointer.pointer
                sys.exit()
            if len(images) == 0:
                self.response.out.write('All done (or there was an error)<br>')
            else:
                
                src = str(images[0])
                imageArray = src.split(" ")
               
                stripedPath = imageArray[1].lstrip('src="')[0:-1] # image path               
                username = imageArray[2].lstrip('alt="')[0:-2] # username

                if username not in coverjson:
                     # resize the image using the site service
                     imagepath = 'http://www.kaiserchiefs.com' + stripedPath.replace("/service/ResizeImage/316/316/","/service/ResizeImage/150/150/")
                     coverjson[counter.counter] = {"path":  imagepath, "username":  username, "highlight":  0 }
                
                
                self.response.out.write(counter.counter)
                self.response.out.write(username)
                self.response.out.write(imagepath)

                counter.json = simplejson.dumps(coverjson)
                counter.counter+=1
                counter.put()
                self.response.out.write('<script>document.location="/scrape"</script>')
       
############################################ Counters ############################################   
       
class countScraped(webapp.RequestHandler):
    def get(self):	
        counters = db.GqlQuery("SELECT * FROM Counters")
        covers = counters[0].json

        jsonObj = simplejson.loads(covers)  
        buffers = {"buffer" : len(jsonObj) }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(buffers)

class countHighlighted(webapp.RequestHandler):
    def get(self):	
        counters = db.GqlQuery("SELECT * FROM Highlighted")
        covers = counters[0].json
        
        jsonObj = simplejson.loads(covers)  
        buffers = {"buffer" : len(jsonObj) }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(buffers)
        
############################################ Main ############################################           

def main():
    application = webapp.WSGIApplication([('/scrape', scrape),
                                          ('/outputdb', outputdb),
                                          ('/countscraped', countScraped),
                                          ('/outputhighlighted', outputhighlighted),
                                          ('/counthighlighted', countHighlighted),
                                          ('/highlight', highlight),
                                          ('/', MainHandler)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
