'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try {
        const itemToLookup = request.params.item;
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        return response.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

module.exports = (app) => {
    app.get('/users/age/:item', getListOfAgesOfUsersWithHandler);
};
