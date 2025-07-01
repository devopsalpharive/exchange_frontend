// let key = 'local' // live || demo || local || staging
var config = {}
// ESLINT_NO_DEV_ERRORS=true
if (process.env.REACT_APP_MODE == "local") {
  config.API_URL = "http://localhost:2002";
  config.BASE_URL = "http://localhost:2002/api";
  config.FRONT_URL = "http://localhost:3000";
  config.SOCKET_URL = "http://localhost:2002";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6LfDjC0qAAAAAIsNal7g7xJNWJbbLCySUMxWyYHu";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  // config.SITE_KEY = "6LfDVT0qAAAAACEWo7xOxPTSC2xc1bnAMjz-VD_-";
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
} else if (process.env.REACT_APP_MODE == "staging") {
  config.API_URL = "https://backend-staging.humb.io/";
  config.BASE_URL = "https://backend-staging.humb.io/api";
  config.SOCKET_URL = "https://backend-staging.humb.io/";
  config.FRONT_URL = "https://test.humb.io";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  // config.SITE_KEY = "6LfDjC0qAAAAAIsNal7g7xJNWJbbLCySUMxWyYHu";
  config.SITE_KEY = "6LfDVT0qAAAAACEWo7xOxPTSC2xc1bnAMjz-VD_-";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
}
else if (process.env.REACT_APP_MODE == "stagingtest") {
  config.API_URL = "https://backend-uat.humb.io/";
  config.BASE_URL = "https://backend-uat.humb.io/api";
  config.SOCKET_URL = "https://backend-uat.humb.io/";
  config.FRONT_URL = "https://uat.humb.io";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6Lf6E3wqAAAAAN5HGYW39lqx0Y8FQyPF7yza5dhu";
  // config.SITE_KEY = "6LcP72IqAAAAAEULV8uNUoKc-sZ8mpgMMaRe87sy";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
}
else if (process.env.REACT_APP_MODE == "demo") {
  config.API_URL = "https://maticzapiexchange.maticz.in/api";
  config.BASE_URL = "https://maticzapiexchange.maticz.in/api";
  config.SOCKET_URL = "https://maticzapiexchange.maticz.in/";
  config.FRONT_URL = "https://maticzexchange.maticz.in";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6LfDjC0qAAAAAIsNal7g7xJNWJbbLCySUMxWyYHu";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }

}
else if (process.env.REACT_APP_MODE == "live") {
  config.API_URL = "https://backend-prod.humb.io/api";
  config.BASE_URL = "https://backend-prod.humb.io/api";
  config.SOCKET_URL = "https://backend-prod.humb.io";
  config.FRONT_URL = "https://app.humb.io";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6LePfUUqAAAAAOGMB723G1PAx5Wx7UzAXObpiqdB";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
}
else if (process.env.REACT_APP_MODE == "test") {
  config.API_URL = "https://backend-test.humb.io/api";
  config.BASE_URL = "https://backend-test.humb.io/api";
  config.SOCKET_URL = "https://backend-test.humb.io";
  config.FRONT_URL = "https://test.humb.io";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6Ld-o5gqAAAAAJyiohMx-qHYnJFBcE2UIS-NvXR5";
  // config.SITE_KEY = "6LcP72IqAAAAAEULV8uNUoKc-sZ8mpgMMaRe87sy";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
}
else if (process.env.REACT_APP_MODE == "uat") {
  config.API_URL = "https://backend-uat.humb.io/api";
  config.BASE_URL = "https://backend-uat.humb.io/api";
  config.SOCKET_URL = "https://backend-uat.humb.io";
  config.FRONT_URL = "https://uat.humb.io";
  config.cryptocompare = "3b3e5c29641550ed35dcf9dffb5d11d7d665a280228be62d328cc9cb91232c29";
  config.SITE_KEY = "6LeRo5gqAAAAAObCP1-_TxOrSUVre-lw2lsYcCCq";
  // config.SITE_KEY = "6LcP72IqAAAAAEULV8uNUoKc-sZ8mpgMMaRe87sy";
  config.SERCERT_KEY = '@HUMB-EXH@ngE@';
  config.GOOGLE_KEY = "Fevqbx6cUacguCLu9Bguqn1oTPBfkyFjJ9RuhB4TU1Ze7ZIjgq"
  config.adminBank = {
    bankName: "xyz Junction Limited",
    accountNo: "XYZ0000027",
    bankCode: "40101011042102",
    holderName: "John Doe"
  }
}
// SITE_KEY
// 6LePfUUqAAAAACDAyR1OwgLifDWpM0u_ntkKeHIT   SECRET_KEY
export default config;
