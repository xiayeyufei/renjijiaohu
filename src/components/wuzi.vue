<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-container>
      <h1>物资维护</h1>
      <v-divider></v-divider>
      <v-row style="margin-top: 30px">
        <v-col>
          <v-text-field
              label="相关内容搜索"
              outlined
              v-model="search"
              append-icon="mdi-magnify"
              hide-details
              dense>

          </v-text-field>
        </v-col>

        <v-col style="max-width: 150px">
          <v-select
              v-model="Typeselect"
              :items="Typeitems"
              label="物资类型"
              outlined
              dense
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            sm="2"
            md="2"
        >
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="dateRangeText"
                  label="物资清点日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  dense
                  outlined
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                range
                no-title
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-btn color="primary">
            搜索
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-dialog v-model="plDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline" style="justify-items: center">你确定要删除勾选的物资信息吗？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="plDelete=false">取消</v-btn>
              <v-btn color="blue darken-1" text @click="plDelete=false">确定删除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row style="padding: 0px;padding-right: 12px;padding-top: 12px" class="d-flex flex-row-reverse">
          <v-col style="max-width: fit-content;max-height: fit-content">
            <v-btn @click="plDelete=true">批量删除</v-btn>
          </v-col>
          <v-col style="max-width: fit-content;max-height: fit-content">
            <v-dialog
                v-model="dialognewperson"
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
                  新增物资信息
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">新增物资信息</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                      >
                        <v-row>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.name"
                                :counter="10"
                                :rules="nameRules"
                                label="物资名称"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-row>
                              <v-col>
                                <v-text-field
                                    v-model="editedItem.num"
                                    :rules="numRules"
                                    label="物资数量"
                                    required
                                ></v-text-field>
                              </v-col>
                              <v-col style="max-width: 40%">
                                <v-text-field
                                    v-model="editedItem.danwei"
                                    label="单位"
                                    required
                                ></v-text-field>
                              </v-col>
                            </v-row>

                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                                v-model="editedItem.type"
                                :items="Typeitems"
                                :rules="[v => !!v || '请选择用户类型']"
                                label="用户类型"
                                required
                            ></v-select>
                          </v-col>
                          <v-col

                          >
                            <v-menu
                                v-model="regmenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="editedItem.countday"
                                    label="物资清点时间"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="editedItem.countday"
                                  no-title
                                  scrollable
                                  @input="regmenu=false"
                              >

                              </v-date-picker>
                            </v-menu>
                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.countperson"
                                :rules="[v => !!v || '请输入物资清点人姓名']"
                                label="物资清点人"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.countPhone"
                                :rules="phoneRules"
                                label="物资清点人电话"
                                required
                            ></v-text-field>
                          </v-col>

                        </v-row>

                      </v-form>
                    </v-row>
                  </v-container>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialognewperson = false&&reset"
                  >
                    关闭
                  </v-btn>
                  <v-btn
                      color="primary"
                      @click="save"
                  >
                    保存
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

        </v-row>


      </v-row>
      <v-row>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            sort-by="id"
            class="elevation-0"
            style="min-width: 100%"
            show-select
            :search="search"
        >
          <template v-slot:item.state="{ item }">
            <v-chip
                :color="getColor(item.state)"
                dark
            >
              {{ userstatef(item.state) }}
            </v-chip>
          </template>
          <template v-slot:top>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                      >
                        <v-row>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.name"
                                :counter="10"
                                :rules="nameRules"
                                label="物资名称"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-row>
                              <v-col>
                                <v-text-field
                                    v-model="editedItem.num"
                                    :rules="numRules"
                                    label="物资数量"
                                    required
                                ></v-text-field>
                              </v-col>
                              <v-col style="max-width: 40%">
                                <v-text-field
                                    v-model="editedItem.danwei"
                                    label="单位"
                                    required
                                ></v-text-field>
                              </v-col>
                            </v-row>

                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                                v-model="editedItem.type"
                                :items="Typeitems"
                                :rules="[v => !!v || '请选择物资类型']"
                                label="物资类型"
                                required
                            ></v-select>
                          </v-col>
                          <v-col

                          >
                            <v-menu
                                v-model="regmenu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="editedItem.countday"
                                    label="物资清点时间"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="editedItem.countday"
                                  no-title
                                  scrollable
                                  @input="regmenu2=false"
                              >

                              </v-date-picker>
                            </v-menu>
                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.countperson"
                                :rules="[v => !!v || '请输入物资清点人姓名']"
                                label="物资清点人"
                                required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                                v-model="editedItem.countPhone"
                                :rules="phoneRules"
                                label="物资清点人电话"
                                required
                            ></v-text-field>
                          </v-col>

                        </v-row>

                      </v-form>
                    </v-row>
                  </v-container>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false&&reset"
                  >
                    关闭
                  </v-btn>
                  <v-btn
                      color="primary"
                      @click="save"
                  >
                    保存
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline" style="justify-items: center">你确定要删除该人员信息吗？</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定删除</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
                color="primary"
                @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-row>

    </v-container>
  </div>


