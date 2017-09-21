var MongoClient = require('mongodb').MongoClient;
var url = process.env.MyAccount_COSMOSDB;

module.exports = function (context, req) {
    context.log('Approve Device Triggered');

    // Approve Device
    if (req.body) {
        let device = req.body;
        MongoClient.connect(url, function (err, db) {
            var myquery = { id : device.id};
            var newvalues = { id : device.id, name: device.name, approved: device.approved };
            context.log(myquery);
            context.log(newvalues);
            db.collection("devices").updateOne(myquery, newvalues, function(err, res) {
                db.close();
                if(err) {
                    context.res = {
                        status: 400,
                        body: "Error " + err,
                        headers: { 'Access-Control-Allow-Origin': '*' }
                    };                           
                } else {
                    //context.log(res);
                    context.res = {
                        status: 200,
                        body: "Device Updated",
                        headers: { 'Access-Control-Allow-Origin': '*' }
                    };                        
                }
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