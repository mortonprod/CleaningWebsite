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


## Deployment

The website has been deployed with docker

## Built With

* [React](https://facebook.github.io/react/) - The frontend framework


## Authors

* **Alexander Morton**  [github home](https://github.com/mortonprod/CleaningWebsite)

## License

No licence but let me know how your using it for my own interest

	