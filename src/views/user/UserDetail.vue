<script setup>
import useUser from "@/hook/useUser.js";
import useArticle from "@/hook/useArticle.js";
import avatar from "@/assets/default.png";
import {ref, watchEffect} from "vue";
import useFriend from "@/hook/useSociety.js";

let {userDetail,
    getUserDetail
} = useUser();

let {individualArticles,
    getIndividualArticle
} = useArticle();

let {interestList, fansList,
    interest, getInterest, getFans
} = useFriend();

/**
 * 显示内容
 * @type {Ref<UnwrapRef<*[]>>}
 */
let dataList = ref([]);

/**
 * 是否可见
 * @type {Ref<UnwrapRef<boolean>>}
 */
let visible = ref(false);

/**
 * 标题
 * @type {Ref<UnwrapRef<string>>}
 */
let title = ref('');
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
 * 显示内容函数，根据传入的标题来决定显示的内容
 * @param t
 */
function showInfo(t) {
    if (t === '关注') {
       getInterest(userDetail.value.id);
       dataList.value = interestList.value;
    } else {
        getFans(userDetail.value.id);
        dataList.value = fansList.value;
    }
    title.value = t;
    visible.value = true;
}

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
    <el-button @click="interest(userDetail.id)" size="large">＋</el-button>
    <el-button @click="showInfo('关注')" size="large">关注</el-button>
    <el-button @click="showInfo('粉丝')" size="large">粉丝</el-button>
    发布的文章：
    <el-card v-for="article in individualArticles">
        <!--文章头像-->
        <span class="range">
            <el-image :src="article.coverImg" style="width: 75px; height: 75px; border-radius: 5px;" />
        </span>
        <span class="range space">
            <el-link :underline="false" type="info" :href="'/article/detail?id=' + article.articleId" >{{ article.title }}</el-link>
            <br>
            <el-avatar :src="article.userPic ? article.userPic : avatar" size="small" style="margin: 5px 5px 0;" />
            <el-link :underline="false" type="info" :href="'/user/detail?userId=' + article.userId" >{{ article.createUsername }}</el-link>
            <br>
            <el-text type="info" size="small">{{article.createTime}}</el-text>
        </span>
    </el-card>
    <el-button @click="pageSize += 5" size="large">获取更多文章</el-button>
    <!--  显示列表信息...  -->
</template>

<style scoped>

</style>