var express = require('express');
var router = express.Router();
var usrDB = require('nodejsforDB/dbConnect');
var bodyParser = require('body-parser');
var net = require('net');
var PORT = 6969;
router.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
router.use(bodyParser.urlencoded({  extended: true}))
/* GET index page. */
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
     client = usrDB.connect();
     usrDB.insertdataFun(client,ordt.from,ordt.MT,ordt.MW,ordt.OT,ordt.OW,ordt.LT,"0","0",function(err, results){
    				 if (err) {
                  //  res.locals.error = err;

                            console.log(err);
                        } else {

                            console.log("入库成功");
                        }
                      });
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

  router.get("/creatdatatable",function(req,res){
    client = usrDB.connect();
    usrDB.creatdataTable(client,"3301011aa",function(err,result){
      if(err){ 										//错误就返回给原post处（login.html) 状态码为500的错误
  			res.send(500);
  			console.log(err);
  		}else{ 								//查询不到用户名匹配信息，则用户名不存在
        console.log(result);
      //  req.session.error = '用户名不存在';
      //  res.locals.error = '用户不存在';
  			res.send(200);							//	状态码返回404
  		//	res.redirect("/login");
  		}
    });

    console.log('Server listening on '+':'+ PORT);
  });
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});

module.exports = router;
