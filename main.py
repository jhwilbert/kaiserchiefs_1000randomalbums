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

from google.appengine.ext import db
from google.appengine.ext import webapp
from models import Counters
from google.appengine.ext.webapp import util
from BeautifulSoup import BeautifulSoup
from google.appengine.api import urlfetch
from google.appengine.ext.webapp import template
from django.utils import simplejson as json


class MainHandler(webapp.RequestHandler):
    def get(self):
    
        template_values = {
            'greetings': 'greetings',
        }

        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

        
class json(webapp.RequestHandler):
    def get(self):
        q = Counters.all()
        #start = int(self.request.get('start'));
        #end = int(self.request.get('end'));

        counters = db.GqlQuery("SELECT * FROM Counters")
        for x in counters:
            covers = x.json        
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(covers)
        #totalCovers = len(jsonObj)

        
        
class scrape(webapp.RequestHandler):
    def get(self):
	    
	    # limit counter

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
            # no page was found
            counter.counter+=1
            counter.put()
            
            self.response.out.write('<script>document.location="/scrape"</script>')
        else:
            # parse content
            body = BeautifulSoup(result.content)
            body.prettify()
            
            try:
                images = body.findAll("img", height="316")                
            except:
                print ''
                print pointer.pointer
                #print result.status_code
                #print body
                sys.exit()
                
            if len(images) == 0:
                self.response.out.write('All done (or there was an error)<br>')
            else:               
                #self.response.out.write(counter.counter)
                src = str(images[0])
                imageArray = src.split(" ")
               
                imagepath2 = imageArray[1].lstrip('src="')[0:-1] # image path
                imagepath = imagepath2.replace("316","200")


                #fullpath = imagepath 
                fullpath = 'http://www.kaiserchiefs.com' + imagepath
                
                username = imageArray[2].lstrip('alt="')[0:-2] # username
            
                
                if username not in coverjson:
                    coverjson[counter.counter] = {"path":  fullpath, "username":  username, "highlight":  0 }
             
                counter.json = simplejson.dumps(coverjson)
                counter.counter+=1
                counter.put()
                self.response.out.write('<script>document.location="/scrape"</script>')
          
def main():
    application = webapp.WSGIApplication([('/scrape', scrape),
                                          ('/display', json),
                                          ('/', MainHandler)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
