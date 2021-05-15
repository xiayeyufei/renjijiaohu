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
        <v-row style="padding: 0px">
          <v-col style="max-width: fit-content;padding-top: 0px">
            <v-btn>
              增加节点
            </v-btn>
          </v-col>
          <v-col style="max-width: fit-content;padding-top: 0px">
            <v-btn>
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
          style="width: fit-content"
      >
        <template v-if="!active.length">
          No nodes selected.
        </template>
        <template v-else>
          <div
              v-for="node in active"
              :key="node.id"
          >
            {{ node.name }}
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
    search: null,
    selection: [],
    active: [],
    items: [
      {
        id: 1,
        name: '自然灾害',
        children: [
          { id: 2, name: '水旱灾害', children: [{id:10,name:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}]},
          { id: 3, name: '火灾',children: [{id:11,name:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
      },{
        id: 4,
        name: '事故灾难',
        children: [
          { id: 5, name: '公家车倒翻',children: [{id:12,name:'二级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
          { id: 6, name: '工人猝死',children: [{id:13,name:'四级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
      },
      {
        id: 7,
        name: '矿泉水污染',
        children: [
          { id: 8, name: '自然灾害',children: [{id:14,name:'一级',code:'123456',beizhu:'水旱灾害包括：江河洪水、渍涝、山洪（指由降雨引发的山洪、泥石流、滑坡灾害）、风暴潮、冰凌、台风、地震等造成的洪涝灾害以及严重旱灾。'}] },
        ],
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
}
</script>

<style scoped>

</style>