(function() {

    var argv = process.argv;
    var express = require('express');
    var http = require('http');
    var app = express();
    var xmpp = require('node-xmpp');
    var ltx = require('ltx');
    var clientName = argv[2];
    var password   = argv[3];
    var host       = argv[4];
    var port       = argv[5];

    var client = new xmpp.Client({
        jid: clientName,
        password: password,
        host: host,
        port: port
    });

    var sendMessage = function(message, to, res) {
        var element, xml;
        console.log('sending message', message, to);
        element = new xmpp.Element('message', {'to': to, 'type': 'chat'});
        xml = element.c('body').t(message);
        client.send(xml);
        res.status(200).json({
            'message': 'Message sent'
        });
        console.log('Done');
    }

    client.on('online', function() {
        console.log('client online');
        var response = client.send(new xmpp.Element('presence'));
        console.log('client got response from server', response);
    });

    client.on('error', function(e) {
        console.log(e);
     });

    client.on('stanza', function(stanza) {
        console.log(stanza.toString());
    });

    app.get('/', function(req, res) {
        console.log('client is now sending presence element');
        client.send(new xmpp.Element('presence'));
        res.status(200).json({ 'message': 'Connected !'});
    });

    app.get('/message', function(req, res) {
        to      = req.param('to', null);
        message = req.param('message', null);
        console.log(to, message);
        sendMessage(message, to, res);
    });

    console.log("Listening on port " + port);

    app.listen(3000);

}).call(this);
