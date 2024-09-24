<script setup>
import avatar from "@/assets/default.png";
import useArticle from "@/hook/useArticle.js";
import useComment from "@/hook/useComment.js";
import useUser from "@/hook/useUser.js";

let {commentDrawer, commentList, commentModel,
    getCommentsByArticleId, publish, computeTime, initCommentModel, like, getLike, judgeStatus
} = useComment();

let {article,
    getArticle
} = useArticle();

/**
 * 文章id
 * @type {Prettify<Readonly<{[key in string]?: any}>>}
 */
const props = defineProps(['id'])

/**
 * 改变喜欢状态
 * @param id
 * @param l
 * @returns {*}
 */
function clickFun(id, l) {
    return like(id, props.id, judgeStatus(id, l));
}

initCommentModel(props.id);
getArticle(props.id);
getCommentsByArticleId(props.id);
getLike(props.id);
</script>

<template>
    <el-card class="page-container">
        <h1 class="content">{{ article.title }}</h1>
        <p class="litter content">{{ article.createTime }}</p>
        <el-divider />
        <p v-html="article.content" />
        <el-divider />
    </el-card>
    <el-button type="primary" style="margin-left: 16px" @click="commentModel.responseId = null; commentDrawer = true">
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
                        <el-link :underline="false" type="info" :href="comment.userId === useUser().userInfo.id ? '/user/info' : '/user/detail?userId=' + comment.userId" >{{ comment.username }}</el-link>
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
                                <el-button link size="small" @click="clickFun(comment.id, 'like')">❤️</el-button>
                                <el-text type="info" size="small">{{ comment.like }}</el-text>
                            </span>
                            <span>
                                <el-button link size="small" @click="clickFun(comment.id, 'dislike')">💔</el-button>
                            </span>
                            <span>
                                <el-icon>
                                    <el-button link size="small" @click="commentModel.responseId = comment.userId">💬</el-button>
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </el-card>
            </el-space>
            <el-divider content-position="center" v-show="commentList.length !== 0">
                <el-text type="info" size="small">到底了</el-text>
            </el-divider>
            <el-empty v-show="commentList.length === 0" description="快来抢沙发吧~" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-affix position="bottom" :offset="20">
                    <el-card>
                        <el-input
                            v-model="commentModel.content"
                            type="textarea"
                            :placeholder="commentModel.responseId === null ? '此处输入评论' : '回复'"
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