export const environment = {
  production: true,
  auth: {
    clientID: '5494UjIl3QJE6YoVWeSYjGs2i4yGvZAm',
    domain: 'irrigation-central.au.auth0.com', // e.g., you.auth0.com
    audience: 'http://irrigationcentral.co.nz:8001', // e.g., http://localhost:3001
    redirect: 'http://irrigationcentral.co.nz:8000/callback', // http://localhost:4200/callback
    scope: 'openid profile email',
    returnTo: 'http://irrigationcentral.co.nz:8000'
  }
};
