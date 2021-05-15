<template>
  <div>
    <v-container>
      <h1>人员维护</h1>
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
              v-model="auth_select"
              :items="auth"
              label="选择权限"
              outlined
              dense
          ></v-select>
        </v-col>
        <v-col style="max-width: 150px">
          <v-select
              v-model="auth_select"
              :items="stateconst"
              label="账号状态"
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
                  label="选择出生日期范围"
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
        <v-row style="padding: 0px;padding-right: 12px;padding-top: 12px" class="d-flex flex-row-reverse">
          <v-col style="max-width: fit-content;max-height: fit-content">
            <v-btn>批量删除</v-btn>
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
                    新增用户
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">新增用户</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                          <v-text-field
                              v-model="name"
                              :counter="10"
                              :rules="nameRules"
                              label="Name"
                              required
                          ></v-text-field>

                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                          ></v-text-field>

                          <v-select
                              v-model="select"
                              :items="items"
                              :rules="[v => !!v || 'Item is required']"
                              label="Item"
                              required
                          ></v-select>

                          <v-checkbox
                              v-model="checkbox"
                              :rules="[v => !!v || 'You must agree to continue!']"
                              label="Do you agree?"
                              required
                          ></v-checkbox>

                          <v-btn
                              :disabled="!valid"
                              color="success"
                              class="mr-4"
                              @click="validate"
                          >
                            Validate
                          </v-btn>

                          <v-btn
                              color="error"
                              class="mr-4"
                              @click="reset"
                          >
                            Reset Form
                          </v-btn>

                          <v-btn
                              color="warning"
                              @click="resetValidation"
                          >
                            Reset Validation
                          </v-btn>
                        </v-form>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialognewperson = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialognewperson = false"
                    >
                      Save
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
            sort-by="calories"
            class="elevation-0"
            style="min-width: 100%"
            show-select
            :search="search"
        >
          <template v-slot:top>
              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialog"
                  max-width="1000px"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
  name: "renyuan",
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [    //dia
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
    auth:['工作人员','指挥人员','专家人员'],
    stateconst:['正常','停用'],
    selected: [],
    search:'',
    auth_select:'',
    state_select:'',
    date: ['', ''],
    dialog: false,
    dialognewperson:false,
    dialogDelete: false,
    headers: [
      {text: 'ID', align: 'start',value: 'id',},
      { text: '账号', value: 'username' },
      { text: '密码', value: 'password' },
      { text: '姓名', value: 'name' },
      { text: '性别', value: 'sex' },
      { text: '出生日期', value: 'birthday'},
      { text: '人员编号', value: 'num'},
      { text: '人员类型', value: 'auth_manage'},
      { text: '账号状态', value: 'state'},
      { text: '操作', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  computed: {
    dateRangeText () {
      return this.date.join(' ~ ')
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    initialize () {
      this.desserts = [
        {
          id:'8',
          username:'123',
          password:'123',
          name:'tom',
          auth_manage:'工作人员',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'9',
          name:'tom',
          username:'123',
          password:'123',
          auth_manage:'工作人员',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'10',
          username:'123',
          password:'123',
          name:'tom',
          auth_manage:'工作人员',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'11',
          username:'123',
          password:'123',
          name:'tom',
          auth_manage:'工作人员',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'12',
          username:'123',
          password:'123',
          name:'tom',
          auth_manage:'工作人员',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'13',
          username:'123',
          password:'123',
          auth_manage:'工作人员',
          name:'tom',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },
        {
          id:'14',
          username:'123',
          password:'123',
          auth_manage:'工作人员',
          name:'tom',
          state:'正常',
          sex:'男',
          birthday:'1999-12-16',
          num:'002',
        },


      ]
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
      if (this.editedIndex > -1&&this.validate()) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>