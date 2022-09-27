window._config = {
    // prod & dev testing var. Uncomment when appropriate.
    cognito: {

        // Development
         userPoolId: 'us-west-2_ASCP5FzjA', // test user pool id
         userPoolClientId: '1glh1am68gq1e94sjmaphe456o', // test user pool client id
         cidp: "cognito-idp.us-west-2.amazonaws.com/us-west-2_ASCP5FzjA", // test identity provider


        // Federated identity
        identityPoolId: 'us-west-2:f56bf2f2-3e03-42cf-b186-ebbeb576a128',

        // Region
        region: 'us-west-2',  // e.g. us-east-2


    },
    api: {
        invokeUrl: 'https://8urvx7gfx7.execute-api.us-west-2.amazonaws.com/staging' // test api endpoint
    },
    ignoreLogin: false
};
