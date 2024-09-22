import { useUserInfoStore } from "@/stores/userInfo.js";

export default function () {
    /**
     * 用户信息
     * @type {Store<"userInfo", _ExtractStateFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>, _ExtractGettersFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>, _ExtractActionsFromSetupStore<{removeInfo: function(): void, setInfo: function(*): void, info: Ref<UnwrapRef<{}>>}>>}
     */
    let userInfo = useUserInfoStore().info

    return {userInfo}
}