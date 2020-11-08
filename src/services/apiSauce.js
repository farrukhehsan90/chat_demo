// import base64 from "base-64";
import {create} from 'apisauce';
// import qs from "qs";
import {Alert} from 'react-native';

const api = create({
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
});

class ApiSauce {
  async post(url, payload, headers) {
    const Header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post(url, payload, {headers: Header});

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async postWithToken(url, payload, token, headers) {
    const Header = {
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };

    const response = await api.post(url, payload, Header);

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }
  async getWithToken(url, token, headers) {
  
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    const Header = {
      headers: {
        Authorization: token,
      },
    };
console.log(Header)
    const response = await api.get(url);

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  // for simple get request
  async get(url, payload, headers) {
    // const token = data && data.access_token && data.access_token;

    api.setHeaders({
      // "Content-Type": "application/x-www-form-urlencoded",
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    });
    const response = await api.get(url, payload);

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  handlePromise = (resolve, reject, response) => {
    if (
      response.ok &&
      response.data &&
      response.data.success &&
      response.originalError === null
    ) {
      resolve(response.data);
    } else {
      if (response.data && !response.data.success) {
        reject(response.data.msg);
      } else if (
        response.status === 422 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.data.message);
      } else if (
        response.status === 404 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.problem);
      } else if (
        response.status === 401 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.problem);
      } else if (
        response.status === 500 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.problem);
      } else if (
        response.status === 403 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.data.message);
      } else if (
        response.originalError &&
        response.originalError.response &&
        response.originalError.response.data &&
        response.originalError.response.data.Message &&
        response.originalError.response.data.Message
      ) {
        reject(response.originalError.response.data.Message);
      } else if (
        response.originalError &&
        !response.ok &&
        response.problem === 'NETWORK_ERROR'
      ) {
        reject(response.problem);
      }
    }
  };

}

export default new ApiSauce();
