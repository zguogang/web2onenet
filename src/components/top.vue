<template>
  <div id='top'>
    <div class="header">
      <el-menu
        style="width:100%;float:right"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#FFFFFF"
        text-color="#000000"
        active-text-color="#409EFF">
        <el-menu-item index="1">设备</el-menu-item>
        <el-menu-item index="2">显示</el-menu-item>
        <el-menu-item index="3">命令</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted () {
    this.$router.push({name: 'device'})
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '1' :
          this.$router.push({name: 'device'})
          break
        case '2' :
          this.$router.push({name: 'display'})
          break
        case '3' :
          this.$router.push({name: 'command'})
          break
        default:
          this.$router.push({name: 'device'})
          break
      }
    }
  }
}
</script>

<style>
.header{
  width:100%;
  height:60px;
  border-bottom:1px solid #e2e2e2;
  background-color:#fff;
}
</style>
