<template>
  <div class="display">
    <el-row>
      <el-button type='primary' @click='buttonClick("realtimeDisplay")'>实时显示</el-button>
      <el-button type='primary' @click='buttonClick("refresh")'>刷新数据</el-button>
    </el-row>
    <el-row>
      &nbsp;
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
    <el-row>
      &nbsp;
    </el-row>
    <el-row>
      <el-col :span="6">
        &nbsp;
      </el-col>
      <el-col :span="6" style="font-size:25px">
        温度：
      </el-col>
      <el-col :span="6" style="font-size:25px; color:green">
        {{ temperature }}{{ temperatureUnit }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        &nbsp;
      </el-col>
      <el-col :span="6" style="font-size:25px">
        湿度：
      </el-col>
      <el-col :span="6" style="font-size:25px; color:green">
        {{ humidity }}{{ humidityUnit }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: 'Display',
  data () {
    return {
      msg: '这是一个显示页面',
      temperature: 0.0,
      temperatureUnit: '°C',
      humidity: 0.0,
      humidityUnit: '%',
      timer: null,
      showDialog: false,
      dialogMsg: ''
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
        return false
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
            } else {
              that.getDisplayData()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      return true
    },
    getDisplayData () {
      if (this.showDialog) {
        return
      }
      let that = this
      that.$axios.get('/apis/display/', {
        params: {
          deviceId: that.$root.currentDevice.id
        }
      })
        .then(function (response) {
          console.log(response.data)
          for (let item of response.data) {
            if (item.id === 'temperature') {
              that.temperature = item.current_value
              that.temperatureUnit = item.unit_symbol
            } else if (item.id === 'humidity') {
              that.humidity = item.current_value
              that.humidityUnit = item.unit_symbol
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createTimer () {
      this.timer = setInterval(() => {
        this.getDisplayData()
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        console.log('---clearInterval---')
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      })
    },
    buttonClick (cmd) {
      console.log(cmd)
      switch (cmd) {
        case 'realtimeDisplay' :
          if (this.checkDeviceSelect()) {
            this.createTimer()
          }
          break
        case 'refresh' :
          if (this.checkDeviceSelect()) {
            if (this.timer) {
              clearInterval(this.timer)
              this.timer = null
            }
          }
          break
        case 'dialogConfirm' :
          this.showDialog = false
          this.dialogMsg = ''
          // this.$router.push({name: 'device'})
          break
        default :
          break
      }
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
