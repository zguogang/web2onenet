import Vue from 'vue'
import Router from 'vue-router'
import Device from '@/components/device'
import Display from '@/components/display'
import Command from '@/components/command'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/device',
      name: 'device',
      component: Device
    },
    {
      path: '/display',
      name: 'display',
      component: Display
    },
    {
      path: '/command',
      name: 'command',
      component: Command
    }
  ]
})
