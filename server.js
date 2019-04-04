const mongo = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


server.listen(4001, function() {
	console.log('Servidor corriendo en http://localhost:4001');
});




// Connect to mongo
mongo.connect('mongodb://127.0.0.1/Karma', function(err, db){
    if(err){
        throw err;
    }
    console.log('MongoDB connected...');
    
    app.get('/get', function(socket) {
        console.log('Un cliente se ha conectado');
        let relays = db.collection('relays');
        // Get chats from mongo collection
        relays.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }
            socket.emit(res);
            socket.emit('changes', res);
            console.log(res)
        });
    });
    /*io.on('connection', function(socket) {
        console.log('Un cliente se ha conectado');
        let relays = db.collection('relays');

        // Get chats from mongo collection

        
        relays.find().limit(100).sort({_id:1})(function(err, res){
            if(err){
                throw err;
            }
            // Emit the messages
            console.log(res)
            socket.emit('changes', res);
        });
    });*/
});