# Work Orders Demo App
This project is a lightweight demonstration of the WorkOrders and Tasks API and a potential implemention via a React web based UI.

## Prerequisites
In order to use this application, you will require [nodejs v16](https://nodejs.org/en/). It is also reccomended that you use a IDE such as Visual Studio Code, although this is not required.

## Getting started
Once cloned, this project can be started by running the commands ```npm install``` followed by ```npm start```. 
Once the project has started, the web UI should become avaliable via localhost (the exact address should be displayed in the terminal) and you will be able to browse to it (using a web browser such as chrome).

### Enabling authentication
Before proceeding, please note that by enabling authentication you will require:

- A Trimble user account
- A Connected Project ID (details below)

----

If you wish to use real API calls within this project, you must first authenticate yourself. To do so, browse to the file ```src/config.js``` within the cloned repository, and open it with a text editior.

Within this file, you will see the following:

```    
useAuth: false,
````
To enable authentication, simply change this to:
```    
useAuth: true,
````
and save the file. 

You will then be promped to sign in with your Trimble ID (A refresh of the web UI may be required).

### Connected Project ID
If you have enabled authentication, you will also require a Connected Project ID. 
A Connected Project ID is the ID of a Trimble Connect project, that has been synchronised to WorksManager using the jobsite extension. The project ID may be attained via the URL, for example:

If I take the following Connected Project:
```
https://web.connect.trimble.com/projects/LHA-9S10REc/
```
The ID would be:
```
LHA-9S10REc
```

You will then have to write this ID into the file ```src/config.js```, such as 
```    
 projectId:'LHA-9S10REc',
````
A refresh of the web UI may be required following this.

### Creating a new Task / Workorder
Once a project id has been provided, you will be able to create basic a basic work order / task using the built in forms. These are basic implementations and do not allow for all of the optional parameters to be provided.

### Mocked data

If you do not wish to enable authentication, you will be served mock data.
In this project, mocked data refers to real copies payload data that were taken on the 14.09.22.

This will allow you to see potential UI integrations without having access to live API data.

Note: As this data is static, it may be not accuratley reflect the data provided by the current API's.

### Viewing implementations of API requests

If you wish to see how the API requests were implemented in this project, please see either 

```
src/app/tasks/services/services.js
```
or
```
src/app/workorders/services/services.js.
```

