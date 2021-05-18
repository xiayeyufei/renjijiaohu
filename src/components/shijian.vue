<template>
  <v-container>
    <h1>事件维护</h1>
    <v-divider></v-divider>

    <v-row style="margin-top: 30px">
      <v-col style="max-width: fit-content;">
        <v-row style="max-height: fit-content">
          <v-text-field
              v-model="search"
              label="搜索过滤"
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              style="margin: 12px"
              hide-details
          ></v-text-field>
        </v-row>

        <v-row type="flex" justify="end">
          <v-col style="max-width: fit-content;padding-top: 0px;padding-right: 10%">
            <v-dialog
                v-model="nodeDialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  增加节点
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  新增节点
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                      >
                        <v-combobox
                            label="灾害类型"
                            :items="items"
                            item-text="level"
                            v-model="newNodeType"
                            :hint="notice"
                            persistent-hint
                            @blur="lostfocus()"
                        ></v-combobox>
                      </v-col>
                      <v-col
                      >
                        <v-combobox
                            label="灾害名称"
                            :items="selectNodeitem"
                            v-model="newNodeName"
                            item-text="level"
                        ></v-combobox>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                      >
                        <v-select
                            label="灾害等级"
                            :items="levelname"
                        ></v-select>
                      </v-col>
                      <v-col
                      >
                        <v-text-field
                            label="灾害编号"
                            readonly

                            value="000001"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                            solo
                            name="input-7-4"
                            label="备注"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="nodeDialog = false"
                  >
                    关闭
                  </v-btn>
                  <v-btn
                      color="primary"
                      @click="nodeDialog = false"
                  >
                    添加节点
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-col>
          <v-col style="max-width: fit-content;padding-top: 0px">
            <v-btn color="error" >
              删除
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-treeview
              open-on-click
              dense
              hoverable
              :active.sync="active"
              :search="search"
              item-text="level"
              v-model="selection"
              :items="items"
              activatable
              selection-type="leaf"
              selectable
              return-object
              style="min-width: 100%;padding-right: 12px"
          ></v-treeview>
        </v-row>

      </v-col>

      <v-divider vertical></v-divider>

      <v-col

      >
        <v-dialog
            v-model="changeDialog"
            max-width="600px"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
              修改事件信息
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                  >
                    <v-combobox
                        label="灾害类型"
                        :items="itemlist"
                        item-text="type"
                        v-model="changItem.type"
                        :hint="notice"
                        persistent-hint
                        @blur="lostfocus"
                    ></v-combobox>
                  </v-col>
                  <v-col
                  >
                    <v-combobox
                        label="灾害名称"
                        :items="selectNodeitem"
                        v-model="changItem.name"
                    ></v-combobox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                  >
                    <v-select
                        label="灾害等级"
                        :items="levelname"
                        v-model="changItem.level"
                    ></v-select>
                  </v-col>
                  <v-col
                  >
                    <v-text-field
                        label="灾害编号"
                        readonly
                        :value="changItem.code"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                        solo
                        name="input-7-4"
                        label="备注"
                        :value="changItem.beizhu"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="changeDialog = false"
              >
                关闭
              </v-btn>
              <v-btn
                  color="primary"
                  @click="changeDialog = false"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row style="padding-bottom: 12px">
          <v-col style="max-width: fit-content">
            <h2>详细信息</h2>
          </v-col>
          <template v-if="active.length">
            <v-col>
              <v-btn
                  color="primary"
                  @click="changeMessage"
              >
                修改信息
              </v-btn>


            </v-col>
          </template>
          <template v-else>
            <v-col>
              <v-btn
                  color="primary"
                  @click="changeMessage"
                  disabled
              >
                修改信息
              </v-btn>


            </v-col>
          </template>
        </v-row>



        <v-divider ></v-divider>
        <template v-if="!active.length">

         <p style="padding: 12px">请选择事件</p>
        </template>
        <template v-else>
          <div
              v-for="node in active"
              :key="node.id"
          >
            <v-row style="padding: 24px">
              <v-col style="padding: 24px;max-width: fit-content">
                <p>灾害类型:</p>
                <p>灾害名称:</p>
                <p>灾害等级:</p>
                <p>灾害编号:</p>
                <p>备注:</p>
              </v-col>
              <v-col style="padding: 24px">
                <p>{{node.type }}</p>
                <p>{{node.name }}</p>
                <p>{{node.level }}</p>
                <p>{{node.code }}</p>
                <p style="max-width: 50%">{{node.beizhu }}</p>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-col>
