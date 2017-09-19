module.exports = function (context, req) {
    context.log('devices Triggered');

    // Return all the devices that we have
    let result = [];

    for (let i = 1; i <= 10; i++)
         result.push({id:i, name:'Device ' + i, approved: (Math.random() >= 0.5)});

    // result = JSON.stringify(result);

    // TO ENABLE ACCESS CONTROL HEADERS, remove all CORS entries, add 
    // headers as shown below, and turn off proxies

    context.res = {
        headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
        },
        body: result
    };
    
    context.done();

};