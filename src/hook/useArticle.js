import {ref} from "vue";
import {
    addArticleService,
    articleListService,
    articleService,
    deleteArticleService,
    updateArticleService
} from "@/api/article.js";
import useHistory from "@/hook/useHistory.js";
import useCategory from "@/hook/useCategory.js";
import {ElMessage, ElMessageBox} from "element-plus";

export default function () {
    /**
     * 文章
     * @type {Ref<UnwrapRef<{}>>}
     */
    let article = ref({})

    /**
     * 文章集合
     * @type {Ref<UnwrapRef<*[]>>}
     */
    let articles = ref([])

    /**
     * 当前页
     * @type {Ref<UnwrapRef<number>>}
     */
    let pageNum = ref(1)

    /**
     * 总条数
     * @type {Ref<UnwrapRef<number>>}
     */
    let total = ref(20)

    /**
     * 每页条数
     * @type {Ref<UnwrapRef<number>>}
     */
    let pageSize = ref(3)

    /**
     * 文章数据模型
     * @type {Ref<UnwrapRef<{coverImg: string, id: number, state: string, title: string, categoryId: string, content: string}>>}
     */
    let articleModel = ref({
        id: 0,
        title: '',
        categoryId: '',
        coverImg: '',
        content:'',
        state:''
    })

    /**
     * 控制是否显示
     * @type {Ref<UnwrapRef<boolean>>}
     */
    const visibleDrawer = ref(false);

    let {updateHistory} = useHistory()
    let {categoryId, state, categories,
        getAllCategory
    } = useCategory()

    /**
     * 根据文章id获取文章
     * @returns {Promise<void>}
     */
    async function getArticle(articleId) {
        let result = await articleService(articleId);
        article.value = result.data;
        updateHistory(result.data);
    }

    /**
     * 分类分页获取文章
     * @returns {Promise<void>}
     */
    async function getArticlesByPagesAndCategory() {
        let params = {
            pageNum: pageNum.value,
            pageSize: pageSize.value,
            categoryId: categoryId.value ? categoryId.value : null,
            state: state.value ? state.value : null
        }

        let result = await articleListService(params);

        articles.value = result.data.items;

        await getAllCategory();

        for (let i = 0; i < articles.value.length; i++) {
            let article = articles.value[i];

            for (let j = 0; j < categories.value.length; j++) {
                if (article.categoryId === categories.value[j].id) {
                    article.categoryName = categories.value[j].categoryName;
                }
            }
        }
        total.value=result.data.total;
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
        await getArticlesByPagesAndCategory();
    }

    /**
     * 删除文章
     * @param row
     * @returns {Promise<void>}
     */
    async function deleteArticle(row) {
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

                await getArticlesByPagesAndCategory();
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '用户取消删除',
                })
            })
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
        await getArticlesByPagesAndCategory();
    }

    /**
     * 清空文章的数据模型
     */
    function clearArticleModel() {
        articleModel.value.id = 0,
            articleModel.value.title = '',
            articleModel.value.categoryId = '',
            articleModel.value.coverImg = '',
            articleModel.value.content = '',
            articleModel.value.state = ''
    }

    return {article, articles, pageNum, pageSize, total, articleModel, visibleDrawer,
        getArticle, getArticlesByPagesAndCategory, deleteArticle, addArticle, updateArticle}
}