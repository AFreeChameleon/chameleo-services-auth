import axios, { AxiosError, AxiosResponse } from 'axios';

interface RegisterParameters {
  email: string;
  password: string;
  name: string;
}

interface LoginParameters {
  email: string;
  password: string;
}

interface ResetPasswordParameters {
  email: string;
  oldPassword: string;
  newPassword: string;
}

interface ChangeEmailParameters {
  email: string;
  password: string;
}

class Auth {
  _id?: string;
  name?: string;
  email?: string;

  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async login({ email, password }: LoginParameters) {
    try {
      const res: AxiosResponse = await axios.post(
        `${this.url}/api/login`,
        { email, password },
        { withCredentials: true },
      );
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }

  async register({ email, password, name }: RegisterParameters) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/register`, { email, password, name });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }

  async logout() {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/logout`, {}, { withCredentials: true });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }

  async verifyUser() {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/verify-token`, {}, { withCredentials: true });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }

  async resetPassword({ email, oldPassword, newPassword }: ResetPasswordParameters) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/reset-password`, {
        email,
        oldPassword,
        newPassword,
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }

  async changeEmail({ email, password }: ChangeEmailParameters) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/change-email`, {
        email,
        password,
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      if (err.response) {
        return {
          ...err.response.data,
          status: err.response.status,
        };
      } else {
        return {
          message: err.message,
        };
      }
    }
  }
}

export default Auth;
