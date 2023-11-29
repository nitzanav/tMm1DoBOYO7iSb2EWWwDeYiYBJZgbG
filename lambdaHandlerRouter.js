module.exports.handler = async (event) => {
    // TODO: Need to validate input schema via something like https://www.npmjs.com/package/openapi-request-validator
    try {
        const controllerFilename = getControllerFilename(event)
        const controller = require(`./${controllerFilename}`)
        return controller(event)
    } catch (error) {
        // TODO implement logger
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Internal Server Error'}),
        }
    }
}

function getControllerFilename(event) {
    // TODO: need to invest more in edge cases of this router.
    const route = (event.httpMethod + event.path).toLowerCase()
    const ROUTES = {
        'post/orders': 'postOrdersLambdaHandler.js',
    }
    return ROUTES[route]
}

