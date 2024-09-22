import {ref} from "vue";
import {getCommentsByArticleIdService, publishCommentService, likeService, getLikeService} from "@/api/comment.js";
import {ElMessage} from "element-plus";
import useUser from "@/hook/useUser.js";

export default function () {
    let userId = useUser().userInfo.id

    /**
     * 评论区抽屉
     * @type {Ref<UnwrapRef<boolean>>}
     */
    const commentDrawer = ref(false);

    /**
     * 评论集合
     * @type {Ref<UnwrapRef<*[]>>}
     */
    const commentList = ref([])

    /**
     * 喜欢集合
     * @type {Ref<Map>}
     */
    let likeList = ref();

    /**
     * 评论模型
     * @type {Ref<UnwrapRef<{articleId: null, userId: null, content: string}>>}
     */
    let commentModel = ref({
        content: '',
        articleId: null,
        userId: null,
        responseId: null
    })

    /**
     * 初始化评论模型
     * @param articleId
     * @returns {{articleId, userId, content: string}}
     */
    function initCommentModel (articleId) {
        commentModel.value.articleId = articleId;
        commentModel.value.userId = userId;
    }

    /**
     * 清空评论模型
     */
    function clsCommentModel () {
        commentModel.value = {
            content: '',
            articleId: commentModel.value.articleId,
            userId: commentModel.value.userId,
            responseId: null
        }
    }

    /**
     * 发表评论
     */
    async function publish ()  {
        let result = await publishCommentService(commentModel.value);

        ElMessage.success(result.message ? result.message : '发表成功');

        await getCommentsByArticleId(commentModel.value.articleId);

        clsCommentModel();
    }

    /**
     * 喜欢
     * @param commentId
     * @param articleId
     * @param like
     */
    async function like(commentId, articleId, like) {
        likeService(commentId, userId, like);
        setTimeout(() => {
        //     间隔
        }, 500)
        await getLike(articleId);
    }

    /**
     * 通过文章id获取所有评论
     * @returns {Promise<void>}
     */
    async function getCommentsByArticleId (articleId) {
        let result = await getCommentsByArticleIdService(articleId);
        commentList.value = result.data;
    }

    /**
     * 获取喜欢集合
     * @returns {Promise<void>}
     */
    async function getLike(articleId) {
        let result = await getLikeService(userId);
        likeList.value = new Map(Object.entries(result.data));

        //更新评论集合
        await getCommentsByArticleId(articleId);
    }

    /**
     * 比较时间
     * @param time
     * @returns {*|string}
     */
    function computeTime (time) {
        const value = parseInt((new Date() - new Date(time)) / 1000);

        if (value === 0) {
            return '刚刚'
        } else if (value < 60) {
            return value + '秒前'
        } else if (value < 60*60) {
            return parseInt(value / 60) + '分钟前'
        } else if (value < 60*60*24) {
            return parseInt(value / 3600) + '小时前'
        } else if (value < 60*60*24*3) {
            return parseInt(value / 86400) + '天前'
        } else return time
    }

    /**
     * 判断执行方式
     * @param commentId
     * @param like
     * @returns {number}
     */
    function judgeStatus(commentId, like) {
        if (like === 'like') {
            if (likeList.value.get(commentId.toString()) === 0) return 1;
            if (likeList.value.get(commentId.toString()) === 1) return 3;
            return 4;
        } else {
            if (likeList.value.get(commentId.toString()) === 0) return 2;
            if (likeList.value.get(commentId.toString()) === 1) return 5;
            return 6;
        }
    }


    return {commentDrawer, commentList, commentModel, likeList,
        getCommentsByArticleId, publish, computeTime, initCommentModel, like, getLike, judgeStatus}
}