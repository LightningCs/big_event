<script setup>
import {
    Edit,
    Delete,
    View,
    Star,
    StarFilled,
    ChatSquare
} from '@element-plus/icons-vue'
import {Plus} from '@element-plus/icons-vue'
import { useTokenStore } from '@/stores/token';
import { ref } from 'vue'
import { useRouter } from "vue-router";
import useCategory from '@/hook/useCategory.js'
import useArticle from '@/hook/useArticle.js'
import useCollection from '@/hook/useCollection.js'
import useUser from "@/hook/useUser.js";
import '@vueup/vue-quill/dist/vue-quill.snow.css'

let {
    categories, categoryId, state,
} = useCategory();

let {
    articles, pageNum, pageSize, total, articleModel, visibleDrawer,
    getArticlesByPagesAndCategory, deleteArticle, addArticle, updateArticle
} = useArticle();

let {
    getCollections, isCollected, collect, cancelCollect
} = useCollection();

//当每页条数发生了变化，调用此函数
getArticlesByPagesAndCategory();

const onSizeChange = (size) => {
    pageSize.value = size;
    getArticlesByPagesAndCategory();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    getArticlesByPagesAndCategory();
}

const title = ref('');

const tokenStore = useTokenStore();

/**
 * 上传成功的回调函数
 * @param result
 */
const uploadSuccess = (result) => {
    articleModel.value.coverImg = result.data;
    console.log(result.data);
}

const router = useRouter();

/**
 * 获取文章详细信息
 * @param id
 */
function goDetail(id) {
    router.push({
        path: '/article/detail',
        query: {
            id
        }
    })
}

let userInfo = useUser()

//用户id
let userId = userInfo.id;
getCollections(userId);
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true; title = '添加文章'">添加文章</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="文章分类：" style="width: 240px">
                <el-select placeholder="请选择" v-model="categoryId">
                    <el-option
                        v-for="c in categories"
                        :key="c.id"
                        :label="c.categoryName"
                        :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：" style="width: 240px">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getArticlesByPagesAndCategory">搜索</el-button>
                <el-button @click="categoryId = ''; state = ''">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="图片" width="100">
                <img src="@/assets/img/mao.jpg" width="50px" style="border-radius: 5px">
            </el-table-column>
            <el-table-column label="文章标题" width="300" prop="title"></el-table-column>
            <el-table-column label="分类" prop="categoryName"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>   
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button :icon="View" circle plain type="primary" @click="goDetail(row.id)"></el-button>
                    <el-button :icon="Edit" circle plain type="primary" @click="visibleDrawer = true; title = '编辑文章'; articleModel.id = row.id"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteArticle(row)"></el-button>
                    <el-button v-if="isCollected(row.id)" :icon="StarFilled" circle plain type="primary" @click="cancelCollect(row.id)"></el-button>
                    <el-button v-else :icon="Star" circle plain type="primary" @click="collect(row.id)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="articleModel" label-width="100px" >
                <el-form-item label="文章标题" >
                    <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="articleModel.categoryId">
                        <el-option v-for="c in categories" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">

                    <!-- 

                        auto-upload:设置是否自动上传
                        action:服务器接口路径
                        name:上传的文件字段名
                        headers:设置上传请求头 
                        on-success:设置上传成功的请求函数

                     -->

                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/upload" name="file" :headers="{ 'Authorization': tokenStore.token }"
                    :on-success="uploadSuccess">
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章内容">
                    <div class="editor">
                        <quill-editor
                                theme="snow"
                                v-model:content="articleModel.content"
                                contentType="html"
                                >
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title === '添加文章' ? addArticle('已发布') : updateArticle()">确定</el-button>
                    <el-button type="info" v-show="title === '添加文章'" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>