/*
Xebra solutions

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/
*/

var XebraAuth = window.XebraAuth || {};

(function scopeWrapper($) {

    /////////////// PRIVATE VARIABLES ///////////////////////////////////////////////
    var loginUrl = 'https://saintgeorge.xebra.us';
    var credKeys = [
        'accessKeyId',
        'secretAccessKey',
        'sessionToken',
    ];

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    // setup global AWS settings
    AWS.config.region = _config.cognito.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: _config.cognito.identityPoolId
    })
    var logins = {};
    logins[_config.cognito.cidp] = null;
    var cognitoIdentityParams = {
        IdentityId: _config.cognito.identityPoolId,
        Logins: logins
    }

    var errorCognito = "";
    var cognitoIdentity;
    var apigClient;
    var cred;
    let cognitoUserLogin = null;
    var loginNewPasswordChangeThis;
    var requiredAttributesState;
    var userAttributesState;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        $('#noCognitoMessage').show();
        return;
    }



    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

////////////////////////////////////////// END OF PRIVATE VARIABLES //////////////////////////////////

    $(function onDocReady() {
        //$('#login-form').submit(handleLogin);
        $('#submit-btn').click(handleLogin);
        //$('#registrationForm').submit(handleRegister);
        $('#verifyForm').submit(handleVerify);
        $('#forgot-btn').click(handleForgotPassword)
        $('#forgot-verify-btn').click(handleInputVerificationCodeForgotPassword);
        $('#change-password-form').submit(handleChangePassword);
        let page = window.location.href;
        if(page.includes('login.html')){
            if(getUrlVars()["action"] === 'logout')
                localStorage.clear();
        }
    });

    function getUrlVars()
    {

        var vars = [], hash;
        // check if there is/are valid query parameters
        if( window.location.href.includes('?')) {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                // Remove # from URL - Check reason
                vars[hash[0]] = hash[1].replace('#', '');
            }
        }
        return vars;
    }

