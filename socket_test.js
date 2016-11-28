var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
net.createServer(function(sock) {
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data', function(data) {
        var rdt = data;
        var srdt = rdt.toString();
        var ordt = JSON.parse(srdt);
        console.log('DATA ' + sock.remoteAddress + ': 'ordt);
      //  sock.write('You said "' + data + '"');
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT);

console.log('Server listening on ' + HOST +':'+ PORT);
