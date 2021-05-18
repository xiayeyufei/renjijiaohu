<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-container>
            <h1>接报维护</h1>
            <v-divider></v-divider>
            <v-row style="margin-top: 30px">
                <v-col cols="12" md="4">
                    <v-text-field
                            label="事件名称搜索"
                            outlined
                            v-model="search"
                            append-icon="mdi-magnify"
                            dense>
                    </v-text-field>
                </v-col>
                <v-col cols="12"
                       md="2">
                    <v-select
                            v-model="qyselect"
                            :items="qyitems"
                            label="企业名称"
                            outlined
                            dense
                    ></v-select>
                </v-col>
                <v-col cols="12"
                       md="2">
                    <v-select
                            v-model="lcselect"
                            :items="lcitems"
                            label="流程名称"
                            outlined
                            dense
                    ></v-select>
                </v-col>
                <v-spacer></v-spacer>
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
                                    新增接报
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">新增接报</span>
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
                                                        label="事件名称*"
                                                        :rules="sjnameRules"
                                                        required
                                                        outlined
                                                        dense
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12"
                                                   md="4">
                                                <v-select
                                                        v-model="qyadd"
                                                        :items="qyitems"
                                                        label="企业名称"
                                                        :rules="[v => !!v || '请选择企业']"
                                                        outlined
                                                        dense
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12"
                                                   md="4">
                                                <v-select
                                                        v-model="lcadd"
                                                        :items="lcitems"
                                                        label="流程名称"
                                                        :rules="[v => !!v || '请选择流程']"
                                                        outlined
                                                        dense
                                                ></v-select>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="报警人*"
                                                        :rules="[v => !!v || '请填写报警人']"
                                                        outlined
                                                        required
                                                        dense
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="报警人人电话*"
                                                        :rules="phonerules"
                                                        outlined
                                                        required
                                                        dense
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*必填项</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialognewperson = false"
                                    >
                                        新增
                                    </v-btn>
                                    <v-btn
                                            color="black"
                                            text
                                            @click="dialognewperson = false"
                                    >
                                        取消
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
                        :items="company"
                        :search="search"
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
                                                        v-model="editedItem.sjname"
                                                        label="事件名称"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.companyname"
                                                        label="风险企业名称"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-select
                                                        v-model="editedItem.liuname"
                                                        :items="lcitems"
                                                        :rules="[v => !!v || '请选择流程']"
                                                        outlined
                                                        dense
                                                ></v-select>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.telperson"
                                                        label="报警人"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.telephone"
                                                        label="报警人人电话"
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
                                            @click="save"
                                    >
                                        保存
                                    </v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                    >
                                        取消
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">你确定要删除这一条吗?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
                                    <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
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
                                :disabled="edit"
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
            <v-dialog v-model="plDelete" max-width="500px">
                <v-card>
                    <v-card-title class="headline" style="justify-items: center">你确定要删除勾选的人员信息吗？</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="plDelete=false">取消</v-btn>
                        <v-btn color="blue darken-1" text @click="plDelete=false">确定删除</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "jiebaowh",
        data: () => ({
            search:'',
            date: ['', ''],
            dialog: false,
            dialognewperson:false,
            dialogDelete: false,
            qyselect: null,
            lcselect:null,
            lcadd:null,
            qyadd:null,
            edit:false,
            plDelete:false,
            qyitems:[
                "华林科技有限公司",
                "东北化肥农业有限公司"
            ],
            lcitems:[
                '大楼火灾处理',
                '河流水污染处理'
            ],
            sjnameRules: [
                v => !!v || '事件名称是需要的',
                v => (v && v.length <= 20) || '事件名称必须小于20个字符',
            ],
            phonerules: [
                v => !!v || '请填写电话号码',
                v =>/[0-9]/.test(v) || '电话号码只能是数字',
                v => (v && v.length <= 11) || '电话必须小于12个数字',
            ],
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                },
                { text: '事件名称', value: 'sjname' },
                { text: '风险企业名称', value: 'companyname' },
                { text: '流程名称', value: 'liuname' },
                { text: '报警人', value: 'telperson'},
                {text:'报警人联系电话',value:'telephone'},
                {text:'接报时间',value:'jbtime'},
                {text:'流程创建者',value:'cjname'},
                {text:'流程创建时间',value:'cjtime'},
                {text:'最后更新者编号',value:'lastcode'},
                {text:'最后更新时间',value:'lasttime'},
                {text:'接报状态',value:'type'},
                {text:'操作',value:'actions',sortable: false}
            ],
            company: [],
            editedIndex: -1,
            editedItem: {
                id:0,
                sjname: '',
                companyname: '',
                liuname: '',
                telperson: '',
                telephone:'',
                jbtime:'',
                cjname:'',
                cjtime:'',
                lastcode:"",
                lasttime:"",
                type:""
            },
            defaultItem: {
                id:0,
                sjname: '',
                companyname: '',
                liuname: '',
                telperson: '',
                telephone:'',
                jbtime:'',
                cjname:'',
                cjtime:'',
                lastcode:"",
                lasttime:"",
                type:""
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
                this.company = [
                    {
                        id:1,
                        sjname: '写字楼火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:2,
                        sjname: '河流排污',
                        companyname: '东北化肥农业有限公司',
                        liuname: '河流水污染处理',
                        telperson: '李xx',
                        telephone:'139xxxx6987',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"未完成"
                    },
                    {
                        id:3,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:4,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:5,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:6,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:7,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },
                    {
                        id:8,
                        sjname: '火灾',
                        companyname: '华林科技有限公司',
                        liuname: '大楼火灾处理',
                        telperson: '孙xx',
                        telephone:'139xxxx4985',
                        jbtime:'2021-05-01 16:25:48',
                        cjname:'王xx',
                        cjtime:'2020-12-15 18:06:39',
                        lastcode:"001",
                        lasttime:"2021-05-01 16:25:48",
                        type:"待审批"
                    },

                ]
            },

            editItem (item) {
                this.editedIndex = this.company.indexOf(item)
                if(Object.assign({}, item).type == "待审批"){
                    this.editedItem = Object.assign({}, item)
                    this.dialog = true
                }
            },

            deleteItem (item) {
                this.editedIndex = this.company.indexOf(item)
                if(Object.assign({}, item).type == "待审批") {
                    this.editedItem = Object.assign({}, item)
                    this.dialogDelete = true
                }
            },

            deleteItemConfirm () {
                this.company.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
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
                if (this.editedIndex > -1) {
                    Object.assign(this.company[this.editedIndex], this.editedItem)
                } else {
                    this.company.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>