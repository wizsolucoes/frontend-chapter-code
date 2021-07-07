// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  ssoConfig: {
    apiPath: 'https://sso-hml-web.azurewebsites.net',
    clientID: 'demo_wizparceiros',
    clientSecret:
      'OWs8P4YzyUF3RIOfrCEzpooHR5ZSNSIOhhhj9GEJWphASBbJ2lCdc4WvoAoInFvQ',
    grantType: 'password',
    authedPaths: [
      'https://github.com/wizsolucoes/angular-white-label/blob/master/src/styles.scss',
    ],
    scope: 'user.info',
    options: {
      // parâmetro opcional
      ssoTimeOut: 60000, // parâmetro opcional, determina o timeout para o SSO
      tokenAutoRefresh: true, // parâmetro opcional, determina se o token deve ser renovado
      loginRoute: 'login', // url que aponta para onde redirecionar no caso de não haver token
    },
  },
  appInsights: {
    instrumentationKey: '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
