/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = "us-west-2";
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = _config.api.invokeUrl;
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    apigClient.customersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var customersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/customers').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    };

    
    
    apigClient.usersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    apigClient.customers = function (params, body, additionalParams, methodType) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/customers').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };


        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    };
	
	apigClient.certificates = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/certificates').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.holder = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/holders').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.users = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }

    apigClient.activities = function(params, body, additionalParams, methodType){
        if(additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/activity').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }

    apigClient.bridge = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/bridge').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }

    apigClient.transactions = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/transactions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }

    apigClient.email = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/email').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }

    apigClient.referral = function (params, body, additionalParams, methodType) {
        if (additionalParams === undefined) {
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/referral').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }
    apigClient.signatures = function (params, body, additionalParams,methodType){
        if (additionalParams === undefined){
            additionalParams = {};
        }

        apiGateway.core.utils.assertParametersDefined(params, [] , ['body']);

        var customersOptionsRequest = {
            verb: methodType.toUpperCase(),
            path: pathComponent + uritemplate('/signatures').expand(apiGateway.core.utils.parseParametersToObject(params, [])), headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: params,
            body: body
        };

        return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    }
    //apigClient.cancellations = function (params, body, additionalParams, methodType) {
    //    if (additionalParams === undefined) {
    //        additionalParams = {};
    //    }

    //    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    //    var customersOptionsRequest = {
    //        verb: methodType.toUpperCase(),
    //        path: pathComponent + uritemplate('/bridge').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
    //        headers: apiGateway.core.utils.parseParametersToObject(params, []),
    //        queryParams: params,
    //        body: body
    //    };

    //    return apiGatewayClient.makeRequest(customersOptionsRequest, authType, additionalParams, config.apiKey);
    //}


    return apigClient;
};
