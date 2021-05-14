<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-card
          class="mx-auto"
          max-width="300"
          tile
      >
        <v-list flat>
          <v-subheader>REPORTS</v-subheader>
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
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-row style="padding: 12px">

          <span style="text-align: center;color:black;font-size: small;margin: 10px;font-family: Roboto,sans-serif;color: rgba(0,0,0,.6) !important">
            欢迎，{{person.name}}
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
                ><img src="./assets/keli.jpg">
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
                  @click="$router.push('/login')"
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
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name:'index',
  data: () => ({
    drawer: null,
    selectedItem: 1,
    person:{
      name:'小刘'
    },
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
  }),
}
</script>