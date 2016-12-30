# A cleaning business

A progressive web app for a cleaning business.  The website has isomorphic react front end with node backend. 

##Setup 

React component are based on stateless presentation(components folder) and stateful containers(containers folder).
Container may be needed in client bundles or server side rendering.

State is a single redux store created from defining actions and reducers. Store is needed for client bundle and server side rendering.
The initial store must come from the database and any change must update it.

The database is one container and node another. CRUD operations are exposed to node container.

Docker compose sets up the enviroment. The database is mounted as volume and data is persistant.

The app is hydrated from the database and the components initialised with parameters set to null.

###Division of Concerns
Production
1. Node express middleware 
	* Passport
	* Pug template engine
	* Client components
2. Database 
	* Mongodb create as separate container
	* Hydrates app and update on redux store change.

###Connections
	Build files are always placed in html page.
	Html page must be complete when rendered by browser
		* Must have all HTML tags and styles for first paint.
			* Rendered by template engine.
		* Must begin to get data and attach event handlers.
			*  

 
	 
  

##How to run 

Everything needed to run is placed in dist folder.
Two modes:
1. prod
	* all: Bundle client;Move all files needed for server.
	* client: Bundle client files.
	* start: Start the server.
2. Dev
	* test: Run unit tests. 
	* pug: Copy pug files to dist folder if changed.
	* client: Setup proxy server and run hot module replacement
	* server: Run chrome dev tool with node. 

Production mode uses client assets from filesystem. Development uses hot module replacement.

Run webpack in production mode to get the bundled/minified css/js files.
```
npm run prod:client
```



## Getting Started



```
git clone https://github.com/mortonprod/CleaningWebsite
npm install
``` 

### Prerequisites

You will need github and node installed. For smoothtransition jquery must be older than 3.0 ajax.success not a function anymore.


### Installing


## Running the tests

The tests are run with jest

### The tests for each component

These test

```
npm jest
```

##Nginx

DNS (A record) will only resolve the domain name to https>> 443 and http>>80 ftp >> 21 port.  
You can redirect but this is only temporary.

So DNS will always direct port 443 or 80 and you need to use the info in request in nginx to 
sort the domain names and if SSL enabled or not.

Install with 
```
docker run -d \
  -p 80:80 \
  --name nginx \
  -v /usr/share/nginx/html \
  nginx
```
Expose /usr/share/nginx/html volume in container.


This is used as proxy server. This will proxy for HTTPS tests and multiple domain names.
Servers are split by port and domain name. Port 80 is HTTP and 443 HTTPS. 
Once a particular port and domain name is found the url(location) is used to 
Below we do a (301) perminant redirect if it is not the acme challenge. If https then redirect http application.
Perminent will change how search engines list your domain for your website.
```
server {
  listen 80;
  server_name my.example.org;
 
  location /.well-known/acme-challenge/ {
    root /var/www/letsencrypt;
  }
 
  location / {
    return 301 https://$host$request_uri;
  }
}
 
server {
  listen 443 ssl;
 
  ssl_certificate certs/live/my.example.org/fullchain.pem;
  ssl_certificate_key certs/live/my.example.org/privkey.pem;
 
  server_name my.example.org;
 
  location / {
    proxy_pass http://my.example.org;
  }
}
``` 

In the end you want multiple domain names and hosts(Can link different hosts to different ports).
The union file system is how containers are create. 
If you need persistant data then you need to go beyond the union file system 
and add volumes when you create the image. These volumes are initialised when creating 
the containers. You can then access them externally.  
When you create an container from a image. This is how containers comunicate, i.e outside the union file system.

https://docs.docker.com/engine/tutorials/dockervolumes/
Example:
docker run -d -P --name web -v /webapp("Will create this folder inside the folder structure of image.") (training/webapp "image") (python app.py "what to run")

You can check  volume mounts with 
```
docker inspect (container name)
```

```
"Mounts": [
    {
        "Name": "fac362...80535",
        "Source": "/var/lib/docker/volumes/fac362...80535/_data",
        "Destination": "/webapp", << destination inside the container
        "Driver": "local",
        "Mode": "",
        "RW": true, <<read write
        "Propagation": ""
    }
]
```

You can mount volumes outside the union file system with: 
```
docker run -d -P --name web -v /src/webapp(host):/webapp(container) training/webapp python app.py
```

