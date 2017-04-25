#A cleaning business

A progressive web app for a cleaning business. The website has isomorphic react front end, with node backend,
 and deployed using docker. 
The app is deployed along side other apps;Nginx keeps future deployment scalable by acting as a proxy server 
for multiple domains and other various requests. 

Docker is used to setup nginx server and then routes to all other apps through there domain names. 
All traffic will be through HTTPS so through port 443 and through 80 for HTTPS verifications. 

##Setup

### Nginx server

After we start the new website we want to keep the nginx server running at all times. Otherwise we will not be
able to access the applications proxied to.  

This will proxy for HTTPS tests and multiple domain names.
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
  listen 443 ssl http2;
 
  ssl_certificate certs/live/my.example.org/fullchain.pem;
  ssl_certificate_key certs/live/my.example.org/privkey.pem;
 
  server_name my.example.org;
 
  location / {
    proxy_pass http://my.example.org;
  }
}
``` 
 

### SSL 

#### Local development 

We want a simple installation of the ssl certificate without the need to an authorative certificate autority. 
OpenSSL is used to implement the SSL/TLS protocols. To simplify the process further, century link docker file was
used to produce ssl certificate, key and CSR. You must execute run.sh this and give host/domain 
name as COMMON_NAME. You must specify the directory to store the the ssl information. This information is then used by the 
app to create the ssl certificate.

#### Production  



### The Mongo Database 

The app must be attached to a running database. CRUD operations are exposed to node container.
The database is mounted as volume which makes the data persistant.

The app is hydrated from the database and the components initialised with parameters set to null.

### The app

All app code is in src folder. This is split into three parts 
1. Client: The react components which are rendered on server and client.
	- React components are based on stateless presentation(components folder) and stateful containers(containers folder)
	- Containers may be needed in client bundles or server side rendering.
	- State is a single redux store created from defining actions and reducers.
	- Store is needed for client bundle and server side rendering.
	- The initial store must come from the database and any change must update it.
2. Bundle: The javascript which will be sent to the browser
3. Server: The server side code. 
	- Pug used as template engine

Passport is used as authentication.  



##Building the app














docker run -d -p 27017:27017 --name mongodb_instance   mortonprod/mongodb  

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


## Tests

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

Use automatic site given below for on server and for local development:https://hub.docker.com/r/centurylink/openssl/
docker run --rm -e COMMON_NAME=localName -e KEY_NAME=localKey -v ~/ssl/:/certs centurylink/openssl
Need to run:docker run --rm -e COMMON_NAME=localName -e KEY_NAME=localKey -v /c/Users/alexander/Documents/"Visual Studio 2015"/Projects/Projects_CleanDir/clean/ssl/:/certs centurylink/openssl
Note local path does not work. Could be due to space in "visual studios 2015"

##http2
Features:
Each request/response has unique id(stream id) and split into frames pass via single TCP connection.  
	* multiplexing: Multiple asynchronous requests over single TCP connection.
	* Server push: Multiple multiple responses per single request.
2. Request priority
3. Compress header(content compression?)
4. Binary protocol?

Difference with preload:
*Preload works the same as push but you must get the html page and parse each preload and setup http2 requests. 
See server push:https://www.w3.org/TR/preload/#server-push-http-2
 
What you need to know:http://qnimate.com/what-is-multiplexing-in-http2/
It's all about streams. In http you have to make one request over TCP connection at a time. Http2 uses streams to identify multiple downloads at a single time.


  

To use http2 with express and not having to work with spdy(old google version, not really support now).
Preload will specifiy to create a stream with server over the specified url. 
This must always be a static asset. Since it must be specied on page. 

Streams:https://www.sitepoint.com/basics-node-js-streams/

##Service workers
These act as middle man between browser server and some cache.
https://24ways.org/2016/http2-server-push-and-service-workers/

You want webpack to create a service worker(service.worker.js) file in dist for you which will 
1. link to all your bundles by url. 
2. Add code to check cache or request etc... 

##Building it.

Src is composed of 4 parts:
1.bundle
2.client
3.server
4.dev server
	*Follow:https://webpack.github.io/docs/webpack-dev-server.html node js Hot module replacement example.
###Process
There are a lot of parts here but the process of building goes like this:
1. Push styles and javascript you want right away
	* Do this is express route
2. Create html using some template engine.
	* Must contain pure html so we don't have to wait for react to script.
	* Must contain script tag to all stream(push) urls.
	* Must contain JSON format of full state of app; this needs to be passed somehow. This will initialise reducer on browser.
3.Continue to load content 
	* Precache via web worker(NO request)
	* Using webpack to get resources if you interact with something and hit code split point.
###design
	http://blog.scottlogic.com/2016/02/05/a-lazy-isomorphic-react-experiment.html

##React server side rendering + lazy loading + redux.
For smooth user experience you want to deal with change DOM elements via routing to be done on browser. 
However, the initial page loaded from the server should be rendered there. Otherwise you are waiting for 
react to finish scripting for initial first paint. Furthermore, the initial page load can be any page on your route, 
since SEO crawlers or even visitors via a particular url can request that page from the server.

The store should never effect routing. If you need information then pass empty(dummy first view) first store and then 
sync asynchronously on the client via ajax js. The empty store will initialise the provider on the server.
This will be rendered on the server with the dummy store as html. The dummy store is also be passed to client so the
the store on the client can be create(Note you need to do this twice since the store rendered on client is inside the html not in some json format).   

##Client structure

Redux client store and db app store are defined in a single location in index.d.ts
Folder structure bottom to top:

1. Presentation component(Just props filled from stateful component)
2. Stateful component(props are redux store(connected))
	* At this stage you define the global store(reducer) entry of this component which will be combined with all others
		* Note reducer defined by component is in the same directory and should only be connected to that component via "connect". 
		* Note the actions defined by component is in the same directory and should only be used by that component via "connnect" 
		* Note by keeping the this convention then we can add and remove reducer as needed.
		* Note by keeping to this convention then you can easily upgrade a reducer/action to connect to multiple components
3. Define state/actions which effects multiple components which should be connected for all components.
	* Example being username/email which could be used everywhere.
	* Connect actions to components.
	* Connect state(reducer) to components
4.  Export 
	* Each component connected to actions and reducer or forming a router
	* RootReducer = globalReducer + comp0Reducer + comp1Reducer2+ ...
5. 
	 



Therefore you must perform routing on the server and client.


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
Note you only copy files into an image if you really need it. In most cases you can just link after you have
started process. 

So an image should be an configurable as possible. So you run your app in enviroment defined by node_modules
To get IP address:docker-machine ip default
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
Preload works the same as push but you must get the html page and parse each preload and setup http2 requests. 
If react components props optional then you will get error when you attach redux store/actions

##Terminology
domain >> Just the name
A top-level domain, or TLD .net .com etc... <<< DNS works in a hierarchy to ubuntu.com is sub domain of com.
hosts: www.examples.com or api.examples.com.  example.com is the bare domain. Host defines resource.
txt is text record attached to dns resolved
Sprite file: All images as one passed to client. Used with http since request response is so long.  No longer an issue with http2.

TXT old:v=spf1 include:spf.efwd.registrar-servers.com ~all


#issues
1. How to run server side rendering for react component with css included?
2. How to remove web dev server from production build? Can remove usage but not import.
3. How to lazy load? Need bundle loader which load syncronously in server but async on client:http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/ 
https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
	*Not such a big issue just push all resources for now. 
Need mongoose in interface to use typings???!!! Move but still have error.
You need to make children optional with react... Why???? Will this even pick up children on the other side since if child component then still error of no placed as html tag.


sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt


This is it!!!!http://www.automationlogic.com/using-lets-encrypt-and-docker-for-automatic-ssl/ 

Hey All,

I have read about the web development server and hot module replacement. I even got it working on another project but currently I can't access the public files served by the dev server. 

Here is the web development server being setup. Note public path /bundle.

    'use strict';
    let config = require("../webpack.config.js");
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    config.entry.index.unshift("webpack-dev-server/client?http://localhost:8080/");
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        hot: true,
        inline: true,
        contentBase: "./serverDev",
        publicPath:"/bundle/"
    });
    server.listen(8080);


This is the index file rendered 

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <div id="react-router"></div>
        <script src="/bundle/vendor.bundle.js"></script>
        <script src="/bundle/index.js"></script>
    </body>
    </html>

This is the webpack config with path set to public path of webpack server. 

    'use strict';
    var webpack = require('webpack');
    const autoprefixer = require('autoprefixer');
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    var CompressionPlugin = require('compression-webpack-plugin');
    const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
    let getPlugins;
    var isProd = (process.env.NODE_ENV === 'production');
    console.log("Production: " + isProd);
    
    let entryFill = {
        index: ['./src/bundle/index.tsx'],
    //    login: ['./src/bundle/login.tsx'],
    //    signup: ['./src/bundle/signup.tsx'],
        vendor: ['react', 'bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/js/bootstrap.js', 'react-dom', 'jquery', 'jquery-ui-bundle', "redux-thunk", 'redux', 'react-redux']
    }
    if (isProd) {
        var publicPathFill = "./dist/assets/bundle";
        getPlugins = function () {
            return [
                new SWPrecacheWebpackPlugin(
                    {
                        cacheId: 'cleaning-website',
                        filename: 'service-worker.js',
                        maximumFileSizeToCacheInBytes: 4194304,
                        runtimeCaching: [{
                            handler: 'cacheFirst',
                            urlPattern: /[.]js$/
                        }],
                    }
                ),
                new ExtractTextPlugin("site.css"),
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
                new webpack.optimize.AggressiveMergingPlugin(),
                new webpack.ProvidePlugin({
                    jQuery: 'jquery',
                    $: 'jquery',
                    jquery: 'jquery'
                })
                //new CompressionPlugin({
                //    asset: "[path].gz[query]",
                //    algorithm: "gzip",
                //    test: /\.js$|\.css$|\.tsx$/,
                //    threshold: 10240,
                //    minRatio: 0.8
                //})
            ]
        }
    } else {
        var publicPathFill = "/bundle/";
        getPlugins = function () {
            return [
                new ExtractTextPlugin("site.css"),
                //new Webpack.HotModuleReplacementPlugin()
            ]
        }
    
    }
    
    module.exports = {
        /**
         * Entry for all client side code.
         * @var {object} entry
         */
        entry: entryFill,
        plugins: getPlugins(),
    
        output: {
            path: publicPathFill,
            filename: '[name].js',
            libraryTarget: 'umd'
            //publicPath: publicPathFill
        },
        resolve: {
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
            //alias: {
            //    'react': 'preact-compat',
            //    'react-dom': 'preact-compat',
            //    'react-router': 'preact-compat'
            //}
    
        },
        module: {
            loaders: [
                //  { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true'},
                { test: /\.css$/, loader: "style-loader!css-loader" },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(
                        //Need:?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5] to set the right name for each css!
                        "style",
                        "css!postcss-loader!sass")
                },
                //  { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
                { test: /\.tsx?$/, loader: "ts-loader" },
                {
                    test: /\.(pug|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    loader: 'file-loader'
                }
            ]
        },
        postcss: function () {
            return [autoprefixer(
                //    { browsers: ['ie 10', 'firefox 20', 'safari 9.1','Chrome ] }
                { browsers: ['> 0%'] }
            )];
        }
    };


P.S: Should I be able to go to localhost:8080/bundle and see the bundle webpack has produced and served by webpack-dev-server?


P.S.S:Note I know I have not set the public path but this does not seem to matter in my working example.


////Streams

    router.get('/streamFile', function (req: any, res: any) {
        ///Push 
        var isSSL = (req.socket.encrypted ? true : false);
        if (isSSL) {
            var index_stream = res.push('/index.js', {
                status: 200, // optional
                method: 'GET', // optional
                request: {
                    accept: '*/*'
                },
                response: {
                    'content-type': 'application/javascript'
                }
            })
            var vendor_stream = res.push('/vendor.js', {
                status: 200, // optional
                method: 'GET', // optional
                request: {
                    accept: '*/*'
                },
                response: {
                    'content-type': 'application/javascript'
                }
            })
            let index_file = fs.createReadStream('./dist/assets/bundle/index.js');
            let vendor_file = fs.createReadStream('./dist/assets/bundle/vendor.bundle.js');
            vendor_file.pipe(vendor_stream);
            index_file.pipe(index_stream);

            //stream.end('alert("hello from push stream!")');
            //console.log("Encrypted!!!!!!!!!!!")
        }
        res.writeHead(200);
        res.end('<div id="react-contact"></div> <script src="/vendor.js"></script> <script src="/index.js"></script>');
    });
    router.get('/stream', function (req: any, res: any) {
        ///Push 
        var isSSL = (req.socket.encrypted ? true : false);
        if (isSSL) {
            var stream = res.push('/test.js', {
                status: 200, // optional
                method: 'GET', // optional
                request: {
                    accept: '*/*'
                },
                response: {
                    'content-type': 'application/javascript'
                }
            })
            stream.end('alert("hello from push stream!")');
            //console.log("Encrypted!!!!!!!!!!!")
        }
        res.writeHead(200);
        res.end('<script src="/test.js"></script>');
    });


Upgrade typescript:npm install -g typescript@2.0. 

http {
        server {
                listen 443;
                server_name test.com;
                location / {
                        proxy_pass http://app;
                        proxy_set_header Host            $host;
                        proxy_set_header X-Forwarded-For $remote_addr;
                }
        }
}