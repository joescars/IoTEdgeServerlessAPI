var MongoClient = require('mongodb').MongoClient;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {

    var myQuery = {};

    // filter: approve
    if (req.query.approved) {
        myQuery = (req.query.approved == 'true') ? ({ approved: "true"}) : ({ approved: "false"});
    }

    // connect and get the data
    MongoClient.connect(url, function (err, db) {
        db.collection('devices').find(myQuery).toArray(function (err, devices) {
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