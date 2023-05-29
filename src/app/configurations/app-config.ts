export default {

    oidc: {
        // public identifier
        clientId: '0oa9on7muphrAqL8i5d7',
        // issuer of token
        issuer: 'https://dev-35230924.okta.com/oauth2/default',
        redirectUri:'https://mini-project-frontend-opal.vercel.app/login/callback',
        // redirectUri: 'https://localhost:4200/login/callback',
        // openid for authentication request 
        // profile for user's firstName,lastName, etc...
        scopes: ['openid', 'profile', 'email']
    }
    

}