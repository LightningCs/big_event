import request from "@/utils/request.js";

/**
 * 关注接口
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const interestService = (userId) => {
    return request.post('/society/interest?userId=' + userId);
}

/**
 * 获取关注用户集合接口
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getInterestService = (userId) => {
    return request.get('/society/interest/' + userId);
}

/**
 * 获取粉丝集合接口
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getFansService = (userId) => {
    return request.get('/society/fans/' + userId);
}