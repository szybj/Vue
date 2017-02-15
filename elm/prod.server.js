var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;
var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});
var app = express()

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// 定义路由
var apiRoutes = express.Router();

// 定义商家数据接口,取数据
apiRoutes.get('/seller',function(req,res){
  // 收到请求后，吐给客户端一个json数据
  res.json({
    // 数据请求正常，返回一个标志
    errno: 0,
    data: seller
  });
});
// 食品数据接口
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno: 0,
    data: goods
  });
});
// 评论数据接口
apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno: 0,
    data: ratings
  });
});

// 所有接口相关的路由都会通过api这个路由

app.use('/api',apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
