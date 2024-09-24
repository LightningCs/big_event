import { useUserInfoStore } from "@/stores/userInfo.js";
import {ref} from "vue";
import {getUserDetailService} from "@/api/user.js";

export default function () {
    /**
     * 用户信息
     * @type {Store<"userInfo", _ExtractStateFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>, _ExtractGettersFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>, _ExtractActionsFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>>}
     */
    let userInfo = useUserInfoStore().info

    /**
     * 用户详细信息
     * @type {Ref<UnwrapRef<{}>>}
     */
    let userDetail = ref({})

    /**
     * 获取用户详细信息
     * @param userId
     * @returns {Promise<void>}
     */
    async function getUserDetail(userId) {
        let result = await getUserDetailService(userId);
        userDetail.value = result.data;
    }

    return {userInfo, userDetail,
        getUserDetail
    }
}