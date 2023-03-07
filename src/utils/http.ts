import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type Method,
} from 'axios';
import { getToken } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';
import { REDIRECT_LOGIN } from '@/router/constants';

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

const http: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL : '',
  timeout: 3000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 请求拦截
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getToken()) {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 相应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      Message.error(`${error.response.status}：${error.response.data.message}`);
    } else if (error.response.status === 401) {
      window.location.href = REDIRECT_LOGIN;
      Message.error(`${error.response.status}：登录超时`);
    } else if (error.response.status === 403) {
      Message.error(`${error.response.status}：${error.response.data.message}`);
    } else if (error.response.status === 422) {
      Message.error(`${error.response.status}：${error.response.data.message}`);
    } else if (error.response.status === 500) {
      Message.error(`${error.response.status}：服务器错误`);
    }
    return Promise.reject(error);
  }
);

const request = <T>(
  method: RequestMethods,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  // 单独处理自定义请求/响应回掉
  return new Promise((resolve, reject) => {
    http
      .request({
        method,
        url,
        ...config,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  request,
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, config);
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('delete', url, config);
  },
  post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', url, {
      ...config,
      data,
    });
  },
  put<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('put', url, {
      ...config,
      data,
    });
  },
};
