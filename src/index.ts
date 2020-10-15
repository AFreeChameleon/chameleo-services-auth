import axios, { AxiosError, AxiosResponse } from 'axios';

type EmailPasswordType = {
  email: string;
  password: string
}

type EmailPasswordNameType = {
  email: string;
  password: string;
  name: string;
}

type ResetPasswordType = {
  email: string;
  oldPassword: string;
  newPassword: string;
}

type OKResponse = {
  status: number;
  message: string;
}

type ErrorResponse = {
  error: string;
  status?: number;
}

abstract class AuthTypes {
  abstract login({ email, password }: EmailPasswordType): Promise<OKResponse>;
  abstract register({ email, password, name }: EmailPasswordNameType): Promise<OKResponse>;
  abstract logout(): Promise<OKResponse>;
  abstract verifyUser(): Promise<OKResponse>;
  abstract resetPassword({ email, oldPassword, newPassword }: ResetPasswordType): Promise<OKResponse>;
  abstract changeEmail({ email, password }: EmailPasswordType): Promise<OKResponse>;
  abstract deleteUser({ email, password }: EmailPasswordType): Promise<OKResponse>;
}


class Auth extends AuthTypes {
  _id?: string;
  name?: string;
  email?: string;

  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  async login({ email, password }: EmailPasswordType) {
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
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
    }
  }

  async register({ email, password, name }: EmailPasswordNameType) {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/api/register`, { email, password, name });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
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
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
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
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
    }
  }

  async resetPassword({ email, oldPassword, newPassword }: ResetPasswordType) {
    try {
      const res: AxiosResponse = await axios.patch(`${this.url}/api/reset-password`, {
        email,
        oldPassword,
        newPassword,
      });
      return {
        status: res.status,
        message: res.data.message,
      };
    } catch (err) {
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
    }
  }

  async changeEmail({ email, password }: EmailPasswordType) {
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
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
    }
  }

  async deleteUser({ email, password }: EmailPasswordType) {
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
      let error: ErrorResponse;
      if (err.response) {
        error = {
          error: err.response.data.error,
          status: err.response.status,
        };
      } else {
        error = {
          error: err.message,
        };
      }
      throw error;
    }
  }
}

export default Auth;
