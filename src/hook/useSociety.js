import {interestService, getInterestService, getFansService} from "@/api/society.js";
import {ref} from "vue";

export default function () {

    /**
     * 关注列表
     * @type {Ref<UnwrapRef<*[]>>}
     */
    let interestList = ref([]);

    /**
     * 粉丝列表
     * @type {Ref<UnwrapRef<*[]>>}
     */
    let fansList = ref([]);

    /**
     * 关注
     * @param userId
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    function interest(userId) {
        return interestService(userId);
    }

    /**
     * 获取用户关注列表
     * @param userId
     * @returns {*}
     */
    async function getInterest(userId) {
        let result = await getInterestService(userId);
        interestList.value = result.data;
    }

    /**
     * 获取粉丝列表
     * @param userId
     * @returns {Promise<void>}
     */
    async function getFans(userId) {
        let result = await getFansService(userId);
        fansList.value = result.data;
    }

    return {interestList, fansList,
        interest, getInterest, getFans
    }
}