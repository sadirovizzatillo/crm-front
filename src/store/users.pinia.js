import {defineStore} from "pinia";
import Request from "@/api";
import {useCore} from "@/store/index";

export const useUsers = defineStore('user', {
    state: () => ({
        token: null,
        user_me: null,
        isUser: false,
        loading: true,
        loader: false
    }),
    getters: {},
    actions: {
        getToken(data) {
            this.loader = true;
            Request({
                url: 'v1/auth/token',
                method: 'post',
                data: data
            }).then((res) => {
                localStorage.setItem('_zToken', res.data?.['access_token']);
                this.token = res.data?.['access_token'];
                // useCore().redirect('/');
            }).catch((error) => {
                useCore().setToast({
                    type: 'message',
                    message: error.response.statusText,
                    status: 'error'
                })
            }).finally(() => {
                this.loader = false;
            })
        },
        getUserMe(redirect = false) {
            const token = localStorage.getItem('_zToken');
            if (token && token.trim().length) {
                return Request({
                    url: 'v1/user/me',
                    method: 'get'
                })
                .then((res) => {
                    this.user_me = res.data;
                    this.isUser = true;
                    if (redirect) {
                        useCore().redirect('/');
                    }
                })
                .catch((error) => {
                    const {status, data, message} = error.response;
                    if (status === 403) {
                        localStorage.removeItem('_zToken');
                        window.location.href = '/login';
                    } else {
                        useCore().setToast({
                            type: 'message',
                            status: 'error',
                            message: data && typeof data === "string" ? data : message
                        })
                    }
                })
                .finally(() => {
                    this.loading = false;
                })
            }
            localStorage.removeItem('_zToken');
            window.location.href = '/login';
        },
        setLoading() {
            this.loading = !this.loading;
        }
    }
});
