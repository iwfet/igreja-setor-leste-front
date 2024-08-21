import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {isEmpty} from '@/utils/isEmpty.ts';
import {getToken, removeToken} from "@/utils";


interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export default class BaseHttp {
  private axiosInstance: AxiosInstance;
  private readonly NO_CONTENT = 204;
  private readonly UNAUTHORIZED = 401;

  constructor(subUrl?: string) {
    // @ts-ignore
    const urlBasse = import.meta.env.PROD ? `http://localhost:5005/api${subUrl}` : `http://localhost:5005/api${subUrl}`

    this.axiosInstance = axios.create({
      baseURL: urlBasse,
      headers: {'Content-Type': 'application/json'},
    });

    // axiosRetry(this.axiosInstance, {retries: 3});

    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = getToken();
        if (!isEmpty(token)) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => (response.status === this.NO_CONTENT ? null : response.data),
      (error) => this.handleError(error),
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  private handleError(error: any): Promise<ApiError> {
    const defaultError: ApiError = {
      message: 'System unavailable - Try again later',
      error: 'UnknownError',
      statusCode: error.response?.status,
    };

    if (error.response) {
      if (error.response.status === this.UNAUTHORIZED) {
        removeToken();
        window.location.href = '/login';
        return Promise.reject({...defaultError, error: 'Unauthorized', statusCode: this.UNAUTHORIZED});
      }
      return Promise.reject(this.handleApiError(error.response.data));
    }

    removeToken();
    return Promise.reject(defaultError);
  }

  private handleApiError(data: any): ApiError {
    if (data?.error) {
      return {
        message: data.message || 'Unknown error',
        error: data.error || 'UnknownError',
        statusCode: data.statusCode || 500,
      };
    }
    if (typeof data === 'string') {
      return {
        message: data,
        error: 'StringError',
        statusCode: 500,
      };
    }
    return {
      message: 'Failed to access API...',
      error: 'UnknownError',
      statusCode: 500,
    };
  }
}
