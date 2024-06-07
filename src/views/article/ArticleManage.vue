<script setup>
import {
    Edit,
    Delete,
    View,
    Star,
    StarFilled
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分类数据模型
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])

//用户搜索时选中的分类id
const categoryId=ref('')

//用户搜索时选中的发布状态
const state=ref('')

//文章列表数据模型
const articles = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

/**
 * 文章相关接口
 */
import {
        articleCategoryListService,
        articleListService,
        deleteArticleService,
        addArticleService,
        updateArticleService
        } from '@/api/article.js'

/**
 * 收藏相关接口
 */
import {
        collectArticleService,
        getCollectionsService,
        cancelCollectService
        } from '@/api/collection.js'

import { ElMessage, ElMessageBox } from 'element-plus'

// 文章分类
const getArticleCategoryList = async () => {
    let result = await articleCategoryListService();

    categorys.value = result.data;
}

getArticleCategoryList();

// 文章列表查询
const getArticleList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null
    }

    let result = await articleListService(params);
    
    articles.value = result.data.items;

    for (let i = 0; i < articles.value.length; i++) {
        let article = articles.value[i];

        for (let j = 0; j < categorys.value.length; j++) {
            if (article.categoryId === categorys.value[j].id) {
                article.categoryName = categorys.value[j].categoryName;
            }
        }
    }
    total.value=result.data.total;
}

// 文章删除
const deleteArticle = async (row) => {
    ElMessageBox.confirm(
    '你确认要删除该文章信息吗?',
    '温馨提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let retult = await deleteArticleService(row.id);
      ElMessage({
        type: 'success',
        message: '删除成功',
      })

      getArticleList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '用户取消删除',
      })
    })
}

//当每页条数发生了变化，调用此函数
getArticleList();

const onSizeChange = (size) => {
    pageSize.value = size;
    getArticleList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    getArticleList();
}

import {Plus} from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false);
//添加表单数据模型
const articleModel = ref({
    id: 0,
    title: '',
    categoryId: '',
    coverImg: '',
    content:'',
    state:''
})

/**
 * 清空文章的数据模型
 */
const clearArticleModel = () => {
    articleModel.value.id = 0,
    articleModel.value.title = '',
    articleModel.value.categoryId = '',
    articleModel.value.coverImg = '',
    articleModel.value.content = '',
    articleModel.value.state = ''
}

/**
 * 添加文章
 * @param clickState
 * @returns {Promise<void>}
 */
const addArticle = async (clickState) => {

    // 文章上传状态
    articleModel.value.state = clickState;

    let result = await addArticleService(articleModel.value);

    ElMessage.success(result.message ? result.message : '添加成功');

    // 关闭抽屉
    visibleDrawer.value = false;

    clearArticleModel();
    getArticleList();
}
const title = ref('');

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore();

/**
 * 上传成功的回调函数
 * @param result
 */
const uploadSuccess = (result) => {
    articleModel.value.coverImg = result.data;
    console.log(result.data);
}

/**
 * 更新文章
 * @returns {Promise<void>}
 */
const updateArticle = async () => {
    let result = await updateArticleService(articleModel.value);

    ElMessage.success(result.message ? result.message : '编辑成功');

    // 关闭抽屉
    visibleDrawer.value = false;

    clearArticleModel();
    getArticleList();
}

// 跳转到详情页面
import { useRouter } from "vue-router";

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

import { useUserInfoStore } from "@/stores/userInfo.js";
var userInfoStore = useUserInfoStore();

//用户id
const userId = userInfoStore.info.id;
/**
 * 收藏文章
 * @param id
 */
const collect = async (articleId) => {
    const result = await collectArticleService(articleId, userId);

    //重新获取收藏数据
    getCollections(userId)

    ElMessage.success(result.message ? result.message : '收藏成功');
}

/**
 * 获取收藏集合
 * @type {Ref<any>}
 */
const collections = ref()
const getCollections = async (userId) => {
    let result = await getCollectionsService(userId);
    collections.value = result.data;
}

/**
 * 判断改文章是否已经被当前用户收藏
 * @param articleId
 * @returns {boolean}
 */
const isCollected = (articleId) => {
    for (const item in collections.value) {
        if (collections.value[item] === articleId) return true;
    }

    return false;
}

/**
 * 取消收藏
 * @param articleId
 * @returns {Promise<void>}
 */
const cancelCollect = async (articleId) => {
    console.log(articleId)
    ElMessageBox.confirm(
        '是否要取消收藏',
        '温馨提醒',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
        let retult = await cancelCollectService(articleId, userId);
        ElMessage({
            type: 'success',
            message: '取消成功',
        })

        getCollections(userId);
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '用户取消操作',
        })
    })
}

//每次访问页面时调用一遍
getCollections(userId)
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
                        v-for="c in categorys" 
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
                <el-button type="primary" @click="getArticleList">搜索</el-button>
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
                    <el-button :icon="isCollected(row.id) ? StarFilled : Star" circle plain type="primary" @click="isCollected(row.id) ? cancelCollect(row.id) : collect(row.id)"></el-button>
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
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
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