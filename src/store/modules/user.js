import Vue from "vue";
import { signin, signout, signup, getUser } from "@/api/common";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";
import loadRoute from "@/router/load-route.js";
import { createScriptTag } from "@/utils/load-script";

const getDefaultState = () => {
  return {
    token: "",
    avatar: "/defalut-avatar.png",
    userMenu: [],
    userInfo: {}
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Vue.ls.remove("userInfo");
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  // 动态添加权限路由
  ADD_ROUTES: (state, role) => {
    const allRoute = loadRoute(role);

    allRoute.forEach(r => {
      //添加权限路由
      router.addRoute(r);
      //把权限路由列表保存
      if (r.name == "Home") {
        state.userMenu = r.children;
      }
    });
  }
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      signin(userInfo)
        .then(response => {
          Vue.ls.set("userInfo", response);
          commit("SET_USER_INFO", response);
          commit("ADD_ROUTES", response.role);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      signup(userInfo).then(response => {
        //注册成功
        resolve(response);
      }, reject);
    });
  },
  // 获取用户
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userInfo = Vue.ls.get("userInfo");
      if (userInfo) {
        getUser(userInfo.id).then(res => {
          commit("SET_USER_INFO", res);
          commit("ADD_ROUTES", res.role);
          resolve();
        });
      } else {
        reject("获取用户信息失败");
      }
    });
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      signout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 删除 token
  resetToken({ commit, state }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
