/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 * 
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

/* jshint latedef:false */
/* jshint forin:false */
/* jshint noempty:false */

'use strict';

var util = require('util');
var msRest = require('ms-rest');
var ServiceClient = msRest.ServiceClient;

var models = require('./models');
var operations = require('./operations');

/**
 * @class
 * Initializes a new instance of the AutoRestComplexTestService class.
 * @constructor
 *
 * @param {string} apiVersion - API ID.
 *
 * @param {string} [baseUri] - The base URI of the service.
 *
 * @param {object} [options] - The parameter options
 *
 * @param {Array} [options.filters] - Filters to be added to the request pipeline
 *
 * @param {object} [options.requestOptions] - Options for the underlying request object
 * {@link https://github.com/request/request#requestoptions-callback Options doc}
 *
 * @param {boolean} [options.noRetryPolicy] - If set to true, turn off default retry policy
 *
 */
function AutoRestComplexTestService(apiVersion, baseUri, options) {
  if (apiVersion === null || apiVersion === undefined) {
    throw new Error('\'apiVersion\' cannot be null.');
  }

  if (!options) options = {};

  AutoRestComplexTestService['super_'].call(this, null, options);
  this.baseUri = baseUri;
  if (!this.baseUri) {
    this.baseUri = 'http://localhost';
  }
  this.apiVersion = apiVersion;

  this.basicOperations = new operations.BasicOperations(this);
  this.primitive = new operations.Primitive(this);
  this.arrayModel = new operations.ArrayModel(this);
  this.dictionary = new operations.Dictionary(this);
  this.inheritance = new operations.Inheritance(this);
  this.polymorphism = new operations.Polymorphism(this);
  this.polymorphicrecursive = new operations.Polymorphicrecursive(this);
  this.models = models;
  msRest.addSerializationMixin(this);
}

util.inherits(AutoRestComplexTestService, ServiceClient);

module.exports = AutoRestComplexTestService;
