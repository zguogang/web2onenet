<template>
  <div class="connect">
    <el-row>
      <el-col :span="14" >
        <h1>当前选中设备ID：</h1>
      </el-col>
      <el-col :span="8" >
        <h1 style="color:green">{{ currentDeviceId }}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-button type='primary' @click='buttonClick("refresh")'>刷 新</el-button>
      <el-button type='primary' @click='buttonClick("select")'>选 择</el-button>

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
      <el-table
        height="480"
        ref="singleTable"
        :data="devices"
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-click = "showRow"
        style="width: 100%"
        border>
        <el-table-column
          prop="id"
          label="设备ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称">
        </el-table-column>
        <!--
        <el-table-column
          width="110"
          prop="desc"
          label="设备描述">
        </el-table-column>
        -->
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if='scope.row.status==="在线"' style="color:green">{{ scope.row.status }}</span>
            <span v-else style="color:red">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <!--
        <el-table-column
          width="60"
          label="状态">
          <template slot-scope="scope">
            <el-radio disabled :label="scope.$index" v-model="radio" @change.native="getTemplateRow(scope.$index,scope.row)">
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        -->
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Connect',
  data () {
    return {
      msg: '请刷新列表并选择一个设备控制',
      showDialog: false,
      dialogMsg: '',
      lastSelectRow: this.$root.lastSelectRow,
      currentDeviceId: '',
      devices: this.$root.devices,
      /* {
          id: '1',
          name: '设备1',
          ipv4: '192.168.0.2',
          status: '未连接'
        },
        {
          id: '2',
          name: '设备2',
          ipv4: '192.168.0.5',
          status: '未连接'
        },
        {
          id: '3',
          name: '设备3',
          ipv4: '192.168.0.8',
          status: '未连接'
        },
        {
          id: '4',
          name: '设备4',
          ipv4: '192.168.0.22',
          status: '未连接'
        } */
      templateSelection: 0
    }
  },
  mounted () {
    console.log('------------mounted--------------')
    console.log(this.$root.devices.length)
    this.currentDeviceId = this.$root.currentDevice.id
    if (this.$root.devices.length <= 0) {
      this.getDeviceList()
    }
  },
  methods: {
    getDeviceList () {
      let that = this
      console.log('-------that.$root.currentDeviceId--------')
      console.log(that.$root.currentDevice.id)
      that.$axios.get('/apis/device/list')
        .then((response) => {
          console.log('-------response.data--------')
          console.log(response.data)
          that.$root.devices = response.data.list
          that.devices = response.data.list
          that.currentDeviceId = that.$root.currentDevice.id
        })
    },
    buttonClick (cmd) {
      console.log(cmd)
      switch (cmd) {
        case 'refresh' :
          this.getDeviceList()
          if (this.$root.currentDevice.status === '离线') {
            this.currentDeviceId = ''
          }
          break
        case 'select' :
          // TODO 判断是否在线
          if (this.currentRow) {
            if (this.currentRow.status === '离线') {
              this.showDialog = true
              this.dialogMsg = '无法控制离线设备，请选择在线设备'
              break
            }
            this.$root.currentDevice = this.currentRow
            this.currentDeviceId = this.currentRow.id
          } else {
            this.showDialog = true
            this.dialogMsg = '请先选择一个在线设备'
          }
          break
        case 'dialogConfirm' :
          this.showDialog = false
          this.dialogMsg = ''
          break
        default :
          break
      }
    },
    getTemplateRow (index, row) {
      console(index)
    },
    showRow (row) {
      // 赋值给radio
      // this.radio = this.devices.indexOf(row)
    },
    /* urrent-change    当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性    currentRow, oldCurrentRow */
    handleCurrentChange (val) {
      this.currentRow = val
      console.log('----handleCurrentChange-----')
      console.log(val)
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
