module.exports = function (context, req) {
    context.log('Get Device Triggered');

    // Return single device by ID
    if (req.query.id) {

        let device = {
            id: req.query.id,
            name: "Device " + req.query.id,
            approved: true
        };

        context.res = {
            status: 200,
            body: device
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an id in query"
        };
    }
    context.done();

};