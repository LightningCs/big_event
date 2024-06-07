import request from "@/utils/request.js";

/**
 * 收藏文章
 * @param articleId
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const collectArticleService = (articleId, userId) => {
    return request.post('/collect', {
        articleId,
        userId
    });
}

/**
 * 获取该用户收藏的所有文章
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCollectionsService = (userId) => {
    return request.get('/collect?userId=' + userId);
}

/**
 * 取消收藏
 * @param articleId
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const cancelCollectService = (articleId, userId) => {
    return request.delete('/collect', {
        data: {
            articleId,
            userId
        }
    });
}