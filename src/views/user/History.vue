<script setup>
import avatar from "@/assets/default.png";
import { getHistoriesService } from "@/api/history.js";
import {useUserInfoStore} from "@/stores/userInfo.js";
import {ref} from "vue";

/**
 * 获取用户信息
 */
var userStore = new useUserInfoStore();

/**
 * 历史记录
 * @type {Ref<UnwrapRef<*[]>>}
 */
const histories = ref([]);

/**
 * 获取该用户的所有历史记录
 */
const getHistories = async () => {
    let result = await getHistoriesService(userStore.info.id);
    histories.value = result.data;
}

getHistories();
</script>
<template>
    <el-card>
        <template #header>
            <div>
                <span>历史记录</span>
            </div>
        </template>
        <el-space v-show="histories.length !== 0" direction="vertical">
            <el-card v-for="history in histories" style="width: 1205px; padding-bottom: 1%">
                <!--文章头像-->
                <span class="range">
                <el-image :src="history.coverImg" style="width: 75px; height: 75px; border-radius: 5px;" />
            </span>
                <span class="range space">
                <el-link :underline="false" type="info" :href="'/article/detail?id=' + history.articleId" >{{ history.title }}</el-link>
                <br>
                <el-avatar :src="history.userPic ? history.userPic : avatar" size="small" style="margin: 5px 5px 0;" />
                <el-link :underline="false" type="info" :href="'/user/detail?userId=' + history.userId" >{{ history.createUsername }}</el-link>
                <br>
                <el-text type="info" size="small">{{history.createTime}}</el-text>
            </span>
            </el-card>
        </el-space>
        <el-divider content-position="center" v-show="histories.length !== 0" />
        <el-empty v-show="histories.length === 0" description="未浏览过文章" />
    </el-card>
</template>
<style lang="scss" scoped>
.range {
    float: left;
}

.space {
    margin-left: 10px;
}
</style>