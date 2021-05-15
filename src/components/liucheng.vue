<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-container>
            <h1>流程维护</h1>
            <v-divider></v-divider>
            <v-row style="margin-top: 30px">
                <v-col cols="12"
                       md="4">
                    <v-text-field
                            label="流程名称搜索"
                            outlined
                            v-model="search"
                            append-icon="mdi-magnify"
                            dense>
                    </v-text-field>
                </v-col>
                <v-col style="padding-right: 0px"cols="12"
                       md="4">
                    <treeselect v-model="value"
                                :disableBranchNodes="true"
                                :multiple="false"
                                :options="options"
                                :flat="true"
                                :sort-value-by="sortValueBy"
                                :default-expand-level="1"
                        placeholder="选择流程类型"
                    >
                        <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
                    </treeselect>
                    <treeselect-value :value="value"></treeselect-value>
                </v-col>
                <v-col>
                    <v-btn
                            elevation="0"
                            @click="getdatatype"
                    >筛选</v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-row style="padding: 0px;padding-right: 12px;padding-top: 12px" class="d-flex flex-row-reverse">
                    <v-col style="max-width: fit-content;max-height: fit-content">
                        <v-btn>批量删除</v-btn>
                    </v-col><!--至此第一行结束-->
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
                                    新增流程
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">User Profile</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12"
                                                   sm="6"
                                            >
                                                <v-text-field
                                                        label="流程名称"
                                                        outlined
                                                        dense>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12"
                                                sm="6"
                                            >
                                                <treeselect v-model="value"
                                                            :disableBranchNodes="true"
                                                            :multiple="false"
                                                            :options="options"
                                                            :flat="true"
                                                            :sort-value-by="sortValueBy"
                                                            :default-expand-level="1"
                                                            placeholder="选择流程类型"
                                                >
                                                    <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
                                                </treeselect>
                                                <treeselect-value :value="value"></treeselect-value>
                                            </v-col>
                                            <v-col cols="12"
                                                   sm="9"
                                            >
                                                <v-text-field
                                                        label="流程步骤*"
                                                        required
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
                        </v-dialog><!--至此新增dialog结束-->
                    </v-col>
                </v-row>
            </v-row>
            <v-row><!--以下开始画表格-->
                <v-data-table
                        :headers="headers"
                        :items="desserts"
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
                        <v-spacer></v-spacer><!--以下为修改删除弹框-->
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
    //import the component
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        components: { Treeselect },
        name: "renyuan",
        data: () => ({
            liuchengtype:'',
            search:'',
            date: ['', ''],
            dialog: false,
            dialognewperson:false,
            dialogDelete: false,
            //options: generateOptions(3),
            sortValueBy: 'ORDER_SELECTED',
            value: null,
            // define options
            options: [ {
                id: '自然灾害',
                label: '自然灾害',
                children: [ {
                    id: '水旱灾害',
                    label: '水旱灾害',
                    children:[
                        {
                            id:'自然灾害水旱灾害一级',
                            label:"一级",
                            customLabel: `自然灾害水旱灾害一级`,

                        },
                        {
                            id:'自然灾害水旱灾害二级',
                            label:'二级',
                            customLabel: `自然灾害水旱灾害二级`,
                        },
                    ]
                }, {
                    id: '火灾',
                    label: '火灾',
                    children:[
                        {
                            id:'自然灾害火灾一级',
                            label:'一级',
                            customLabel: `自然灾害火灾一级`,
                        },
                        {
                            id:'自然灾害火灾二级',
                            label:'二级',
                            customLabel: `自然灾害火灾二级`,
                        },
                    ]
                } ],
            },],
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    value: 'id',
                },
                { text: '流程名称', value: 'name' },
                { text: '类型', value: 'style' },
                { text: '类型编码', value: 'code' },
                { text: '步骤', value: 'step'},
                {text:'操作',value:'actions',sortable: false}
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
            getdatatype() {
                this.liuchengtype=''
                for (var i =0;i<this.value.length;i++) {
                    var liucheng
                    liucheng=this.value[i]
                    for(var key in liucheng){
                        this.liuchengtype+=liucheng[key]
                    }
                }
                console.log(this.liuchengtype)
                console.log(123)
            },
            initialize () {
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
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
        }
    }
</script>


<style lang="css" scoped>
    .title{
        position:absolute;
        left: 3%;
        top:3%;
    }
</style>