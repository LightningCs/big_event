import request from "@/utils/request.js";

/**
 * 根据文章id获取评论信息
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCommentsByArticleIdService = (id) => {
    return request.get('/comment?id=' + id);
}

/**
 * 发表评论
 * @param data
 */
export const publishCommentService = (data) => {
    return request.post('/comment/publish', data);
}