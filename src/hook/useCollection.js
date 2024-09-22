import {ref} from "vue";
import {cancelCollectService, collectArticleService, getCollectionsService} from "@/api/collection.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useUser from "@/hook/useUser.js";

export default function () {
    let {userInfo} = useUser()

    let userId = userInfo.id

    /**
     * 获取收藏集合
     * @type {Ref<any>}
     */
    const collections = ref([])

    /**
     * 收藏文章
     * @param articleId
     */
    async function collect(articleId) {
        const result = await collectArticleService(articleId, userId);

        //重新获取收藏数据
        await getCollections(userId)

        ElMessage.success(result.message ? result.message : '收藏成功');
    }


    /**
     * 取消收藏
     * @param articleId
     * @returns {Promise<void>}
     */
    const cancelCollect = async (articleId) => {
        console.log("删除："  + articleId)
        ElMessageBox.confirm(
            '是否要取消收藏',
            '温馨提醒',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                let retult = await cancelCollectService(articleId, userId);
                ElMessage({
                    type: 'success',
                    message: '取消成功',
                })

                await getCollections(userId);
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '用户取消操作',
                })
            })
    }

    /**
     * 获取集合
     * @param userId
     * @returns {Promise<void>}
     */
    async function getCollections() {
        console.log(userId)
        let result = await getCollectionsService(userId);
        collections.value = result.data;
    }

    /**
     * 判断改文章是否已经被当前用户收藏
     * @param articleId
     * @returns {boolean}
     */
    const isCollected = (articleId) => {
        for (const item in collections.value) {
            if (collections.value[item] === articleId) return true;
        }

        return false;
    }

    return {collections,
        getCollections, isCollected, collect, cancelCollect}
}