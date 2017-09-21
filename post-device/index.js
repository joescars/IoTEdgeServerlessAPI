var MongoClient = require('mongodb').MongoClient;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {

    context.log('Add Device Triggered');

    // Add Device
    if (req.body) {
        let device = req.body;

        device.id = guid();
        device.approved = "false";

        // TODO: data validation
        MongoClient.connect(url, function(err, db) {
            db.collection('devices').insertOne(device, function(err, result) {
                db.close();
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: "Device Added With Id: " + device.id
                };
                context.done();
            });
        });

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a device in."
        };
        context.done();
    }
    
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}   