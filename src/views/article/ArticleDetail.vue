<script setup>
import { articleService } from "@/api/article.js";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = new useRoute();

const article = ref({})

//根据id获取文章
const getArticle = async () => {
   let result = await articleService(route.query.id);

   article.value = result.data;
}

getArticle()

</script>

<template>
    <el-card class="page-container">
        <h1 class="content">{{ article.title }}</h1>
        <p class="litter content bottom">{{ article.createTime }}</p>
        <p v-html="article.content" />
    </el-card>
</template>

<style scoped>
.content {
    text-align: center;
}

.bottom {
    border-bottom: 1px lightgray solid;
    padding: 10px;
}

.litter {
    color: lightgray;
}
</style>