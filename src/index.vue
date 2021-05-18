<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        absolute
        bottom
        temporary

    >
      <v-sheet
          class="mx-auto"
          max-width="300"
          tile

      >
        <v-list flat>
          <v-subheader>{{ typeofuser }}</v-subheader>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
            >

              <v-list-item-content @click="$router.push(item.url)">
                <v-list-item-title v-text="item.text" ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar
               app
               color="light-blue lighten-1" style="color: white">
      <v-app-bar-nav-icon @click="drawer = !drawer" style="color: white"></v-app-bar-nav-icon>

      <v-toolbar-title>环保应急管理系统</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-row style="padding: 12px">

          <span style="text-align: center;color:white;font-size: small;margin: 10px;font-family: Roboto,sans-serif;">
            {{person.name}}
          </span>
          <v-menu

              offset-y
              open-on-hover
          >
            <template v-slot:activator="{ on, attrs }" >
              <v-btn  v-bind="attrs"
                      height="100%"
                      color="light-blue lighten-1"
                      v-on="on" elevation="0" style="text-align: center;color:white;">
                <v-avatar
                    size="40"
                ><img :src="img">
                </v-avatar>
              </v-btn>

            </template>
            <v-list >
              <v-list-item
                  @click="zhuxiao"
              >
                <v-list-item-title>注销</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-spacer></v-spacer>
          </v-menu>

        </v-row>
      </v-responsive>
    </v-app-bar>

    <v-main>
      <template v-if="flag">
        <v-container class="d-flex justify-center mb-6">
          <v-col>
            <p>
              <br>
              <br>
            </p>
            <v-row style="align-items: center;justify-content: center">
              <v-card width="400px"  elevation="5">

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
                        <v-btn color="light-blue lighten-1" large width="90%" @click="submitForm('ruleForm')&&$router.push(firsturl)" style="color: white">登录</v-btn>
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
      </template >
      <template v-else>
        <router-view></router-view>
      </template>

    </v-main>
  </v-app>
</template>

<script>
import router from "@/router";

function isValidPhone(str) {
  const reg =/[0-9a-zA-Z]/
  return reg.test(str)
}
export default {

  name:'index',
  data () {
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

  return{
    firsturl:'',
    type:'',
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
    },
    flag:true,
    alert11:false,
    message:'',
    typeofuser:'请先登录',
    img:require('./assets/keli.jpg'),
    drawer: null,
    selectedItem: 1,
    person:{
      name:''
    },
    items: [


    ],
    superperson:[
      { text: '人员维护',url:'/renyuan'},
    ],
    gongzuo:[
      { text: '事件维护',url:'/shijian' },
      { text: '物资维护',url:'/wuzi'},
      { text: '城市信息维护',url:'/city' },
      { text: '接报维护',url:'/jiebaowh'},
      { text: '风险企业维护',url:'/qiye' },
      { text: '流程维护',url:'/liucheng'},
    ],
    zhihui:[
      { text: '接报管理（指挥）',url:'/jiebaoglzh' },
      { text: '紧急事件处理',url:'/jinji' },
    ],
    zhuanjia:[
      { text: '接报管理（专家）',url:'/jiebaoglzj' },
    ]
  }

  },
  methods: {
    zhuxiao(){
this.person.name='';
      this.flag=true;
      this.items=[];
      this.typeofuser='请先登录'
      this.$message({
        message: '注销成功',
        type: 'info',
        showClose: true,
      });
      router.push('/index')
    },
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.phone==='1'&&this.ruleForm.checkPass==='111111'){
              this.items=this.superperson;
              this.typeofuser='超级管理员模式'
            this.person.name=1;
              this.flag=false
            router.push('/renyuan')
            this.$message({
              message: '成功登录超级管理员',
              type: 'success',
              showClose: true,
            });
          }
          else if (this.ruleForm.phone==='2'&&this.ruleForm.checkPass==='222222'){
            this.items=this.gongzuo;
            this.typeofuser='工作人员'
            this.person.name=2;
            this.flag=false
            router.push('/shijian')
            this.$message({
              message: '成功登录工作人员',
              type: 'success',
              showClose: true,
            });
          }
          else if (this.ruleForm.phone==='3'&&this.ruleForm.checkPass==='333333'){
            this.items=this.zhihui;
            this.typeofuser='成功登录指挥人员'
            this.person.name=3;
            this.flag=false
            router.push('/jiebaoglzh')
            this.$message({
              message: '注册成功',
              type: 'success',
              showClose: true,
            });
          }
          else if (this.ruleForm.phone==='4'&&this.ruleForm.checkPass==='444444'){
            this.items=this.zhuanjia;
            this.typeofuser='专家人员'
            this.person.name=4;
            this.flag=false
            router.push('/jiebaoglzj')
            this.$message({
              message: '成功登录专家人员',
              type: 'success',
              showClose: true,
            });
          }else{
            this.$message({
              message: '登录失败',
              type: 'error',
              showClose: true,
            });
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>