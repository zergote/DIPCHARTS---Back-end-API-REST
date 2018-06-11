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
## License
Copyright (c) 2018 Christian Yánez García

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
