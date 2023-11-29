const {Lambda} = require('aws-sdk')

const lambda = new Lambda()

async function invokeAsync(functionName, payload) {
    const params = {
        FunctionName: functionName,
        InvocationType: 'Event',
        Payload: JSON.stringify(payload),
    }
    return lambda.invoke(params).promise()
}

module.exports = {
    invokeAsync,
}