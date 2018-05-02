const rp = require('request-promise');
const _ = require('lodash');
const nodeUrl = require('url');

function rabbitStats(uri, user, pass) {
    const OPTIONS = {
        uri: uri,
        json: true,
        auth: {
            user: user,
            pass: pass,
            sendImmediately: false
        },
        headers: {
            'content-type': 'application/json'
        }
    };

    function makeRequest(method, path) {
        return function (query, body) {
            const options = _.cloneDeep(OPTIONS);
            options.method = method;
            if (method === 'DELETE') {
                //without this workaround rabbitmq-management-plugin responds with StatusCodeError: 406
                delete options.json;
            }
            options.uri = nodeUrl.resolve(options.uri, '/api/' + path);
            options.qs = query;
            options.body = body;
            return rp(options);
        };
    }

    function getNode(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'nodes/' + name)();
    }

    function getConnection(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'connections/' + name)();
    }

    function deleteConnection(name) {
        name = encodeURIComponent(name);
        return makeRequest('DELETE', 'connections/' + name)();
    }

    function getConnectionChannels(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'connections/' + name + '/channels')();
    }

    function getChannel(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'channels/' + name)();
    }

    function getVhostConsumers(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'consumers/' + vhost)();
    }

    function getVhostExchanges(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'exchanges/' + vhost)();
    }

    function getVhostExchange(vhost, exchangeName) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'exchanges/' + vhost + '/' + exchangeName)();
    }

    function putVhostExchange(vhost, exchangeName, data) {
        vhost = encodeURIComponent(vhost);
        exchangeName = encodeURIComponent(exchangeName);
        return makeRequest('PUT', 'exchanges/' + vhost + '/' + exchangeName)(null, data);
    }

    function deleteVhostExchange(vhost, exchangeName) {
        vhost = encodeURIComponent(vhost);
        exchangeName = encodeURIComponent(exchangeName);
        return makeRequest('DELETE', 'exchanges/' + vhost + '/' + exchangeName)();
    }

    function getVhostQueues(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'queues/' + vhost)();
    }

    function getVhostQueue(vhost, queueName) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return makeRequest('GET', 'queues/' + vhost + '/' + queueName)();
    }

    function putVhostQueue(vhost, queueName, data) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return makeRequest('PUT', 'queues/' + vhost + '/' + queueName)(null, data);
    }

    function deleteVhostQueue(vhost, queueName) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return makeRequest('DELETE', 'queues/' + vhost + '/' + queueName)();
    }

    function deleteVhostQueueContents(vhost, queueName) {
        vhost = encodeURIComponent(vhost);
        queueName = encodeURIComponent(queueName);
        return makeRequest('DELETE', 'queues/' + vhost + '/' + queueName + '/contents')();
    }

    function getVhostBindings(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'bindings/' + vhost)();
    }

    function getVhost(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('GET', 'vhosts/' + vhost)();
    }

    function putVhost(vhost, body) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('PUT', 'vhosts/' + vhost)(null, body);
    }

    function deleteVhost(vhost) {
        vhost = encodeURIComponent(vhost);
        return makeRequest('DELETE', 'vhosts/' + vhost)();
    }

    function getUser(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'users/' + name)();
    }

    function putUser(name, body) {
        name = encodeURIComponent(name);
        return makeRequest('PUT', 'users/' + name)(null, body);
    }

    function deleteUser(name) {
        name = encodeURIComponent(name);
        return makeRequest('DELETE', 'users/' + name)();
    }

    function getUserPermissions(name) {
        name = encodeURIComponent(name);
        return makeRequest('GET', 'users/' + name + '/permissions')();
    }

    function setUserPermissions(user, vhost, body) {
        vhost = encodeURIComponent(vhost);
        user = encodeURIComponent(user);
        return makeRequest('PUT', 'permissions/' + vhost + '/' + user)(null, body);
    }

    function getCurrentUser() {
        return makeRequest('GET', 'whoami')();
    }

    return {
        //Overview
        getOverview: makeRequest('GET', 'overview'),

        //Nodes
        getNodes: makeRequest('GET', 'nodes'),
        getNode: getNode,

        //Extensions
        getExtensions: makeRequest('GET', 'extensions'),

        //Connections
        getConnections: makeRequest('GET', 'connections'),
        getConnection: getConnection,
        deleteConnection: deleteConnection,
        getConnectionChannels: getConnectionChannels,

        //Channels
        getChannels: makeRequest('GET', 'channels'),
        getChannel: getChannel,

        //Consumers
        getConsumers: makeRequest('GET', 'consumers'),
        getVhostConsumers: getVhostConsumers,

        //Exchanges
        getExchanges: makeRequest('GET', 'exchanges'),
        getVhostExchanges: getVhostExchanges,
        getVhostExchange: getVhostExchange,
        putVhostExchange: putVhostExchange,
        deleteVhostExchange: deleteVhostExchange,

        //Queues
        getQueues: makeRequest('GET', 'queues'),
        getVhostQueues: getVhostQueues,
        getVhostQueue: getVhostQueue,
        putVhostQueue: putVhostQueue,
        deleteVhostQueue: deleteVhostQueue,

        deleteVhostQueueContents: deleteVhostQueueContents,

        //Bindings
        getBindings: makeRequest('GET', 'bindings'),
        getVhostBindings: getVhostBindings,

        //Vhosts
        getVhosts: makeRequest('GET', 'vhosts'),
        getVhost: getVhost,
        putVhost: putVhost,
        deleteVhost: deleteVhost,

        //Users
        getUsers: makeRequest('GET', 'users'),
        getUser: getUser,
        putUser: putUser,
        deleteUser: deleteUser,

        getUserPermissions: getUserPermissions,
        setUserPermissions: setUserPermissions,

        getCurrentUser: getCurrentUser,
        whoAmI: getCurrentUser
    };
}

module.exports = rabbitStats;
