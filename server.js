
// set up app
var express     = require('express')
,   mongoose    = require('mongoose')
,   helmet      = require('helmet')
,   app         = express() 
,   server      = require('http').createServer(app)
,   communicate = require('./app/utils/communicate')(server)
,   database    = require('./config/database')
,   port        = process.env.PORT || 3000;

// db configuration
mongoose.connect(database.url);

// express config
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use('/video-chat', express.static(__dirname + '/public'));
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // implement various security headers with Helmet middleware
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());
    app.use(helmet.cacheControl());
});

// routes
require('./app/routes')(app);

// start server
server.listen(port), function(){
  console.log("App listening on port " + port);
};
