const botTest = new RegExp('bot|crawler|spider|crawling|facebook|twitter|slack', 'ig')

function isBot(val) {
    if (!val) {
        return false
    }
    return botTest.test(val)
}

exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    let userAgent = request.headers['user-agent'][0].value
    
    if(isBot(userAgent)) {
        request.headers['x-bot'] = [{ key: 'x-bot', value: 'true' }];
        console.log('set bot header')
    }
    else {
        console.log('did not set bot ')
        request.headers['x-bot'] = [{ key: 'x-bot', value: 'false' }];
    }
    callback(null, request)
};