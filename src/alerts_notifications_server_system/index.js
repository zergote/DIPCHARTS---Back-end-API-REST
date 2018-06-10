import { Model } from 'objection'
import { Alerts, AlertsAndUsers } from '../domain/model/alerts'
import { knexPg } from '../../config'
import acho from 'acho'

//Configuración de salidas por consola
const log = acho()

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 4000
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

async function getAlertsByRegion(IDRegion) {
  try {
    Model.knex(knexPg)
    let result = await Alerts.query()
      .select('*')
      .where('id_region', IDRegion)
    return result
  } catch (e) {
    console.log(e)
  }
}

async function getUntilLatestAlertsByUsers(idUser) {
  try {
    Model.knex(knexPg)
    let result = await AlertsAndUsers.query()
      .select('*')
      .where('id_user', idUser)
      .andWhere('read_state', false)
      .limit(15)
      .offset(30)
    return result
  } catch (e) {
    console.log(e)
  }
}

async function getLatestAlertsByRegion(IDRegion) {
  try {
    Model.knex(knexPg)
    let result = await Alerts.query()
      .select('*')
      .where('id_region', IDRegion)
      .orderBy('start_date', 'desc')
      .limit(15)
      .offset(30)
    return result
  } catch (e) {
    console.log(e)
  }
}

async function getAlertsCountsNoReadByUser(idUser) {
  try {
    Model.knex(knexPg)
    let result = await AlertsAndUsers.query()
      .count('*')
      .where('id_user', idUser)
      .andWhere('read_state', false)
    return result
  } catch (e) {
    console.log(e)
  }
}

async function markAlertsHowToRead(idUser) {
  try {
    Model.knex(knexPg)
    let result = await AlertsAndUsers.query()
      .update({ read_state: true })
      .where('id_user', idUser)
    return result
  } catch (e) {
    console.log(e)
  }
}

io.on('connection', function(socket) {
  socket.on('request update count', async function(userID) {
    // console.log(userID);
    let count = await getAlertsCountsNoReadByUser(userID)
    socket.emit('update count', count[0].count)
  })

  socket.on('request update alerts toolbar', async function(IDRegion) {
    let alerts = await getLatestAlertsByRegion(IDRegion)
    socket.emit('update alerts toolbar', alerts)
  })

  socket.on('request update alerts dashboard', async function(IDRegion) {
    let alerts = await getAlertsByRegion(IDRegion)
    socket.emit('update alerts dashboard', alerts)
  })

  socket.on('mark alerts read', async function(userID) {
    await markAlertsHowToRead(userID.toString())
  })
})

http.listen(port, function() {
  log.info('Servidor de notificaciones escuchando a través del puerto *:' + port)
})
