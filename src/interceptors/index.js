import axios from 'axios';
import Cookies from 'universal-cookie';

import config from '../config';

export function setHeaderToken() {
    const cookies = new Cookies();

    // Request Interceptor to set Authorization header
    axios.interceptors.request.use(
        config => {
            const token = cookies.get('token');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Flag to prevent multiple refresh attempts simultaneously
    let refreshInProgress = false;

    // Response Interceptor to handle 401 errors and refresh tokens
    axios.interceptors.response.use(
        response => response,
        async error => {
            if (error.response) {
                const cookies = new Cookies(null, { path: "/" });
                const originalRequest = error.config;
                console.log("originalRequest", originalRequest);

                // If 401 error and no refresh in progress
                if (error.response.status === 401 && !refreshInProgress) {
                    refreshInProgress = true;
                    try {
                        const refreshToken = cookies.get('refreshToken');
                        if (!refreshToken) {
                            // No refresh token, redirect to login
                            window.location.href = '/';
                            return;
                        }

                        // Request to refresh the access token
                        const response = await axios.post(`${config.refreshTokenUrl}`, { refreshToken });

                        const token = response.data.accessToken;
                        const newRefreshToken = response.data.refreshToken;

                        // Set new tokens in cookies
                        cookies.set('token', token, { path: "/" });
                        cookies.set('refreshToken', newRefreshToken, { path: "/" });

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        refreshInProgress = false;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed, clear cookies and redirect to login
                        console.log("Refresh token error", refreshError);
                        cookies.remove('token', { path: "/" });
                        cookies.remove('refreshToken', { path: "/" });
                        window.location.href = '/'; // Redirect to login page
                        refreshInProgress = false;
                    }
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            return Promise.reject(error);
        }
    );
}
