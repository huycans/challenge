'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo);
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        //should return an arry of age count based on item.
        //assume that every user has a different name

        let usersWithItem = [];

        //filter out users who do not have item
        for (let user in db.itemsOfUserByUsername) {
            if (db.itemsOfUserByUsername[user].indexOf(item) !== -1) {
                usersWithItem.push(user);
            }
        }

        //count the age of the users with item
        let ageCount = {};
        for (let userId in db.usersById) {//for every user info object in db
            const userInfo = db.usersById[userId];
            if (usersWithItem.indexOf(userInfo.username) !== -1) {//if user has the same name as user with item
                if (!ageCount[userInfo.age]) {//and if user's age group has not been assigned yet
                    ageCount[userInfo.age] = 1;
                }
                else {//found the age group of this user
                    ageCount[userInfo.age] += 1;
                }
            }
        }

        //convert ageCount object to array
        let result = [];
        for (let age in ageCount) result.push({ age: +age, count: ageCount[age] });

        return result;
    };
    return mockDBCall(dataAccessMethod);
};

const getItems = () => {
    const dataAccessMethod = () => {
        // should return an array of items without duplicate value.
        let itemSet = new Set();
        for (let user in db.itemsOfUserByUsername) {
            for (let item of db.itemsOfUserByUsername[user]) {
                itemSet.add(item);
            }
        }
        return Array.from(itemSet);
    };
    return mockDBCall(dataAccessMethod);
};

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getItems
};