</template>

<script>

export default {
  name: "wuzi",
  data: () => ({
    regdate: new Date().toISOString().substr(0, 10),
    countPerson:'',
    userstate:false,
    regmenu: false,
    regmenu2:false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '请填写物资名称',
      v => (v && v.length <= 10) || '物资必须小于十个字符',
    ],
    wuzinum: '',
    numRules: [
      v => !!v || '请填写物资数量',
      v =>/[0-9]/.test(v) || '物资数量只能是数字',
    ],
    danwei: '',
    danweiRules: [
      v => !!v || '请填写合适的单位',
      v => (v && v.length <= 6) || '单位名称必须小于5个字符',
    ],
    phoneRules: [
      v => !!v || '请填写清点人电话号码',
      v=> /1[3|5|7|8|][0-9]{9}$/.test(v) || '请输入合法的电话号码',
    ],
    Typeselect: null,
    Typeitems: [    //dia
      '生命救助',
      '器材工具',
    ],

    countPhone:'',
    checkbox: false,
    selected: [],
    search:'',
    auth_select:'',
    state_select:'',
    date: ['', ''],
    plDelete:false,
    dialog: false,
    dialognewperson:false,
    dialogDelete: false,
    headers: [
      {text: 'ID', align: 'start',value: 'id',},
      { text: '物资', value: 'name' },
      { text: '物资数量', value: 'num' },
      { text: '单位', value: 'danwei' },
      { text: '物资类型', value: 'type' },
      { text: '物资清点人', value: 'countperson' },
      { text: '物资清点人电话', value: 'countPhone'},
      { text: '物资编号', value: 'wuzicode'},
      { text: '物资清点时间', value: 'countday'},
      { text: '操作', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      danwei:'',
      id:'',
      name:'',
      num:'',
      type:'',
      countperson:'',
      countPhone:'',
      wuzicode:'',
      countday:'',
    },
    defaultItem: {
      danwei:'',
      id:'',
      name:'',
      num:'',
      type:'',
      countperson:'',
      countPhone:'',
      wuzicode:'',
      countday:'',
    },
    newtItem: {
      danwei:'',
      id:'',
      name:'',
      num:'',
      type:'',
      countperson:'',
      countPhone:'',
      wuzicode:'',
      countday:'',
    },
  }),
  computed: {
    dateRangeText () {
      return this.date.join(' ~ ')
    },
    formTitle () {
      return this.editedIndex === -1 ? '新增物资信息' : '修改物资信息'
    },

  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },
  methods: {
    getColor (item) {
      if (item === false) return 'red'
      else  return 'green'
    },
    userstatef (item) {
      return item === true ? '正常' : '停用'
    },
    initialize () {
      this.desserts = [
        {
          id:'8',
          name:'矿泉水',
          num:'50',
          danwei:'件',
          type:'生命救助',
          countday:'2019-04-25',
          countperson:'蔡徐坤',
          countPhone:'13558331216',
          wuzicode:'111111111111',
        },
        {
          id:'9',
          name:'炸药包',
          num:'50',
          danwei:'包',
          type:'器械工具',
          countday:'2019-04-25',
          countperson:'吴亦凡',
          countPhone:'13558331216',
          wuzicode:'111111111111',
        },
        {
          id:'10',
          name:'水',
          num:'50',
          danwei:'桶',
          type:'生命救助',
          countday:'2019-04-25',
          countperson:'许嵩',
          countPhone:'13558331216',
          wuzicode:'111111111111',
        },
        {
          id:'12',
          name:'方便面',
          num:'50',
          danwei:'件',
          type:'生命救助',
          countday:'2019-04-25',
          countperson:'小刘',
          countPhone:'13558331216',
          wuzicode:'111111111111',
        },
        {
          id:'13',
          name:'面包',
          num:'50件',
          danwei:'件',
          type:'生命救助',
          countday:'2019-04-25',
          countperson:'杨幂',
          countPhone:'13558331216',
          wuzicode:'111111111111',
        },

      ]
    },
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      return this.$refs.form.validate()
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.validate()){
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.id=this.desserts.length+10
          let d = new Date(this.editedItem.countday)
          this.editedItem.wuzicode=d.getTime()
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    },

    }

}
</script>

<style scoped>

</style>