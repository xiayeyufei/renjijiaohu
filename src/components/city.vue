<template>
  <div>
    <v-container>
      <h1>城市信息维护</h1>
      <v-divider></v-divider>
      <v-row style="margin-top: 30px">
        <v-col>
          <v-text-field
              label="相关内容搜索"
              outlined
              v-model="input4"
              dense>

          </v-text-field>
        </v-col>
        <v-col
            style="padding-right: 0px;max-width: fit-content;max-height: fit-content">
          <v-btn
              elevation="0"
          >搜索
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


            </v-dialog>
          </v-col>
          <v-col style="max-width: fit-content;max-height: fit-content">
            <v-dialog
                v-model="dialogaddcity"
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
                  新增城市
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add City</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                            label="City Name*"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                            label="City Code*"
                            type="password"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Province*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Rescue Nums*"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Rescue Cars Num"
                            hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-col>


                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogaddcity = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogaddcity = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col style="max-width: fit-content;max-height: fit-content">
            <v-dialog
                v-model="dialognewpath"
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
                  新增路线
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Path</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            label="Path Name*"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="8"
                      >
                        <v-text-field
                            label="Start Position*"
                            hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-col>
                      <v-radio-group
                          v-model="column"
                          column
                      >
                        <v-radio
                            label="企业"
                            value="radio-1"
                        ></v-radio>
                        <v-radio
                            label="物资点"
                            value="radio-2"
                        ></v-radio>
                      </v-radio-group>
                      <v-col
                          cols="12"
                          sm="6"
                          md="8"
                      >
                        <v-text-field
                            label="End Position*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                        ></v-text-field>
                      </v-col>
                      <v-radio-group
                          v-model="column"
                          column
                      >
                        <v-radio
                            label="企业"
                            value="radio-1"
                        ></v-radio>
                        <v-radio
                            label="物资点"
                            value="radio-2"
                        ></v-radio>
                      </v-radio-group>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Length*"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                            label="Remark"
                            required
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
                      @click="dialognewpath = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialognewpath = false"
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
            :headers="headers"
            :items="citys"
            sort-by="id"
            class="elevation-0"
            style="min-width: 100%"
            show-select
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
                            label="名称"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.code"
                            label="编码"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.province"
                            label="省"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.rescue_num"
                            label="救援人数"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.cars_num"
                            label="救援车辆"
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
  name: "city",
  data: () => ({
    date: ['', ''],
    dialog: false,
    dialogaddcity: false,
    dialognewpath: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'id',
      },
      {text: '城市名称', value: 'name'},
      {text: '城市编码', value: 'code'},
      {text: '省', value: 'province'},
      {text: '救援人数', value: 'rescue_num'},
      {text: '救援车辆', value: 'cars_num'},
      { text: '操作', value: 'actions', sortable: false },
    ],
    citys: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      code: 0,
      province: 0,
      rescue_num: 0,
      cars_num: 0,
    },
    defaultItem: {
      name: '',
      code: 0,
      province: 0,
      rescue_num: 0,
      cars_num: 0,
    },
  }),
  computed: {
    dateRangeText() {
      return this.date.join(' ~ ')
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.citys = [
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
        {
          id: 1,
          name: '沈阳',
          code: '12',
          province: '辽宁',
          rescue_num: 100,
          cars_num: 200,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.citys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.citys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.citys.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.citys[this.editedIndex], this.editedItem)
      } else {
        this.citys.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>