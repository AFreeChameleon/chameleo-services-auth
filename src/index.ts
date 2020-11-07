import axios, { AxiosError, AxiosResponse } from 'axios';

type OKResponse = {
  status: number;
  message: string;
}

type ErrorResponse = {
  message: string;
  status?: number;
}

abstract class AuthTypes {
  abstract login(email: string, password: string): Promise<OKResponse>;
  abstract register(email: string, password: string, username: string): Promise<OKResponse>;
  abstract logout(): Promise<OKResponse>;
  abstract verifyUser(cookie?: { cookie: string }): Promise<boolean>;
  abstract resetPassword(email: string): Promise<OKResponse>;
  abstract changeEmail(email: string, password: string): Promise<OKResponse>;
  abstract deleteUser(email: string, password: string): Promise<OKResponse>;
}


class Auth extends AuthTypes {
  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  async login(email: string, password: string) {
    try {
      const res: AxiosResponse = await axios.post(
        `${this.url}/api/login`,
        { email: email, password: password },
        { withCredentials: true },
      );
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/register`, { email, password, username });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
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
      let error: ErrorResponse = err.response ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }

  async verifyUser(cookie?: { cookie: string }) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/verify-user`, {}, { 
        withCredentials: true,
        headers: !cookie ? cookie : undefined
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  async resetPassword(email: string) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/reset-password`, {
        email,
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response.data.message ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }

  async verifyResetPasswordToken(token: string, password: string) {
    try {
      const res: AxiosResponse = await axios.patch(`${this.url}/api/reset-password/${token}`, {
        newPassword: password
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response.data.message ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }

  async changeEmail(email: string, password: string) {
    try {
      const res: AxiosResponse = await axios.patch(`${this.url}/api/change-email`, {
        email,
        password,
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }

  async deleteUser(email: string, password: string) {
    try {
      const res: AxiosResponse = await axios.delete(`${this.url}/api/delete-user`, {
        data: {
          email,
          password,
        }
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse = err.response ? {
        message: err.response.data.message,
        status: err.response.status,
      } : {
        message: err.message
      };
      throw error;
    }
  }
}

export default Auth;
