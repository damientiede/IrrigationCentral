export const environment = {
    production: false,
    auth: {
      clientID: 'IP3LbxruP9Mxs9o0xDyGT0iri1AMtXh2',
      domain: 'irrigation-central.au.auth0.com', // e.g., you.auth0.com
      audience: 'http://irrigationcentral.co.nz:8011', // e.g., http://localhost:3001
      redirect: 'http://irrigationcentral.co.nz:8010/callback', // http://localhost:4200/callback
      scope: 'openid profile email',
      returnTo: 'http://irrigationcentral.co.nz:8010'
    }
};
