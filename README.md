# Backend application (API REST and Services)

It is made up of a set of processes that manage customer communication operations through the REST API and communication through WebSockets to offer services to users of KPI queries and system alerts.

## Main view
![Running Services](https://github.com/zergote/DIPCHARTS-Back-end-API-REST/blob/master/screen%20captures/Servidor%20Consolas.png "Running Services")

## Details
This system is composed of four (4) services:
- 1st. Statistics and REST API query service
- 2nd. WebSockets Alarm and Communication Service.
- 3rd. Detector of erroneous patterns of the network.
- 4th. Creator of time-consuming SQL query statistics summaries.

## Requirements
- Installation of dependencies
- Configure the database credentials in the knexfile.js file
- Generate the knex.js database using the command knex migrate:latest
- Fill the database with the mobile network structure information using the $yarn fill-db

## How to Use
```
# Clone this repository
$ git clone https://github.com/zergote/DIPCHARTS-Back-end-API-REST

# Go into the repository
$ cd DIPCHARTS-Back-end-API-REST

# Install dependencies
$ yarn install

# Run the app
$ yarn start
$ yarn tasks-dashboard-data
$ yarn tasks-anormal-patterns
$ yarn alerts-notifications-server
```
