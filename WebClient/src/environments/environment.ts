// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth: {
    // clientID: '5494UjIl3QJE6YoVWeSYjGs2i4yGvZAm',
    clientID: 'IP3LbxruP9Mxs9o0xDyGT0iri1AMtXh2',
    domain: 'irrigation-central.au.auth0.com', // e.g., you.auth0.com
    audience: 'http://irrigationcentral.co.nz:8011', // e.g., http://localhost:3001
    redirect: 'http://localhost:4200/callback',
    scope: 'openid profile email',
    returnTo: 'http://localhost:4200'
  }
};
