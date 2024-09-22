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

/**
 * 喜欢评论
 * @param commentId
 * @param userId
 * @param like
 */
export const likeService = (commentId, userId, like) => {
    request.put('/comment/' + commentId + '/' + userId + '/' + like);
}

/**
 * 根据用户id获取喜欢集合
 * @param userId
 * @returns {Promise<axios.AxiosResponse<Map>>}
 */
export const getLikeService = (userId) => {
    return request.get('/comment/like/' + userId);
}