<!--      <v-col-->
<!--          style="width: fit-content"-->
<!--      >-->
<!--        <template v-if="!selection.length">-->
<!--          No nodes selected.-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <div-->
<!--              v-for="node in selection"-->
<!--              :key="node.id"-->
<!--          >-->
<!--            {{ node.name }}-->
<!--          </div>-->
<!--        </template>-->
<!--      </v-col>-->
    </v-row>

  </v-container>

</template>

<script>

export default {

  name: "shijian",

  data:()=>({
    changeDialog:false,
    clickable:true,
    nodeDialog: false,
    newNodeType:'',
    notice:'',
    newNodeName:'',
    changItem:{id:0,type:'',name:'',level:'',code:'',beizhu:''},

    search: null,
    selection: [],
    active: [],
    selectNodeitem:[],
    levelname:['一级','二级','三级','四级','五级','六级','七级','八级','九级','十级'],
    items: [
      {
        id: 1,
        level: '自然灾害',
        children: [
          { id: 2, level: '水旱灾害', children: [{id:10,type:'自然灾害',name:'水旱灾害',level:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}]},
          { id: 3, level: '火灾',children: [{id:11,type:'自然灾害',name:'火灾',level:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
      },{
        id: 4,
        level: '事故灾难',
        children: [
          { id: 5, level: '公家车倒翻',children: [{id:12,type:'事故灾难',name:'公家车倒翻',level:'二级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
          { id: 6, level: '工人猝死',children: [{id:13,type:'事故灾难',name:'工人猝死',level:'四级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
      },
      {
        id: 7,
        level: '矿泉水污染',
        children: [
          { id: 8, level: '自然灾害',children: [{id:14,type:'矿泉水污染',name:'自然灾害',level:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
      },
    ],
    itemlist:[

        {
          id: 1,
          type: '自然灾害',
        },{
        id: 4,
        type: '事故灾难',
      },
        {
          id: 7,
          type: '矿泉水污染',
        },

    ],}),

  computed: {
    items () {
      return [
        {
          name: 'Users',
          children: this.users,
        },
      ]
    },
    selected () {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return this.items.find(user => user.id === id)
    },
  },

  methods:{

    changeMessage(){
      console.log(66666666)
      var newModel =JSON.parse(JSON.stringify(this.active[0]));
      // 只改变新对象的值
     this.changItem = newModel;
      console.log(this.changItem.type)
        this.changeDialog=true
    },
    lostfocus(){
      console.log("666666")
      let item;
      console.log("5")
      let flag=false
      console.log("4")
      console.log(this.newNodeType.level)
      for (item of this.items){
        console.log("3")

          if (item.level!==this.newNodeType.level){
            console.log(item.level)
            console.log("2")
          }
          else{
            console.log("1")
            this.selectNodeitem=item.children
            flag=true;
          }
      }
      if (flag){
        this.notice='已有节点'
      }else {
        this.notice='未有该名称的灾害类型，如果创建将新建类型'
      }
    },
    lostfocuschange(){
      let item;
      let flag=false

      console.log(666666666)
      console.log(this.changItem.type)
      for (item of this.items){
        console.log(item.level)
        if (item.level!==this.changItem.type){

          console.log(this.changItem.type)
          console.log("2")
        }
        else{
          console.log("1")
          this.selectNodeitem=item.children
          console.log(555)
          flag=true;
        }
      }
      if (flag){
        this.notice='已有节点'
      }else {
        this.notice='未有该名称的灾害类型，如果创建将新建类型'
      }
    }
  }
}
</script>

<style scoped>

</style>