<script setup>
import { articleService } from "@/api/article.js";
import { getCommentsByArticleIdService, publishCommentService } from "@/api/comment.js";
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import {ElMessage} from "element-plus";
import avatar from "@/assets/default.png";
import {} from "@element-plus/icons-vue";

const article = ref({})

const userInfoStore = useUserInfoStore();

/**
 * 文章id
 * @type {Prettify<Readonly<{[key in string]?: any}>>}
 */
const props = defineProps(['id'])

/**
 * 根据文章id获取文章
 * @returns {Promise<void>}
 */
const getArticle = async () => {
    let result = await articleService(props.id);
    article.value = result.data;
}

/**
 * 评论区抽屉
 * @type {Ref<UnwrapRef<boolean>>}
 */
const commentDrawer = ref(false)

/**
 * 评论内容
 * @type {Ref<UnwrapRef<string>>}
 */
const commentModel = ref({
    content: '',
    articleId: props.id,
    userId: userInfoStore.info.id
})

/**
 * 评论集合
 * @type {Ref<UnwrapRef<*[]>>}
 */
const commentList = ref([])

function clsCommentModel () {
    commentModel.value = {
        content: '',
        articleId: props.id,
        userId: userInfoStore.info.id
    }
}

/**
 * 通过文章id获取所有评论
 * @returns {Promise<void>}
 */
const getCommentsByArticleId = async () => {
    let result = await getCommentsByArticleIdService(props.id);
    commentList.value = result.data;
}

/**
 * 发表评论
 */
async function publish ()  {
    let result = await publishCommentService(commentModel.value);

    ElMessage.success(result.message ? result.message : '发表成功');

    await getCommentsByArticleId();

    clsCommentModel();
}

/**
 * 比较时间
 * @param time
 * @returns {*|string}
 */
function computeTime (time) {
    const value = parseInt((new Date() - new Date(time)) / 1000);

    if (value < 60) {
        return value + '秒前'
    } else if (value < 60*60) {
        return parseInt(value / 60) + '分钟前'
    } else if (value < 60*60*24) {
        return parseInt(value / 3600) + '小时前'
    } else if (value < 60*60*24*3) {
        return parseInt(value / 86400) + '天前'
    } else return time
}

getArticle();
getCommentsByArticleId();
</script>

<template>
    <el-card class="page-container">
        <h1 class="content">{{ article.title }}</h1>
        <p class="litter content">{{ article.createTime }}</p>
        <el-divider />
        <p v-html="article.content" />
        <el-divider />
    </el-card>
    <el-button type="primary" style="margin-left: 16px" @click="commentDrawer = true">
        评论区
    </el-button>

    <!--  评论区  -->
    <el-drawer v-model="commentDrawer" :direction="'rtl'">
        <template #header>
            <h4>评论区</h4>
        </template>
        <template #default>
            <el-space v-show="commentList.length !== 0" direction="vertical">
                <el-card v-for="comment in commentList" style="width: 404px">
                    <div>
                        <el-avatar :src="comment.userPic ? comment.userPic : avatar" size="small"/>
                        <el-link :underline="false" type="info" :href="'/user/detail?userId=' + comment.userId" >{{ comment.username }}</el-link>
                    </div>
                    <div>
                        <span>
                            <el-text>{{comment.content}}</el-text>
                        </span>
                    </div>
                    <div>
                        <span>
                            <el-text type="info" size="small">{{computeTime(comment.createTime)}}</el-text>
                        </span>
                        <span style="float: right;">
                            <span style="margin-right: 5px">
                                <el-button link size="small" @click="like()">❤️</el-button>
                                <el-text type="info" size="small">-1</el-text>
                            </span>
                            <span>
                                <el-button link size="small" @click="dislike()">💔</el-button>
                            </span>
                        </span>
                    </div>
                </el-card>
            </el-space>
            <el-divider content-position="center" v-show="commentList.length !== 0">
                <el-text type="info" size="small">到底了</el-text></el-divider>
            <el-empty v-show="commentList.length === 0" description="快来抢沙发吧~" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-affix position="bottom" :offset="20">
                    <el-card>
                        <el-input
                            v-model="commentModel.content"
                            type="textarea"
                            placeholder="此处输入评论"
                        ></el-input>
                        <el-divider content-position="right">
                            <el-button type="primary" @click="publish()">发表评论</el-button>
                        </el-divider>
                    </el-card>
                </el-affix>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
.content {
    text-align: center;
}

.litter {
    color: lightgray;
}
</style>