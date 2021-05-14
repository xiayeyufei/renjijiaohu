<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
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
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content @click="$router.push(item.url)">
                <v-list-item-title v-text="item.text" ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>环保应急管理系统</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-row style="padding: 12px">

          <span style="text-align: center;color:black;font-size: small;margin: 10px;font-family: Roboto,sans-serif;color: rgba(0,0,0,.6) !important">
            {{person.name}}
          </span>
          <v-menu

              offset-y
              open-on-hover
          >
            <template v-slot:activator="{ on, attrs }" >
              <v-btn  v-bind="attrs"
                      height="100%"
                      v-on="on" elevation="0" style="text-align: center;color:white;" @click="$router.push('/login')">
                <v-avatar
                    size="40"
                ><img :src="img">
                </v-avatar>
              </v-btn>

            </template>
            <v-list >
              <v-list-item
                  @click="$router.push('/userspace')"
              >
                <v-list-item-title>个人中心</v-list-item-title>
              </v-list-item>
              <v-list-item
                  @click="$router.push('/sign')"
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name:'index',
  data: () => ({
    typeofuser:'专家模式',
    img:require('./assets/keli.jpg'),
    drawer: null,
    selectedItem: 1,
    person:{
      name:'小刘'
    },
    items: [
      { text: '人员维护', icon: 'mdi-clock',url:'/renyuan'},
      { text: '事件维护', icon: 'mdi-account',url:'/shijian' },
      { text: '物资维护', icon: 'mdi-clock',url:'/wuzi'},
      { text: '城市信息维护', icon: 'mdi-account',url:'/city' },
      { text: '接报维护', icon: 'mdi-clock',url:'/jiebaowh'},
      { text: '风险企业维护', icon: 'mdi-account',url:'/qiye' },
      { text: '流程维护', icon: 'mdi-clock',url:'/liucheng'},
      { text: '接报管理（指挥）', icon: 'mdi-account',url:'/jiebaoglzh' },
      { text: '紧急事件处理', icon: 'mdi-account',url:'/jinji' },
      { text: '接报管理（专家）', icon: 'mdi-account',url:'/jiebaoglzj' },



    ],
  }),
}
</script>