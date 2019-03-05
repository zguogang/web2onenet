<template>
  <div id="app">
    <el-container>
        <el-header style="position:fixed;top:0;left:0;width:100%;">
            <top></top>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import Top from './components/top'
export default {
  name: 'App',
  components: {
    Top
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
