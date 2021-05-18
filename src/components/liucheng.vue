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
                        <v-btn @click="plDelete=true">批量删除</v-btn>
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
                                    <span class="headline">新增流程</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row dense>
                                            <v-col cols="12"
                                                   sm="6"
                                            >
                                                <v-text-field
                                                        label="流程名称"
                                                        outlined
                                                        dense
                                                        :rules="[v => !!v || '流程名称必须填写']"
                                                        v-model="addstepitem.name">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12"
                                                sm="6"
                                            >
                                                <treeselect v-model="addstepitem.style"
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
                                                <treeselect-value :value="addvalue"></treeselect-value>
                                            </v-col>
                                            <v-col cols="12" sm="6"
                                            >
                                                <h3 style="padding-left: 17px;padding-top:15px"
                                                color="black">步骤</h3>
                                            </v-col>
                                            <v-col cols="12"  sm="6" style="padding-left: 20% ; padding-bottom: 5px"
                                            >
                                                <v-btn @click="addsteps"
                                                >
                                                    新增步骤
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="12"  sm="12">
                                            <v-divider style="padding-bottom: 5px"></v-divider>
                                            </v-col>
                                            <v-col>
                                                <v-simple-table style="padding-bottom: 20px"
                                                        dense >
                                                    <template v-slot:default >
                                                        <thead style="margin-bottom: 100px">
                                                        <tr>
                                                            <th class="text--accent-1" width="3">
                                                                步骤序号
                                                            </th>
                                                            <th class="text--accent-1" width="12">
                                                                步骤内容
                                                            </th>
                                                            <th class="text--accent-1" style="padding-left: 25px">操作</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item1 in step" :key="item1.id">
                                                            <td width="5px"><v-text-field
                                                                    v-model="item1.id"
                                                                    :readonly=true
                                                                    dense
                                                                    autofocus
                                                            ></v-text-field></td>
                                                            <td><v-text-field
                                                                    v-model="item1.content"
                                                                    :readonly="item1.readonly"
                                                                    :rules="[v => !!v || '流程步骤不能为空']"
                                                                    dense
                                                                    autofocus
                                                            ></v-text-field></td>
                                                            <td width="15px">
                                                                <!-- 非修改界面显示修改，修改界面显示保存 -->
                                                                <v-btn rounded color="primary" dark @click="editstep(item1)" small style="margin-right: 10px">{{ item1.readonly? "修改":"保存" }}</v-btn>
                                                                <!-- 非修改界面显示删除 -->
                                                                <v-btn rounded color="error" dark small v-if="item1.readonly" @click="delstep(item1)">删除</v-btn>
                                                                <!-- 修改界面显示取消 -->
                                                                <v-btn rounded color="success" dark small v-if="!item1.readonly" @click="cancelstep(item1)">取消</v-btn>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="changetostring"
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
                                persistent
                                max-width="600px"
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
                                            >
                                                <v-text-field
                                                        v-model="editedItem.name"
                                                        outlined
                                                        dense
                                                        label="流程名称"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                            >
                                                <treeselect v-model="editedItem.style"
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
                                                <treeselect-value :value="editvalue"></treeselect-value>
                                            </v-col>
                                            <v-col cols="12" sm="6"
                                            >
                                                <h3 style="padding-left: 17px;padding-top:15px"
                                                    color="black">步骤</h3>
                                            </v-col>
                                            <v-col cols="12"  sm="6" style="padding-left: 20% ; padding-bottom: 5px"
                                            >
                                                <v-btn @click="addsteps"
                                                >
                                                    新增步骤
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="12"  sm="12">
                                                <v-divider style="padding-bottom: 5px"></v-divider>
                                            </v-col>
                                            <v-col>
                                                <v-simple-table style="padding-bottom: 20px"
                                                                dense >
                                                    <template v-slot:default >
                                                        <thead style="margin-bottom: 100px">
                                                        <tr>
                                                            <th class="text--accent-1" width="3">
                                                                步骤序号
                                                            </th>
                                                            <th class="text--accent-1" width="12">
                                                                步骤内容
                                                            </th>
                                                            <th class="text--accent-1" style="padding-left: 25px">操作</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr v-for="item1 in step" :key="item1.id">
                                                            <td width="5px"><v-text-field
                                                                    v-model="item1.id"
                                                                    :readonly=true
                                                                    dense
                                                                    autofocus
                                                            ></v-text-field></td>
                                                            <td><v-text-field
                                                                    v-model="item1.content"
                                                                    :readonly="item1.readonly"
                                                                    dense
                                                                    autofocus
                                                            ></v-text-field></td>
                                                            <td width="15px">
                                                                <!-- 非修改界面显示修改，修改界面显示保存 -->
                                                                <v-btn rounded color="primary" dark @click="editstep(item1)" small style="margin-right: 10px">{{ item1.readonly? "修改":"保存" }}</v-btn>
                                                                <!-- 非修改界面显示删除 -->
                                                                <v-btn rounded color="error" dark small v-if="item1.readonly" @click="delstep(item1)">删除</v-btn>
                                                                <!-- 修改界面显示取消 -->
                                                                <v-btn rounded color="success" dark small v-if="!item1.readonly" @click="cancelstep(item1)">取消</v-btn>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
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
                                            color="black darken-1"
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
                                <v-card-title class="headline">你确定要删除这个流程吗?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
                                    <v-btn color="black darken-1" text @click="closeDelete">取消</v-btn>
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
            addvalue:null,
            editvalue:null,
            plDelete:false,
            //增加表项
            addstepitem:{
                id:11,
                name: '',
                style:"liucheng",
                code: "154",
                step: "",
            },
            //define codeoption
            codeoption:[{
                code:154,
                option:"自然灾害火灾一级"
    },
    {
        code:155,
            option:"自然灾害火灾二级"
    },{
                    code:152,
                    option:"自然灾害水旱灾害一级"
     },{
                    code:153,
                    option:"自然灾害水旱灾害二级"
       }
    ],
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
                            code:'152',
                            customLabel: `自然灾害水旱灾害一级`,

                        },
                        {
                            id:'自然灾害水旱灾害二级',
                            label:'二级',
                            code:'153',
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
                            code:'154',
                            customLabel: `自然灾害火灾一级`,
                        },
                        {
                            id:'自然灾害火灾二级',
                            label:'二级',
                            code:'155',
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
                style: 0,
                code: 0,
                step: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            step:[{
                id:1,
                content:"第1步",
                readonly:true
            },{
                id:2,
                content:"第2步",
                readonly:true
            },{
                id:3,
                content:"第3步",
                readonly:true
            },
            ],
            addstep: {
                id:0,
                content:"",
                readonly:true
            },
            addstepIndex: -1,
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
                        id:1,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:2,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:3,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:4,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:5,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:6,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:7,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:8,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:9,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
                    },
                    {
                        id:10,
                        name: '森林大火',
                        style: "自然灾害火灾一级",
                        code: "154",
                        step: "1  2  3",
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
            // 修改数据（保存数据）
            editstep(item1) {
                this.addstepIndex = this.step.indexOf(item1);//先找到desserts数组里面对应的索引，通俗点说就是确定修改哪一行数据
                this.addstep = Object.assign({}, item1);//把未修改之前的值存到editedItem对象里面，方便用户取消修改
                //以上两行主要是为取消修改服务，要实现修改其实只需下面一行就够了，因为html中本身的标签为<v-text-field>,也就是说只需控制它的只读和非只读来回切换即可做到修改保存
                item1.readonly = !item1.readonly;
            },
            // 删除数据
            delstep(item1) {
                const index = this.step.indexOf(item1);//找到desserts数组里面对应的索引，通俗点说就是确定删除哪一行数据
                confirm('确定要删除这一步骤吗?') && this.step.splice(index, 1);//系统弹出确认框，点击确定就是删除这一行数据
            },
            // 取消
            cancelstep(item1) {
                item1.readonly = !item1.readonly;//切换文本框的读写状态
                this.$nextTick(() =>{
                    Object.assign(this.step[this.addstepIndex], this.addstep);//点击取消之后，把未修改之前的数据还原到desserts数组
                    this.addstepIndex = -1;//把索引标志置空
                })
            },
            //增加
            addsteps(){
                var a=this.step.length+1
                this.step.push({
                    id:a,
                    content:"第"+a+"步",
                    readonly:true
                })
            },
            changetostring(){
                var b=""
                for(var i=0;i<this.step.length;i++){
                    var a=(i+1)+"."+this.step[i].content+" "
                    b=b+a
                }
                console.log(b)
                this.addstepitem.step=b
                var add=this.addstepitem
                this.desserts.push(add)
                this.dialognewperson=false

                /*this.addstepitem.id=0
                this.addstepitem.step=""
                this.addstepitem.style=""
                this.addstepitem.name=""
                this.addstepitem.code=""*/
            }
        }
    }
</script>


<style lang="css" scoped>
    .title{
        position:absolute;
        left: 3%;
        top:3%;
    }
    .height{
        height: 20px;
    }
</style>