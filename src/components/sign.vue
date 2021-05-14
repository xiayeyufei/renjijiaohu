<template>

  <v-container class="d-flex justify-center mb-6">
    <v-col>
      <p>
        <br>
        <br>
      </p>
      <v-row style="align-items: center;justify-content: center">
        <v-card width="550px"  elevation="5">

          <v-container >
            <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <h2 style="text-align: center ;color: #4ea4dc;border-bottom: #4ea4dc ;border-bottom-style:solid;border-bottom-width: 0.25rem;font-size: 1.6rem;
line-height: 3rem;">
                登录
              </h2>
              <p>
                <br>
              </p>
              <el-form-item  prop="phone" label-width="0px">
                <el-input  v-model="ruleForm.phone" placeholder="请输入账号" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item  prop="checkPass" label-width="0px">
                <el-input type="password" placeholder="请输入密码"  v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <br>
              <el-form-item label-width="0px">
                <v-row style="align-items: center;justify-content: center">
                  <v-btn color="light-blue lighten-3" large width="90%" @click="submitForm('ruleForm')" style="color: white">登录</v-btn>
                </v-row>
              </el-form-item>
            </el-form>
          </v-container>

          <br>
          <br>
        </v-card>
      </v-row>

    </v-col>

  </v-container>


</template>

<script>


import router from "@/router";

function isValidPhone(str) {
  const reg =/[0-9a-zA-Z]/
  return reg.test(str)
}
export default {
  name:'signin',

  data() {

    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      }
      else if (!isValidPhone(value)) {
        callback(new Error('只能数字和字母'));
      } else{
        callback()
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(' 请输入密码'));
      }else if (value.length<6){
        callback(new Error(' 密码小于六位'));
      }

      else {
        callback();
      }
    };
    return {

      ruleForm: {
        phone: '',
        checkPass: '',

      },
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },

        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message({
      //       message: '成功登录',
      //       type: 'success',
      //       showClose: true,
      //     });
      //     this.$router.push("/page")
      //   } else {
      //     this.$message({
      //       message: '登录失败',
      //       type: 'error',
      //       showClose: true,
      //     });
      //     return false;
      //   }
      // });
      let self=this;
      let isSuccess=false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
              .post(BaseServeIP+'/login',{
                id:self.phone,
                password:self.checkPass,
              }).then(function (response) {
            isSuccess=response.data.success;
            if (isSuccess==0)
            {
              // this.$message({
              //   message: '注册成功',
              //   type: 'success',
              //   showClose: true,
              // });
              alert("登录成功");
              this.$router.push("/page")
            } else if(isSuccess==1){
              // this.$message({
              //   message: '注册失败',
              //   type: 'error',
              //   showClose: true,
              // });
              // return false;
              alert("账号不存在");
            } else if(isSuccess==2){
              // this.$message({
              //   message: '注册失败',
              //   type: 'error',
              //   showClose: true,
              // });
              // return false;
              alert("密码错误");
            }
            return false;
          });



        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

}
</script>

<style scoped>
.el-form{
  padding-top: 3rem;
  padding-right: 7rem;
  padding-left: 7rem;
}

</style>