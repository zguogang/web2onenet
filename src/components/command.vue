<template>
  <div class="command">
    <el-row>
      <h1>{{ msg }}</h1>
    </el-row>
    <el-row>
      <el-col :span="2">
        &nbsp;
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入命令"
          v-model="txtCmd"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click='buttonClick("cmd")'>发送</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-dialog
        title="提示"
        :visible.sync="showDialog"
        width="80%"
        top="50%"
        center>
        <span style="color:red">{{ dialogMsg }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type='primary' @click='buttonClick("dialogConfirm")'>确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Command',
  data () {
    return {
      msg: '这是一个命令页面',
      showDialog: false,
      dialogMsg: '',
      txtCmd: ''
    }
  },
  mounted () {
    console.log('------------mounted--------------')
    this.checkDeviceSelect()
  },
  methods: {
    checkDeviceSelect () {
      console.log('call checkDeviceSelect')
      if ((typeof (this.$root.currentDevice.id) === 'undefined') || (this.$root.currentDevice.id === '')) {
        this.showDialog = true
        this.dialogMsg = '请先到设备页选择一个在线设备'
      } else {
        let that = this
        that.$axios.get('/apis/device/detail/', {
          params: {
            deviceId: that.$root.currentDevice.id
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (!response.data.online) {
              that.showDialog = true
              that.dialogMsg = '选择的设备已离线，请重新选择！'
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    buttonClick (cmd) {
      console.log(cmd)
      switch (cmd) {
        case 'cmd' :
          this.sendCmd(this.txtCmd)
          break
        case 'dialogConfirm' :
          this.showDialog = false
          this.dialogMsg = ''
          // this.$router.push({name: 'device'})
          break
        default :
          break
      }
    },
    sendCmd (cmd) {
      console.log(this.$root.currentDevice.id)
      console.log(typeof (this.$root.currentDevice))
      console.log(typeof (this.$root.currentDevice.id))
      if ((typeof (this.$root.currentDevice.id) === 'undefined') || (this.$root.currentDevice.id === '')) {
        this.showDialog = true
        this.dialogMsg = '请先到设备页选择一个在线设备'
        return
      }
      this.$axios.post('/apis/cmd/', qs.stringify({
        deviceId: this.$root.currentDevice.id,
        cmd: cmd
      }))
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
