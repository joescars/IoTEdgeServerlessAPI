module.exports = function (context, req) {
    context.log('Approve Device Triggered');

    // Approve Device
    if (req.body) {
        let device = req.body;
        
        //TODO: Update Record in DB
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Device Updated"
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