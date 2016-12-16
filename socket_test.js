var net = require('net');
var PORT = 6969;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(sock) {

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);
        sock.write("success");
    sock.on('data', function(data) {
		var rdt = data;
    var srdt = rdt.toString();
    console.log(srdt);
     var ordt = JSON.parse(srdt);
     console.log("type:"+ordt.type);
     console.log("MT:"+ordt.MT+"  MW:"+ordt.MW+"   OT:"+ordt.OT+"   OW:"+ordt.OW+"   LT:"+ordt.LT+"   from:"+ordt.from);
      // sock.write('You said "' + srdt + '"');
    });
    sock.on('error',function (exc) {
 		console.log("ignoring exception: " + exc);
 	  });
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT);
process.on('uncaughtException', function (err) {
  console.log(err);
  console.log(err.stack);
});
console.log('Server listening on '+':'+ PORT);
