
const express = require('express')
const metM = require('./met.js')

const app = express()

const port = process.env.PORT || 3000

app.get('/', function(req, res) {
  res.send({
    greeting: 'Esta es la main view funcionando correctamente'
  })
})


app.get('/students/:id', function(req, res) {
  if ( req.params.id != 'A01422229') {
    return res.send({
      error: 'Debes enviar una matrícula válida a consultar (A01422229)'
    })
  }
  res.send({
    id: req.params.id ,
    fullname: 'Erick Alberto Rodriguez Nandi',
    nickname: 'Erick',
    age: '23'
  })
})

app.get('/met', function(req, res) {
  if ( !req.query.search) {
    return res.send({
      error: 'Debes enviar algo para buscar /met?search=OBJETO_A_BUSCAR'
    })
  }
  metM.metMuseum( req.query.search, function(error, response) {
    if ( error ) {
      return res.send({
        error: 'Se ha presentado un error intentado obtener los datos ' + error
      })
    }
    //console.log(response)
    var obj = response.obj
    metM.metObjects(obj, function(error, response){
      if ( error ) {
        return res.send({
          error: 'Se ha presentado un error al obtener la búsqueda ' +error
        })
      }
      res.send({ 
        searchTerm: req.query.search,
        artist : response.artist,
        title: response.title,
        year: response.year,
        technique: response.technique,
        metUrl: response.metUrl
      })
    })
  })
})


app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida',
    Message: 'Esta ruta no existe en este entorno de trabajo',
    Disclaimer: 'Este mensaje fue considerado adecuado ',
  })
})


app.listen(port, function() {
  console.log('Puerto funcionando correctamente')
})
