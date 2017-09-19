module.exports = function (context, req) {
    context.log('devices Triggered');

    // Return all the devices that we have
    let result = [];
    for (let i = 1; i <= 10; i++)
    result.push({id:i, name:'Device ' + i, approved: (Math.random() >= 0.5)})

    context.res = {
        status: 200,
        body: result,
        headers: {'Access-Control-Allow-Origin':'*'}
    };
    context.done();

};