module.exports = function (context, req) {
    context.log('Add Device Triggered');

    // Add Device
    if (req.body) {
        let device = req.body;
        
        //TODO: Write device to DB

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