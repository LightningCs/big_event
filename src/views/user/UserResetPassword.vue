<script setup>
import { ref } from 'vue'

import { ElMessage } from 'element-plus';

const pwd = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})

const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('error'))
    } else if (value !== pwd.value.new_pwd) {
        callback(new Error('error'))
    } else callback()
}

const rules = {
    old_pwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        {min:5, max:16, message:'密码长度为5~16', trigger:'blur'}
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {min:5, max:16, message:'密码长度为5~16', trigger:'blur'}
    ],
    re_pwd: [
        {validator: checkRePassword, trigger:'blur'}
    ]
}

// 更新密码
import { updateUserPasswordService } from '@/api/user.js'

const updateUserPassword = async () => {
    let result = await updateUserPasswordService(pwd.value);
    ElMessage.success(result.message? result.message:'修改成功');
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="pwd" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="旧密码" prop="old_pwd">
                        <el-input v-model="pwd.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="pwd.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="再次确认" prop="re_pwd">
                        <el-input v-model="pwd.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>