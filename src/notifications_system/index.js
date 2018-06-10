var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

let count = 0
let alerts = [
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 0,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 1,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 2,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 3,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 0,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 0,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 1,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 2,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 3,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 0,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
]

io.on('connection', function(socket) {
  socket.on('request update count', function(userID) {
    // console.log(userID);
    socket.emit('update count', ++count)
    console.log(count)
    //io.emit("chat message", msg);
  })

  socket.on('request update alerts toolbar', function(userID) {
    // console.log(userID);
    socket.emit('update alerts', alerts)
    //Solo se envian las alertas
  })

  socket.on('request update alerts dashboard', function(userID) {
    // console.log(userID);
    socket.emit('update alerts', alerts)
    //Se emiten las alertas
  })

  socket.on('mark alerts read', function(userID) {
    console.log(userID)
    count = 0
  })

  // setInterval(function() {
  // 	io.emit("update count", ++count);
  // }, 3000);

  // setInterval(function() {
  // 	io.emit("update alerts", alerts);
  // }, 6000);

  // setInterval(function() {
  // 	io.emit("update alerts", alerts2);
  // }, 10000);
})

http.listen(port, function() {
  console.log('listening on *:' + port)
})
