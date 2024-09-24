<script setup>
import useUser from "@/hook/useUser.js";
import useArticle from "@/hook/useArticle.js";
import avatar from "@/assets/default.png";
import {ref, watchEffect} from "vue";

let {userDetail,
    getUserDetail
} = useUser();

let {individualArticles,
    getIndividualArticle
} = useArticle();

/**
 * 用户id
 * @type {Prettify<Readonly<{[key in string]?: any}>>}
 */
let props = defineProps(['userId']);

/**
 * 文章数量，默认为5
 * @type {Ref<UnwrapRef<number>>}
 */
let pageSize = ref(5)

/**
 * 监听pageSize的变化
 */
watchEffect(() => {
    console.log(props.userId, pageSize.value)
    getIndividualArticle(props.userId, pageSize.value)
})

getUserDetail(props.userId);
</script>

<template>
  <h1>用户详细页面</h1>
  用户名：<el-text>{{userDetail.username}}</el-text>
  邮箱：<el-text>{{userDetail.email}}</el-text>
  头像：<el-avatar :src="userDetail.userPic ? userDetail.userPic : avatar" size="small"/>
  发布的文章：<el-card v-for="article in individualArticles"></el-card>
  <el-button @click="pageSize += 5" size="large">获取更多文章</el-button>
    <el-button @click="interest(userDetail.id)" size="large">关注</el-button>
</template>

<style scoped>

</style>