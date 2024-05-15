export const environment = {
  production: false,
  // apiUrl: "https://dummyjson.com/"
  // apiUrl: "http://192.168.0.10:8970/",
  apiUrl: "https://192.168.0.11:9631/",
  // https://192.168.0.11:9631/SWAGGER/index.html
  // fleetApiUrl: "http://192.168.0.10:8989/fleet/"
  // fleetApiUrl: "https://192.168.0.11:9630/fleet/"
  fleetApiUrl: "http://192.168.0.11:9620/fleet/"
  // apiUrl: "http://182.73.78.171:8970"
};

// function baseURLconnent() {
//   let url:any = window.location.origin;
//   let a = url.split(':', 2); 
//   if (a[1] === '//localhost') {
//     // return "http://182.73.78.171:8989/fleet"; 
//     return "http://192.168.0.10:8989/fleet/";
//   } else {
//     url = a[0] + ':' + a[1] + ':' + '8989/fleet/';
//     return url;
//   }
// }
