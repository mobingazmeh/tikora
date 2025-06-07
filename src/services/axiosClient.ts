import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

interface axiosClientType extends AxiosInstance {
  setAuthToken: (token: string) => void;
}
const publicApis = ['/otp', '/login', '/login_register'];
const axiosClient: axiosClientType = axios.create({
  baseURL: BASE_URL,
}) as axiosClientType;

axiosClient.setAuthToken = function (token) {
  this.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : undefined;
};
const token = Cookies.get("token");
console.log("📌 توکن فعلی:", token);

axiosClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  (config) => {
    if (publicApis.some(api => config.url?.includes(api))) {
      return config;
    }
    const token = Cookies.get("token");
    console.log("📌 توکن در زمان ارسال درخواست:", token); // لاگ توکن
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        ...config.headers,
      },
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
console.log("token")

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method !== "get" && response.data.user_message) {
      toast.success(response.data.user_message);
    }

    return Promise.resolve(response.data); // Ensure the full response is returned
  },
  /// مدیریت خطا
  (error: AxiosError<{ message: string }>) => {
    if (error.response?.data?.message && error.config?.method !== "get") {
      // Uncomment and use notification system if desired
      // notification.error({
      //   message: error.response.data.message,
      // });
    }

    // Uncomment to handle 401 error for unauthorized access
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("auth-storage");
    //   location.href = "http://samane.iranisampler.com/auth/login";
    // }

    //return Promise.reject({ ...error, handled: true });
  }
);

export default axiosClient;

