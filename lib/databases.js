
'use strict';
var requester = require('./requester.js');
var mlutil    = require('./mlutil.js');
var Operation = require('./operation.js');

/**
 * Provides functions to manage databases.
 * @namespace databases
 */

function Databases(client) {
  if (!(this instanceof Databases)) {
    return new Databases(client);
  }
  this.client = client;
}

/**
 * Creates a database.
 * @method databases#create
 * @param {string} name - a database name or id
 * @returns TK
 */
Databases.prototype.create = function createDatabase() {
  if (arguments.length !== 1) {
    throw new Error('incorrect number of arguments');
  }
  var arg = arguments[0];

  var connectionParams = this.client.connectionParams;
  var requestOptions = mlutil.copyProperties(connectionParams);
  requestOptions.method = 'POST';
  requestOptions.headers = {
      'Content-Type': 'application/json',
      'Accept':       'application/json'
  };
  requestOptions.path = '/manage/v2/databases?format=json';

  var operation = new Operation(
      'query values', this.client, requestOptions, 'single', 'single'
      );
  operation.validStatusCodes = [201];
  operation.requestBody = {'database-name': arg};

  return requester.startRequest(operation);
};

/**
 * Deletes a database.
 * @method databases#delete
 * @param {string} name - a database name or id
 * @returns TK
 */
Databases.prototype.delete = function deleteDatabase() {
  if (arguments.length !== 1) {
    throw new Error('incorrect number of arguments');
  }
  var arg = arguments[0];

  var connectionParams = this.client.connectionParams;
  var requestOptions = mlutil.copyProperties(connectionParams);
  requestOptions.method = 'DELETE';
  requestOptions.headers = {
      'Content-Type': 'application/json',
      'Accept':       'application/json'
  };
  requestOptions.path = '/manage/v2/databases/' + arg;

  var operation = new Operation(
      'query values', this.client, requestOptions, 'single', 'single'
      );
  operation.validStatusCodes = [204];

  return requester.startRequest(operation);
};

module.exports = Databases;
