import Storage from 'vue-ls';
import Vue from 'vue'

const options = {
  namespace: 'e-stu_', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};
Vue.use(Storage,options)