If volume already exists then it will take dominance but not remove old files and be available after
exposing.
Rules
1. Container path must always be absolute.
2. Host must always be absolute OR name value

name value >> just name "must start with character" (strange.)

##HTTPS 
We need a unique domain name for this to work. So the SSL company knows the correct IP.
We want to include this via a proxy server
To see open ports: sudo netstat -lptu

#Bash and vim.
ctrl Z to stop process and fg to bring it back.
y>> yank vim 
tabedit 
gt>> change tab
gT>> The other way.
dd >> to delete line 
:set number << line number
:set list << shows tab as $ character.
## Deployment
##Basic docker.


##What to run

1.Build image:docker build . --tag mortonprod/web
2.Run create container: docker run -p 3000:8080 --name web_instance -d mortonprod/web 
3.Access:http://192.168.99.100:3000/
4.Push to docker:docker push mortonprod/web
5.Access your website host: ssh -i ~/.ssh/digitalOcean_rsa  root@178.62.101.238
6.Check eth0 inet address:178.62.101.238 
7.Link DNS(namecheap) to this IP address and thee port open by docker:http://178.62.101.238:49160
8.While on DNS check advanced DNS to configure record:
	* Add google console to check if website can be found: google-site-verification=4-aSn2QAbz0ELl9GufO0KT4_6GvjIquvP6cijD0emvk  
8.Run on server:docker run -p 49160:8080 --name web_instance -d mortonprod/web  

##SEO
Remember this is only important if you want free advertising. 
If you don't care about people knowing or you just want to pay then move on. 
You want to get them there and keep them(bounce rate for single visit with no more searching)
55% chrome and 25% internet explorer market share? What do they view on.
1.https://ubersuggest.io/ this will generate words used for people searching for information about your field.
2.https://www.google.com/trends/ this will generate related topics and queries related to your topic. 
	* You want to make content of website, i.e every word, related to these terms.  
3. Adwords(Can you use the tools?) + analytics for website.
4. http://openlinkprofiler.org/ <<< back link checker.
5. webmaster to check the basics
###Strategy for higher ranking

1. Find out about related terms and use them in the content.
2. Make the website better than other people who have done the same.
	* Up to date
	* Better design
	* Faster loading times.
	* Length

##Server setup

Dont run as root:
adduser alex
now make alex a superuser i.e can do root with sudo.
usermod -aG sudo alex << give me super user status.
su - username << to switch to this.  
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04


##Old stuff
docker build ./db --tag mortonprod/mongodb

Run the node app with 8080 exposed to 3000 host.
docker run -p 3000:8080 --name web_instance -d mortonprod/web 

Run to reducer size.
docker run -p 27017:27017 --name mongo_instance_001 -d mortonprod/mongodb --smallfiles

docker run -it mortonprod/web /bin/bash
## Built With

* [React](https://facebook.github.io/react/) - The frontend framework
* [LetsEncrypt](https://thisendout.com/2016/04/21/letsencrypt-certificate-generation-with-docker/)
* [DigitalOcean and https](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04)
* [Check words SEO](https://ubersuggest.io/)
https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts
## Authors

* **Alexander Morton**  [github home](https://github.com/mortonprod/CleaningWebsite)

## License

No licence but let me know how your using it for my own interest


##Todo:
1. Https 
2. Http2 and node js 
3. Service workers 
4. PRPL
5. Get laptop charger. 	
6. Begin to work through docker security issues.
7. How to setup ads for website.
8. SEO tools

##Stupid :-)
Need absolute path for all docker volumes.
cheapname site sometime just does not do stuff! Just sign in again.
Don't dns redirect just use "A record" for dns name ot IP.
Dont be in detached mode to run in interactive:works>>docker run -it  -p 443:80 --name nginx nginx /bin/bash 

##Terminology
domain >> Just the name
A top-level domain, or TLD .net .com etc... <<< DNS works in a hierarchy to ubuntu.com is sub domain of com.
hosts: www.examples.com or api.examples.com.  example.com is the bare domain. Host defines resource.
txt is text record attached to dns resolved

TXT old:v=spf1 include:spf.efwd.registrar-servers.com ~all



https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt


This is it!!!!http://www.automationlogic.com/using-lets-encrypt-and-docker-for-automatic-ssl/ 