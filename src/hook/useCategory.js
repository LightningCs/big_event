import {ElMessage, ElMessageBox} from "element-plus";
import {
    addCategoryService,
    articleCategoryListService,
    deleteCategoryService,
    updateCategoryService
} from "@/api/article.js";
import {ref} from "vue";

export default function () {
    /**
     * 分类集合
     * @type {Ref<UnwrapRef<*[]>>}
     */
    let categories = ref([]);

    /**
     * 显示
     * @type {Ref<UnwrapRef<boolean>>}
     */
    let dialogVisible = ref(false)

    /**
     * 标题
     * @type {Ref<UnwrapRef<string>>}
     */
    let title = ref('');

    /**
     * 分类数据模型
     * @type {Ref<UnwrapRef<{categoryAlias: string, categoryName: string}>>}
     */
    let categoryModel = ref({
        categoryName: '',
        categoryAlias: ''
    });

    /**
     * 用户搜索时选中的分类id
     * @type {Ref<UnwrapRef<string>>}
     */
    let categoryId = ref('')

    /**
     * 用户搜索是选中的状态
     * @type {Ref<UnwrapRef<string>>}
     */
    let state=ref('')

    /**
     * 获取所有分类
     * @returns {Promise<void>}
     */
    const getAllCategory = async () => {
        let result = await articleCategoryListService();
        categories.value = result.data;
    }

    /**
     * 添加分类
     * @returns {Promise<void>}
     */
    async function addCategory () {
        let result = await addCategoryService(categoryModel.value);
        ElMessage.success(result.message ? result.message : '添加成功');

        await getAllCategory();
        dialogVisible.value = false;
    }

    /**
     * 删除分类
     * @param row
     * @returns {Promise<void>}
     */
    const deleteCategory = async (row) => {
        ElMessageBox.confirm(
            '你确认要删除该分类信息吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                let retult = await deleteCategoryService(row.id);
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })

                await getAllCategory();
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '用户取消删除',
                })
            })
    }

    /**
     * 清空数据模型
     */
    const clearDate = () => {
        categoryModel.value.categoryName = '';
        categoryModel.value.categoryAlias = '';
    }

    /**
     * 更新分类
     * @returns {Promise<void>}
     */
    const updateCategory = async (dialogVisible) => {
        let result = await updateCategoryService(categoryModel.value);
        ElMessage.success(result.message ? result.message : '修改成功');

        await getAllCategory();
        dialogVisible.value = false;
    }

    return {categories, title, categoryModel, dialogVisible, categoryId, state,
        getAllCategory, addCategory, deleteCategory, clearDate, updateCategory}
}