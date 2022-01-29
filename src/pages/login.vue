<template>
  <el-form :model="ruleForm" :rules="rules" ref="form">
    <el-form-item label="用户名" prop="username">
        <input v-focus/>
      <el-input v-model="ruleForm.username"/>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import router from "../router";

const form = ref("form");
let ruleForm = reactive({ username: "", pwd: "" });
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在3到5个字符", trigger: "blur" },
  ],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

function handleLogin() {
  form.value.validate((valid) => {
    console.log("form value:", form.value);
    if (valid) {
      router.replace("/");
    } else {
      message({ message: "登录失败", type: "error" });
    }
  });
}

function resetForm() {
  form.value.resetFields();
}
</script>
