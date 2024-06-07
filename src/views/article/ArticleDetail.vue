<script setup>
import { articleService } from "@/api/article.js";
import { ref } from "vue";

const article = ref({})

const props = defineProps(['id'])

//根据id获取文章
const getArticle = async () => {
    let result = await articleService(props.id);
    article.value = result.data;
}

getArticle()

//评论内容
const comment = ref('')

</script>

<template>
    <el-card class="page-container">
        <h1 class="content">{{ article.title }}</h1>
        <p class="litter content">{{ article.createTime }}</p>
        <el-divider />
        <p v-html="article.content" />
        <el-divider />
    </el-card>
    <el-affix position="bottom" :offset="20">
        <el-card>
            <el-divider content-position="left">发表评论：</el-divider>
                <el-input
                    v-model="comment"
                    type="textarea"
                    placeholder="此处输入评论"
                ></el-input>
                <el-divider content-position="right">
                <el-button type="primary">发表</el-button>
            </el-divider>
        </el-card>
    </el-affix>
    <!--  评论区  -->
    <el-space v-show="false">
        <el-card>

        </el-card>
    </el-space>
</template>

<style scoped>
.content {
    text-align: center;
}

.litter {
    color: lightgray;
}

.comment_div {

}
</style>