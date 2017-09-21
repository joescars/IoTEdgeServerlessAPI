var MongoClient = require('mongodb').MongoClient;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {
    context.log('Get Device Triggered');

    // Return single device by ID
    if (req.query.id) {
        MongoClient.connect(url, function (err, db) {
            db.collection('devices').findOne({id:req.query.id}, function (err, device) {
                context.res = {
                    status: 200,
                    body: {id:device.id,name:device.name,approved:device.approved},
                    headers: { 'Access-Control-Allow-Origin': '*' }
                };
                context.done();
                db.close();
            });
    
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an id in query"
        };
        context.done();
    }    
};