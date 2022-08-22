
import axiosInstance from '../libs/axios'

export const login = (username: String, password: String) => {
    return new Promise((resolve: Function, reject: Function) => {
        axiosInstance.post('/auth', {
            username, 
            password
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const logout = () => {
    localStorage.removeItem('token')
    delete axiosInstance.defaults.headers.common.Authorization
}
