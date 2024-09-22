import {getHistoriesService, updateHistoryService} from "@/api/history.js";
import {ref} from "vue";
import useUser from "@/hook/useUser.js";

export default function () {
    let {userInfo} = useUser()

    /**
     * 历史记录集合
     * @type {Ref<UnwrapRef<*[]>>}
     */
    const histories = ref([]);

    /**
     * 根据用户id获取历史记录
     * @returns {Promise<void>}
     */
    async function getHistories() {
        let result = await getHistoriesService(userInfo.id);
        histories.value = result.data;
    }

    /**
     * 更新历史记录
     * @param result
     */
    function updateHistory(result) {
        updateHistoryService({
            articleId: result.id,
            userId: userInfo.id,
            createUser: result.createUser
        });
    }

    return {histories,
        getHistories, updateHistory}
}