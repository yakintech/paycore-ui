import { axiosInstance } from "./axiosInstance";


axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export const BaseNetwork = {
    getAll: async (url: string) => {
        var responseData = []
        try {
            const response = await axiosInstance.get(url);
            responseData = response.data;
            return responseData;
        }
        catch (error: any) {
            // status code 401 ise refreshtoken ile token yenileme işlemi yapılacak

            if (error.response.status === 401) {
                try {
                    const refreshResponse = await axiosInstance.post('auth/refreshToken', {
                        token: localStorage.getItem('token'),
                        email: localStorage.getItem('userEMail')
                    })
                    localStorage.setItem('token', refreshResponse.data.token);
                    localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

                    const response = await axiosInstance.get(url);
                    responseData = response.data;
                    return responseData;
                }
                catch (error: any) {
                    console.log(error);
                }
                

              

                
            }
            else {

            }
        }

    }
}

