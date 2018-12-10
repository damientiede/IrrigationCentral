export const environment = {
  production: true,
  auth: {
    clientID: '52CgJnxpjfWb12ZECCOvauyh2gA6pCkW',
    domain: 'irrigation-central.au.auth0.com', // e.g., you.auth0.com
    audience: 'http://delta:3001', // e.g., http://localhost:3001
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  }
};
