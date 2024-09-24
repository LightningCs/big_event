import request from '../utils/request.js'

export const userRegisterService = (registerData) => {

    var params = new URLSearchParams();

    for (let key in registerData) {
        params.append(key, registerData[key]);
    }

    return request.post('/user/register', params);
}

export const loginService = (loginData) => {

    var params = new URLSearchParams();

    for (let key in loginData) {
        params.append(key, loginData[key]);
    }

    return request.post('/user/login', params);
}

// 获取用户详细信息
export const getUserInfoService = () => {
    return request.get('/user/userInfo');
}

// 更新用户信息
export const updateUserInfoService = (userInfo) => {
    return request.put('/user/update', userInfo);
}

// 更新密码
export const updateUserPasswordService = (pwd) => {
    return request.patch('/user/updatePwd', pwd);
}

export const getUserDetailService = (userId) => {
    return request.get('/user?userId=' + userId);
}