<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-container>
            <h1>风险企业维护</h1>
            <v-divider></v-divider>
            <v-row style="margin-top: 30px">
                <v-col>
                    <v-text-field
                            label="企业名称搜索"
                            outlined
                            v-model="search"
                            append-icon="mdi-magnify"
                            dense>
                    </v-text-field>
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
                                    新增企业
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">新增风险企业</span>
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
                                                        label="风险企业名称*"
                                                        required
                                                        :rules="[v => !!v || '企业名称必须填写']"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        label="企业地址"
                                                        hint="xx路xx号"
                                                        :rules="[v => !!v || '企业地址必须填写']"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"

                                            >
                                                <v-text-field
                                                        label="企业类型*"
                                                        required
                                                        :rules="[v => !!v || '企业类型必须填写']"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="经度*"
                                                        hint="保留两位小数"
                                                        required
                                                        v-model="amount"
                                                        >
                                                ></v-text-field>
                                                <!--hint="example of persistent helper text"
                                                        persistent-hint-->
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="纬度*"
                                                        hint="保留两位小数"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="企业法人*"
                                                        :rules="[v => !!v || '企业法人必须填写']"
                                                        required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        label="法人电话*"
                                                        required
                                                        :rules="phonerules"
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
                                                        v-model="editedItem.name"
                                                        label="企业名称"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.position"
                                                        label="企业地址"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.type"
                                                        label="企业类型"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.location"
                                                        label="企业位置"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.lawperson"
                                                        label="企业法人"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                            >
                                                <v-text-field
                                                        v-model="editedItem.telephone"
                                                        label="法人电话"
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
                                        取消
                                    </v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                    >
                                        保存
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">你确定要删除这一条吗?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
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
        name: "renyuan",
        data: () => ({
            amount:"",
            search:'',
            date: ['', ''],
            dialog: false,
            dialognewperson:false,
            dialogDelete: false,
            plDelete:false,
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
                { text: '企业名称', value: 'name' },
                { text: '企业地址', value: 'position' },
                { text: '企业位置', value: 'location' },
                { text: '企业法人', value: 'lawperson'},
                {text:'法人电话',value:'telephone'},
                {text:'企业类型',value:'type'},
                {text:'操作',value:'actions',sortable: false}
            ],
            company: [],

            editedIndex: -1,
            editedItem: {
                name: '',
                position: 0,
                location: 0,
                lawperson: 0,
                telephone: 0,
                type:0,
            },
            defaultItem: {
                name: '',
                position: 0,
                location: 0,
                lawperson: 0,
                telephone: 0,
                type:0,
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
            amount(newVal, oldVal) {
                // 解决数字键盘可以输入输入多个小数点问题
                if (newVal === '' && oldVal.toString().indexOf('.') > 0) {
                    this.amount = oldVal;
                    console.log(this.amount)
                    return;
                }
                // 保留两位小数
                if (newVal) {
                    newVal = newVal.toString();
                    var pointIndex = newVal.indexOf('.');
                    if (pointIndex > 0 && (newVal.length - pointIndex) > 3) {
                        this.amount = oldVal;
                        console.log(this.amount)
                        return;
                    }
                }
                // 最大值
                if (newVal > 999999) {
                    this.amount = oldVal;
                    console.log(this.amount)
                    return;
                }
            },
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
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:2,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:3,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:4,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:5,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:6,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:7,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:8,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:1,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                    {
                        id:9,
                        name: '东软',
                        position: '地址',
                        location: '(128.15,128.15)',
                        lawperson: '东软法人',
                        telephone: '15145565654',
                        type:'软件企业',
                    },
                ]
            },

            editItem (item) {
                this.editedIndex = this.company.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.company.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
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