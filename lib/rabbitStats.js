var rp = require('request-promise');
var _ = require('lodash');
var nodeUrl = require('url');

function rabbitStats(url, user, pass) {
    var OPTIONS = {
        url: url,
        json: true,
        auth: {
            user: user,
            pass: pass,
            sendImmediately: false
        }
    };

    function makeRequest(method, path) {
        return function(query, body) {
            var options = _.cloneDeep(OPTIONS);
            options.method = method;
            options.url = nodeUrl.resolve(options.url, '/api/'+path);
            options.qs = query;
            options.body = body;
            return rp(options);
        };
    }

    function getNode(name) {
        return makeRequest('GET', 'nodes/'+name)();
    }

    function getConnection(name) {
        return makeRequest('GET', 'connections/'+name)();
    }

    function deleteConnection(name) {
        return makeRequest('DELETE', 'connections/'+name)();
    }

    function getConnectionChannels(name) {
        return makeRequest('GET', 'connections/'+name+'/channels')();
    }

    function getChannel(name) {
        return makeRequest('GET', 'channels/'+name)();
    }

    function getVhostConsumers(vhost) {
        return makeRequest('GET', 'consumers/'+vhost)();
    }

    function getVhostExchanges(vhost) {
        return makeRequest('GET', 'exchanges/'+vhost)();
    }

    function getVhostExchange(vhost, exchangeName) {
        return makeRequest('GET', 'exchanges/'+vhost+'/'+exchangeName)();
    }

    function putVhostExchange(vhost, exchangeName, query, data) {
        return makeRequest('PUT', 'exchanges/'+vhost+'/'+exchangeName)(query, data);
    }

    function deleteVhostExchange(vhost, exchangeName) {
        return makeRequest('DELETE', 'exchanges/'+vhost+'/'+exchangeName)();
    }

    function getVhostQueues(vhost) {
        return makeRequest('GET', 'queues/'+vhost)();
    }

    function getVhostQueue(vhost, queueName) {
        return makeRequest('GET', 'queues/'+vhost+'/'+queueName)();
    }

    function putVhostQueue(vhost, queueName, query, data) {
        return makeRequest('PUT', 'queues/'+vhost+'/'+queueName)(query, data);
    }

    function deleteVhostQueue(vhost, queueName) {
        return makeRequest('DELETE', 'queues/'+vhost+'/'+queueName)();
    }

    function getVhostBindings(vhost) {
        return makeRequest('GET', 'bindings/'+vhost)();
    }

    function getVhost(name) {
        return makeRequest('GET', 'vhosts/'+name)();
    }

    function putVhost(name, query, body) {
        return makeRequest('PUT', 'vhosts/'+name)(query, body);
    }

    function deleteVhost(name) {
        return makeRequest('DELETE', 'vhosts/'+name)();
    }

    function getUser(name) {
        return makeRequest('GET', 'users/'+name)();
    }

    function putUser(name, query, body) {
        return makeRequest('PUT', 'users/'+name)(query, body);
    }

    function deleteUser(name) {
        return makeRequest('DELETE', 'users/'+name)();
    }

    function getUserPermissions(name) {
        return makeRequest('GET', 'users/'+name+'/permissions')();
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
        getCurrentUser: getCurrentUser,
        whoAmI: getCurrentUser
    };
}

module.exports = rabbitStats;