////////////////////////////////////// GLOBAL FUNCTIONS ////////////////////////////////////////////

    XebraAuth.signOut = function signOut(redirectUrl) {
        let user = userPool.getCurrentUser();
        user.getSession( (error, session) => {
            if(error) {
                console.log(error);
                alert(error);
            }
            else{
                user.globalSignOut({
                    onSuccess: redirectLogin,
                    onFailure: sigOutError
                });
            }
        })

    }

    XebraAuth.authToken = function fetchCurrentAuthToken() {
        return new Promise((resolve, reject) => {
            var cognitoUser = userPool.getCurrentUser();

            if (cognitoUser) {
                cognitoUser.getSession(function sessionCallback(err, session) {
                    if (err) {
                        reject(null);
                    } else if (!session.isValid()) {
                        resolve(null);
                    } else {

                        // load credentials
                        if (validateCred()) {
                            credKeys.forEach(function (key) {
                                if (window.sessionStorage.getItem(key))
                                    AWS.config.credentials[key] = window.sessionStorage.getItem(key);
                            });
                            resolve(session.getIdToken().getJwtToken());
                        }
                        else {
                            cognitoIdentityParams.Logins[_config.cognito.cidp] = session.getIdToken().getJwtToken();
                            cred = new AWS.CognitoIdentityCredentials({
                                IdentityPoolId: _config.cognito.identityPoolId,
                                Logins: cognitoIdentityParams.Logins
                            });
                            AWS.config.credentials = cred;
                            AWS.config.credentials.get((error) => {
                                if (error) {
                                    console.log(error);
                                    // let's attempt to
                                    //     AWS.config.credentials.refresh((error) => {
                                    //                         if (error) {
                                    //                             console.error(error);
                                    //                         } else {
                                    //                             console.log('Successfully logged!');
                                    //
                                    //                         }
                                    //                     });
                                }
                                else {
                                    console.log("Credentials Refreshed");
                                    // update credentials in session storage
                                    updateCred();
                                    resolve(session.getIdToken().getJwtToken());
                                }
                            });
                        }

                        //console.log(this);
                    }
                });
            } else {
                // user does not exist
                reject(null);
            }
        });
    };

    XebraAuth.getCurrentUser = function getCurrentUser(){
        return userPool.getCurrentUser();
        // if (cognitoUser != null) {
        //     cognitoUser.getSession(function (err, session) {
        //         if (err) {
        //             alert(err);
        //             return null;
        //         }
        //         console.log('session validity: ' + session.isValid());
        //         return session;
        //     });
        // }
    }

    XebraAuth.adminGetUser = function adminGetUser(username) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
            "user_sub": username
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            //headers: {
            //Authorization: tk,
            //     "Access-Control-Allow-Origin": "*"
            //},
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "GET");
    }

    XebraAuth.getListUsers = function getListUsers() {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            //headers: {
            //Authorization: tk,
            //     "Access-Control-Allow-Origin": "*"
            //},
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "GET");

    };

    XebraAuth.getUserActivity = function getUserActivity(fromDate, toDate){
        // get token
        if(fromDate == null || fromDate == undefined)
            var params =  {
                // This is where any modeled request parameters should be added.
                // The key is the parameter name, as it is defined in the API in API Gateway.

            }; 
        else 
            var params = {
                "from":fromDate,
                "to":toDate
            };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            //headers: {
            //Authorization: tk,
            //     "Access-Control-Allow-Origin": "*"
            //},
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.activities(params, body, additionalParams, "GET");
    }
	
	XebraAuth.getListCertificates = function getListCertificates(user_sub) {
        // get token
        var params = {
			"user_sub": user_sub
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            //headers: {
            //Authorization: tk,
            //     "Access-Control-Allow-Origin": "*"
            //},
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.certificates(params, body, additionalParams, "GET");
    };

    XebraAuth.getCertificatePDF = function getCertificatePDF(user_sub,certificate_id, holder_id) {
        // get token
        var params = {
            "user_sub": user_sub,
            "certificate_id": certificate_id,
            "holder_id": holder_id,
            "view": "json"
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            // headers: {
            //      "Accept": "application/pdf"
            // },
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);

        }

        return apigClient.certificates(params, body, additionalParams, "GET");
    };

    XebraAuth.getSchubergCertificatePDF = function getSchubergCertificatePDF(user_sub, certificate_id) {
        // get token
        var params = {
            "user_sub": user_sub,
            "certificate_id": certificate_id,
            "view": "pdf-upload"
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            // headers: {
            //      "Accept": "application/pdf"
            // },
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);

        }

        return apigClient.certificates(params, body, additionalParams, "GET");
    };

    XebraAuth.uploadSchubergCertificatePDF = function uploadSchubergCertificatePDF(user_sub, certificate_id, fileblob) {
        // get token
        var params = {

        };

        var body = {
            "user_sub": user_sub,
            "certificate_id": certificate_id,
            "fileblob": fileblob
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            // headers: {
            //      "Accept": "application/pdf"
            // },
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);

        }

        return apigClient.certificates(params, body, additionalParams, "PUT");
    };

    XebraAuth.getSentCertificatePDF = function getSentCertificatePDF(user_sub, sent_history_id) {
        // get token
        var params = {
            "user_sub": user_sub,
            "sent_history_id": sent_history_id,
            "view": "sent-history-pdf"
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
            // If there are any unmodeled query parameters or headers that must be
            //   sent with the request, add them here.
            // headers: {
            //      "Accept": "application/pdf"
            // },
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);

        }

        return apigClient.certificates(params, body, additionalParams, "GET");
    };
	
    XebraAuth.getMobileUsers = function getMobilUsers(next_token) {

        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        if(next_token){
            params["next_token"] = next_token;
        }
        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.customers(params, body, additionalParams, "GET");

    };

    XebraAuth.createMobileUser = function createMobileUser(newUserData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = newUserData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.customers(params, body, additionalParams, "POST");

    };

    XebraAuth.createAdminUser = function createAdminUser(newUserData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = newUserData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient == null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "POST");

    };

    XebraAuth.getListTransactions = function getListTransactions() {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
            limit: 200
        };

        var body = "";

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.transactions(params, body, additionalParams, "GET");

    };

    XebraAuth.createCertificate = function createCertificate(certData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = certData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.certificates(params, body, additionalParams, "POST");

    };

    XebraAuth.createHolder = function createHolder(holderData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = holderData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.holder(params, body, additionalParams, "POST");

    };

    XebraAuth.updateMobileUser = function updateMobileUser(editUserData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = editUserData;

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.customers(params, body, additionalParams, "PUT");

    };

    XebraAuth.resendConfirmation = function resendConfirmation(body) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "POST");

    };

    XebraAuth.updateAdminUser = function updateAdminUser(newUserData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = newUserData;

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "PUT");

    };

    XebraAuth.updateCertificate = function updateCertificate(certData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = certData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.certificates(params, body, additionalParams, "PUT");

    };

    XebraAuth.updateHolder = function updateHolder(holderData) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = holderData;

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.holder(params, body, additionalParams, "PUT");

    };

    XebraAuth.bridgeVerifyPDF = function bridgeVerifyPDF(pdfData) {
        var params = {
        };

        // Comes from Xportal like this '{"type": "validation","data_pdf": "' + e + '}' 
        var body = pdfData;

        var additionalParams = {
            //    headers: {
            //         "Access-Control-Allow-Origin": "*"
            //    },
        };

        var config = {};
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }

        return apigClient.bridge(params, body, additionalParams, "POST");
    };

    XebraAuth.getSentHistory = function getSentHistory(user_sub) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
            user_sub: user_sub
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.email(params, body, additionalParams, "GET");

    };

    XebraAuth.getReferralHistory = function getReferralHistory(user_sub) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
            user_sub: user_sub
        };

        var body = {
            // This is where you define the body of the request,
        };

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.referral(params, body, additionalParams, "GET");

    };

    XebraAuth.updateReferralStatus = function updateReferralStatus(referralData){
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
        };

        var body = referralData;

        var additionalParams = {};
        var config ={};
                
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.referral(params, body, additionalParams, "PUT");
    }

    XebraAuth.createReferral = function createReferral(referralData){
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
        };

        var body = referralData;

        var additionalParams = {};
        var config ={};
                
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.referral(params, body, additionalParams, "POST");
    }

    XebraAuth.sendCertificate = function sendCertificate(body) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.
        };

        var body = body;

        var additionalParams = {};
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.email(params, body, additionalParams, "POST");

    };

    XebraAuth.deleteCertificate = function deleteCertificate(certificate_id) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = { certificate_id : certificate_id};

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.certificates(params, body, additionalParams, "DELETE");

    };

    XebraAuth.deleteSchubergCertificate = function deleteCertificate(user_sub,certificate_id) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = {
            certificate_id : certificate_id,
            user_sub: user_sub,
            type: 'file'
        };

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.certificates(params, body, additionalParams, "DELETE");

    };

    XebraAuth.deleteHolder = function deleteHolder(holder_id) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = { holder_id : holder_id};

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.holder(params, body, additionalParams, "DELETE");

    };

    XebraAuth.toggleAdminUserStatus = function toggleAdminUserStatus(reqBody){
        var params = {}

        var body = reqBody;

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "POST");

    };

    XebraAuth.toggleMobileUserStatus = function toggleMobileUserStatus(reqBody){
        var params = {}

        var body = reqBody;

        var additionalParams = {
        };
        var config = {}
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.customers(params, body, additionalParams, "POST");

    };

    XebraAuth.createSignature= function createSignature(reqBody){
        var params = {}
        var body = reqBody;
        var additionalParams = {};
        var config = {};
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.signatures(params, body, additionalParams, "POST");
    };

    XebraAuth.getSignature= function getSignature(username){
        var params = {
            "user_sub": username
        }
        var body = {};
        var additionalParams = {};
        var config = {};
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.signatures(params, body, additionalParams, "GET");
    };
    
    XebraAuth.updateSignature= function updateSignature(reqBody){
        var params = {}
        var body = reqBody;
        var additionalParams = {};
        var config = {};
        if (apigClient == null) {
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.signatures(params, body, additionalParams, "PUT");
    };


    XebraAuth.deleteMobileUsers = function deleteMobileUsers(user_id) {
        // get token
        var params = {
            // This is where any modeled request parameters should be added.
            // The key is the parameter name, as it is defined in the API in API Gateway.

        };

        var body = { user_id : user_id};

        var additionalParams = {
        };
        var config = {}
        if(apigClient === null){
            config["accessKey"] = AWS.config.credentials.accessKeyId;
            config["secretKey"] = AWS.config.credentials.secretAccessKey;
            config["sessionToken"] = AWS.config.credentials.sessionToken;
            apigClient = apigClientFactory.newClient(config);
        }
        return apigClient.users(params, body, additionalParams, "DELETE");

    };
    
/////////////////////////////////// END OF GLOBAL FUNCTIONS //////////////////////////////////


///////////////////////////////// PRIVATE FUNCTIONS ////////////////////////////////////////

    /*
     * Cognito User Pool functions
     */

    function adminCreateUser(userData) {



            let createUserParams = {
                UserPoolId: _config.cognito.userPoolId,
                //Username: userData.username,
                MessageAction: 'SUPPRESS',
                //TemporaryPassword: newUserTempPassword,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: userData.email
                    },
                    {
                        Name: 'given_name',
                        Value: userData.givenName
                    },
                    {
                        Name: 'family_name',
                        Value: userData.familyName
                    }
                ]
            };
            let listUserParams = {
                UserPoolId: _config.cognito.userPoolId
            };

            userPool.listUsers(listUserParams, function (err, listUsersData) {
                if (err) {
                    throw (new Error(err));
                }
                for (let poolUserIndex in listUsersData.Users) {
                    if (listUsersData.Users[poolUserIndex].Username === userData.username) {
                        //logger.info('User %s already exists, ignoring', userData.username);
                        return;
                    }
                }
                userPools.adminCreateUser(createUserParams, function (err) {
                    if (err) {
                        throw (new Error(err));
                    }
                    return initialChangePassword(userData);
                });
            });

    }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: userPool
        });
    }

    function redirectLogin(status){
        if(status === "SUCCESS"){
            XebraAuth.clearCred();
            window.location.href = 'login.html?action=logout';
        }
    }

    function sigOutError(res){
        console.log(res);
        alert('Unable to sign out user');
    }


    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        userPool.signUp(toUsername(email), password, [attributeEmail], null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    // function login(email, password, onSuccess, onFailure, onNewPasswordRequired, onMfaRequired) {
    //     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    //         Username: email,
    //         Password: password
    //     });
    //
    //     var cognitoUser = createCognitoUser(email);
    //
    //     cognitoUser.authenticateUser(authenticationDetails, {
    //         onSuccess: onSuccess,
    //         onFailure: onFailure,
    //         newPasswordRequired: function loginNewPasswordChange(userAttributes, requiredAttributes){
    //             // User was signed up by an admin and must provide new
    //             // password and required attributes, if any, to complete
    //             // authentication.
    //             // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
    //             // Required attributes according to schema, which don’t have any values yet, will have blank values.
    //             // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.
    //             $('#login-form').hide();
    //             $('#change-password-form').show();
    //             //var newPassword = prompt('Please input new password' ,'');
    //
    //             // the api doesn't accept this field back
    //             delete userAttributes.email_verified;
    //             console.log("cognitoUser Object",cognitoUser);
    //             // save this state.
    //             cognitoUserLogin = cognitoUser;
    //             loginNewPasswordChangeThis = this;
    //             userAttributesState = userAttributes;
    //             requiredAttributesState = requiredAttributes;
    //         },
    //         mfaRequired: function(codeDeliveryDetails) {
    //             // MFA is required to complete user authentication.
    //             // Get the code from user and call
    //             cognitoUser.sendMFACode(mfaCode, this)
    //         },
    //     });
    //
    //
    // }

    function verify(email, code, onSuccess, onFailure) {
        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    /*
     *  Event Handlers
     */


    function validateCred(){
        // check if a cred is valid
        if(window.sessionStorage.getItem("accessKeyId") == null)
            return false
        return true
    }

    function updateCred(){

        credKeys.forEach(function(key) {
            window.sessionStorage.setItem(key, AWS.config.credentials[key]);
        });
        window.sessionStorage.setItem("expired", "false");
    }

    XebraAuth.clearCred = function clearCred(){

        credKeys.forEach(function (key) {
            window.sessionStorage.removeItem(key);
        });
        window.sessionStorage.setItem("expired", "false");
    }

    function handleLogin(event) {
        var email = $('#email-input-login').val().toLowerCase();
        var password = $('#password-input-login').val();

        event.preventDefault();

        // prep the auth values
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
        });

        // this value is needed for later use within the same context(deleted on page refresh)
        let cognitoUser = createCognitoUser(email);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function loginSuccess(result) {


                // requirement for sdk operation
                AWS.config.region = _config.cognito.region;
                let cidp = "cognito-idp." + _config.cognito.region + ".amazonaws.com/" + _config.cognito.userPoolId;
                var loginProvider = {};
                loginProvider[cidp] = result.idToken.jwtToken;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: _config.cognito.identityPoolId,
                    Logins : loginProvider
                });
                console.log(AWS);
                //call refresh method in order to authenticate user and get new temp credentials
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Successfully logged!');
                    }
                });
                console.log('Successfully Logged In');
                window.location.href = "mobile_users.html";
            },
            onFailure: function loginError(err) {
                if(err.message === "User is disabled")
                    $('#login-form--disabled-error').removeClass('display-hide');
                else
                    $('#login-form-error').removeClass('display-hide');
                //alert(err);
            },
            newPasswordRequired: function loginNewPasswordChange(userAttributes, requiredAttributes){
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
                // Required attributes according to schema, which don’t have any values yet, will have blank values.
                // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.
                $('#login-form').hide();
                $('#change-password-form').show();
                //var newPassword = prompt('Please input new password' ,'');

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                console.log("cognitoUser Object",cognitoUser);
                // save this state.
                cognitoUserLogin = cognitoUser;
                loginNewPasswordChangeThis = this;
                userAttributesState = userAttributes;
                requiredAttributesState = requiredAttributes;
            },
            mfaRequired: function(codeDeliveryDetails) {
                // MFA is required to complete user authentication.
                // Get the code from user and call
                cognitoUser.sendMFACode(mfaCode, this)
            },
        });
    }

    function handleForgotPassword(event) {
        event.preventDefault();
        var isValid = $('#forget-form').validate().form();

        if (isValid) {
            // this value is needed for later use within the same context(deleted on page refresh)
            let email = $("#email-input-forget").val()
            let cognitoUser = createCognitoUser(email.toLowerCase());
            cognitoUser.forgotPassword({
                onSuccess: function (data) {
                    // successfully initiated reset password request
                    console.log('CodeDeliveryData from forgotPassword: ' + data);
                    alert('Password change successfully')
                },
                onFailure: function (err) {
                    alert(err.message || JSON.stringify(err));
                },
                //Optional automatic callback
                inputVerificationCode: function (data) {
                    console.log('Code sent to: ' + data);
                    // save the cognito context for later use
                    cognitoUserLogin = cognitoUser;
                    // hide and show forms accordingly
                    $('#forget-form').hide();
                    $('#forget-verify-form').show();
                }
            });
        }
        else{
            alert("An error occured validating form fields. Check fields.")
        }
    }

    function handleInputVerificationCodeForgotPassword(event) {
        // this value is needed for later use within the same context(deleted on page refresh)
        event.preventDefault();
        var isValid = $('#forget-verify-form').validate().form();

        if (isValid) {

            // load the user saved context to continue processing email verification
            let cognitoUser = cognitoUserLogin;
            if(cognitoUser !== null || cognitoUser !== undefined) {
                // obtain the required fields for confirmation
                var verificationCode = $("#code-input-forgot-verify").val()
                var newPassword = $('#password-input-forgot-verify').val();
                // save the cognito context for later use
                cognitoUserLogin = cognitoUser;
                cognitoUser.confirmPassword(verificationCode, newPassword, {
                    onSuccess() {
                        console.log('Password confirmed!');
                        alert("Password confirmed and changed successfully");
                        window.location.href = 'login.html';

                    },
                    onFailure(err) {
                        console.log('Password not confirmed!');
                        alert("Password not confirmed please check fields.");
                    }
                });
            }
            else{
                alert("An error occurred processing this request. Please refresh page.")
            }
        }
    }

    function handleChangePassword(event){

        event.preventDefault();
        var vf= $('#change-password-form').validate().form();

        if (vf) {
            // Get these details and call
            // newPassword: password that user has given
            // attributesData: object with key as attribute name and value that the user has given.
            //var cognitoUser = createCognitoUser("vicsnatch1@gmail.com");
            let password = $('#change-password1').val();
            var res = cognitoUserLogin.completeNewPasswordChallenge(password, userAttributesState, loginNewPasswordChangeThis)
            console.log("Validating new change password");
        }
    }

    function completeNewPasswordChallenge(){

    }

    $('#change-password-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#change-password-form').validate().form()) {
                // Get these details and call
                // newPassword: password that user has given
                // attributesData: object with key as attribute name and value that the user has given.
               // cognitoUser.completeNewPasswordChallenge($('#change-password1').val(), requiredAttributesState, loginNewPasswordChangeThis)
            }
            return false;
        }
    });

    $('#login-form input').keypress(function (e) {
        if (e.which == 13) {
            var vf = $('#login-form').validate().form();
            if (vf) {
                $('#submit-btn').click();
            }
            return false;
        }
    });

    function handleRegister(event) {
        var email = $('#emailInputRegister').val();
        var password = $('#passwordInputRegister').val();
        var password2 = $('#password2InputRegister').val();

        var onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
            if (confirmation) {
                window.location.href = 'verify.html';
            }
        };
        var onFailure = function registerFailure(err) {
            alert(err);
        };
        event.preventDefault();

        if (password === password2) {
            register(email, password, onSuccess, onFailure);
        } else {
            alert('Passwords do not match');
        }
    }

    function handleVerify(event) {
        var email = $('#emailInputVerify').val();
        var code = $('#codeInputVerify').val();
        event.preventDefault();
        verify(email, code,
            function verifySuccess(result) {
                console.log('call result: ' + result);
                console.log('Successfully verified');
                alert('Verification successful. You will now be redirected to the login page.');
                window.location.href = loginUrl;
            },
            function verifyError(err) {
                alert(err);
            }
        );
    }
}(jQuery));
