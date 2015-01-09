(function() {
    var app, client, express, port, xmpp;

    express = require('express');
    http    = require('http');
    app     = express();
    xmpp    = require('node-xmpp');
    
    var c2s = new xmpp.C2SServer({
        port: 5222,
        domain: 'localhost'
    });
    
    c2s.on('connect', function(client) {

        client.on('register', function(opts, cb) {
            console.log('registered on server', opts, cb);
        });

        client.on('authenticate', function(opts, cb) {
            console.log('authenticated on server');
            //I don't know what it does yet but w/e
            cb(null, opts);
        });

        client.on('online', function() {
            console.log('online on server');
        });

        client.on('stanza', function(stanza) {
            console.log('stanza on server', stanza);
        });

        client.on('disconnect', function() {
            console.log('disconnected from server');
        });

        client.on('presence', function(el) {
            console.log('server received presence', el);
        });
    });



}).call(this);
