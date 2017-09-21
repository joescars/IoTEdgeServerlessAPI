var MongoClient = require('mongodb').MongoClient;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {
    MongoClient.connect(url, function (err, db) {
        db.collection('devices').find().toArray(function (err, devices) {
            db.close();
            context.res = {
                status: 200,
                body: devices.map(d => ({ id: d.id, name: d.name, approved: d.approved })),
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
            context.done();
        });

    });
};