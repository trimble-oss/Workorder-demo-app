export const environment = {

    useAuth: true,

    //Specify a Connected Project ID. This will be used in subsequent API calls when fetching WorkOrders and Tasks
    projectId:'LHA-9S10REc',


    //Used for the API calls.
    trimbleCloudApiUrl: 'https://cloud.api.trimble.com',


    //Used for the authentication process
    authProviderHostName: 'https://id.trimble.com',
    clientId: '43b22a76-bfec-490a-8393-472ab65ee766',
    redirectUri: "http://localhost:3000/login/callback",
}
