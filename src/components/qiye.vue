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
                            v-model="input4"
                            dense>
                    </v-text-field>
                </v-col>
                <v-col
                        style="padding-right: 10px;max-width: fit-content;max-height: fit-content">
                    <v-btn
                            elevation="0"
                    >搜索</v-btn>
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

        </v-container>
    </div>
</template>
<script>
    export default {
        name: "renyuan",
        data: () => ({
            date: ['', ''],
            dialog: false,
            dialognewperson:false,
            dialogDelete: false,
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
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                    {
                        name: '东软',
                        position: 0,
                        location: 0,
                        lawperson: 0,
                        telephone: 0,
                        type:0,
                    },
                ]
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