import request from '@/utils/request.js'

// 文章分类列表查询
export const articleCategoryListService = ()=>{
    // const tokenStore = useTokenStore();
    // return request.get('/category', {headers: {'Authorization': tokenStore.token}});
    return request.get('/category');
}

// 文章分类添加
export const addCategoryService = (categoryData)=>{
    return request.post('/category', categoryData);
}

// 文章分类更新
export const updateCategoryService = (categoryData)=>{
    return request.put('/category', categoryData);
}

// 文章分类删除
export const deleteCategoryService = (id) => {
    return request.delete('/category?id=' + id);
}

// 文章列表查询
export const articleListService = (params) => {
    return request.get('/article', {params: params});
}

// 文章删除
export const deleteArticleService = (id) => {
    return request.delete('/article?id=' + id);
}

// 文章添加
export const addArticleService = (articleData) => {
    return request.post('/article', articleData);
}

// 文章编辑
export const updateArticleService = (articleData) => {
    return request.put('/article', articleData);
}

// 根据文章id查询
export const articleService = (id) => {
    return request.get('/article/detail?id=' + id);
}

export const getIndividualArticleService = (params) => {
    return request.get('/article/individual', {params: params});
}
