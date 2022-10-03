# Getting Started with Workorder Demo App

This project is a basic and lightweight application, designed to showcase potential usage of the Work Orders and Tasks API. 
For examples of API request implementions, see either  src/app/tasks/services/services.js or src/app/workorders/services/services.js.

To see implementations of the payload responses in a UI, see either src/app/tasks/tasks.js or src/app/workorders/workorders.js.

## Getting started

This project can be initiated by running the command **npm install** followed by **npm start**.

## Mocked data

By default, this application will return mocked data (Mocked data refers to a static copy of a real payload, taken on the 14.09.22).
As this data is static, it may be not accurately reflect the data provided by the current API's.

## Logging in

By switching the **useAuth** flag to true within config.js, you may enable authentication. We have provided a basic authentication configuration in this UI, that 
will allow you to logon using your Trimble ID.

Note: **You must provide a project id** (see below) within config.js.

## Providing a project ID

Within config.js, you may provide a connected project id.
A connected project ID is the ID of a Trimble Connect project, that has been synchronised to WorksManager using the jobsite extension. This extension may be found under the settings tab.

## Creating a new Task / Workorder

Once a project id has been provided, you will be able to create basic a basic work order / task using the built in forms. These are basic implementations and do not allow for all of the optional parameters to be provided.
