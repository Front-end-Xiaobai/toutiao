<template>
  <div class="login-container">
    <el-form  class="login-from"  :model="user" :rules="formRules" ref="login-form">
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码">
        </el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login_btn" :loading="loginLoading" type="primary" @click="onLoginIn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  // import request  from "../../utils/request";
  import {login} from '../../api/user'

  export default {
    name: 'LoginIndex',
    data () {
      return {
        user: {
          mobile: '13911111111',
          code: '246810',
          agree :false,
        },
        // checked: false,
        loginLoading: false,
        formRules: {
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'change' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' },
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'change' },
            {pattern: /^\d{6}$/,message: '请输入正确的验证码格式'}
          ],
          agree:[
            {
              validator: (rule,value,callback)=>{
                if (value){
                  callback()
                }else {
                  callback(new Error('请同意用户协议'))
                }
              } ,
              message: '请勾选用户协议',
              trigger: 'change' },
          ]
        }
      }
    },
    methods: {
      login(){
        login(this.user).then(res =>{
          this.loginLoading = false

          this.$message({
            message: '登录成功',
            type :'success'
          })

          window.localStorage.setItem('user',JSON.stringify(res.data.data))
          // console.log(res.data.data)
          // console.log(res)
          this.$router.push({
            name: 'layout',
          })
        }).catch(err => {
          this.$message.error('验证码错误')
          this.loginLoading = false
        })
      },
      onLoginIn () {
        // this.loginLoading = true
        //接受账号密码
        const user = this.user
        //验证
        this.$refs['login-form'].validate((valid,err) =>{
          if (!valid){
            return
          }
          //验证通过
          this.login()
        })
      }
    }
  }
</script>

<style scoped>
  .login-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("./touxiang.png") no-repeat;
    background-size: cover;
  }
  .login-container .login-from{
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
  }
  .login_btn {
    width: 100%;
  }
</style>
