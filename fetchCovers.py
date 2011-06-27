import urllib, json

url = "http://kaiserchiefsalbums.appspot.com/outputdb"
counter = 0
response = urllib.urlopen(url)
content = response.read()

data = json.loads(content)

for x in data:
    counter = counter+1
    if counter == len(data):
        print "Finished all"
    else:
        print "Downloading" , str(counter) , "of" , len(data) , "id" , str(x)

        remotepath = data.get(x)['path']

        if data.get(x)['highlight'] == 0:
            localpath = data.get(x)['path'][56:96]   
        else: 
            localpath = data.get(x)['path'][56:96]   
            
        print x + "Fetching..." + remotepath
        print "Saving as..." + localpath
        urllib.urlretrieve(remotepath, localpath)