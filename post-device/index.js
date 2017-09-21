var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {

    context.log('Add Device Triggered');

    // Add Device
    if (req.body) {
        let device = req.body;
        
        // TODO: look into changing api so we can use binding
        // context.bindings.out = device;

        // write object to cosmosdb using mongo api
        // TODO: data validation
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertDocument(db, device, function() {
                db.close();
                });
            });


        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Device Added"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a device in."
        };
    }
    context.done();

};

var insertDocument = function(db, device, callback) {
    db.collection('devices').insertOne(device, function(err, result) {
        assert.equal(err, null);
        //context.log("Inserted a document into the families collection.");
        callback();
    });
    };