import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.headers['authorization'] = window.localStorage.getItem('token') || '';
  // config.headers['Content-Type'] = 'application/json; charset = utf-8';
  return config;
}, function (err) {
  return Promise.reject(err);
});

const network = {}

network.get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(resolve, reject);
  });
}

network.post =  (url, option) => {
  return new Promise((resolve, reject) => {
    axios.post(url, option).then(resolve, reject);
  });
}

export default network
