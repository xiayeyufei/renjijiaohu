<template>
  <div>
    <v-container>
      <h1>接报管理</h1>
      <v-divider></v-divider>
      <v-row style="margin-top: 30px">
        <v-col style="max-width: fit-content;max-height: fit-content">
          <v-dialog
              v-model="detailsandcheckout"
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
                查看详情与审批
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">详细信息与审批</span>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                >
                  专家介入
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6"
                           md="4">
                      <v-text-field
                          label="事件名称*"

                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12"
                           sm="6"
                           md="4">
                      <v-text-field
                          label="事件接报编码*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="接报时间*"
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
                          label="流程类型*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="事件报警人"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="事件报警人电话"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="最后更新者"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="风险企业"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="最后更新时间"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-row>
                    <v-data-table
                        :headers="flow_headers"
                        :items="flow_step"
                        sort-by="calories"
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
                      </template>
                    </v-data-table>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="detailsandcheckout = false"
                >
                  驳回
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="detailsandcheckout = false"
                >
                  通过
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="detailsandcheckout = false"
                >
                  取消
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col style="max-width: fit-content">
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
        <v-col
            class="d-flex"
        >
          <v-select
              outlined
              dense
              :items="items"
              label="流程状态"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="4"
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
                  dense
                  outlined
                  v-model="date"
                  label="接报时间"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                scrollable
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
      </v-row>
      <v-row>
        <v-data-table
            :headers="headers"
            :items="alarms"
            sort-by="calories"
            class="elevation-0"
            style="min-width: 100%"
            show-select
            :item-key="alarms.id"
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
  name: "jiebaoglzh",
  data: () => ({
    items: ['已完成', '待审核', '审核完毕'],
    dialog: false,
    detailsandcheckout: false,

    dialogDelete: false,
    flow_headers:[
      {text: '步骤',align: 'start',value:'step',},
      {text: '内容',value: 'content'},
    ],
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'id',
      },
      {text: '事件名称', value: 'event_name'},
      {text: '编码', value: 'event_code'},
      {text: '流程编码', value: 'flow_code'},
      {text: '报警人', value: 'police_man'},
      {text: '报警人联系电话', value: 'police_man_phone'},
      {text: '接报时间', value: 'police_time'},
      {text: '流程创建者', value: 'creator'},
      {text: '流程创建时间', value: 'creat_time'},
      {text: '最后更新者编号', value: 'final_update_code'},
      {text: '最后更新时间', value: 'final_update_time'},
      {text: '流程状态', value: 'state'},
    ],
    flow_step:[],
    alarms: [],
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
      this.alarms = [
        {
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },{
          id: 1,
          event_name: "地震",
          event_code: '1',
          flow_code: '1',
          police_man: '李大妈',
          police_man_phone: '1213456',
          police_time: '2019-5-15',
          creator: '李白',
          creat_time: '2019-5-16',
          final_update_code: '001',
          final_update_time: '2019-5-17',
          state: '待审批',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
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