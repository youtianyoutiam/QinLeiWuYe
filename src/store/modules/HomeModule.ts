// 忽略本文ts语法检查
// @ts-ignore
import link from "../../api/Link.js";
// @ts-ignore
import apiUrl from "../../api/url.js";

let HomeModule: Object = {
  state: {
    //用户账号ID
    UserAccountID: '',

    navBool: false,
    //用户添加对话框
    dialogAdditionForm: false,
    //用户修改弹窗是否显示
    dialogTableVisible: false,
    //户主ID  修改数据的ID
    UserModificationID: '',
    //修改的数据
    UserModificationData: {},
  },
  actions: {
    //对用户修改数据进行修改
    async ChangeModifiedData(state: any) {
      await link(apiUrl.HouseholdInformation + "/" + state.state.UserModificationID, "patch", state.state.UserModificationData).then((ok: any) => {
        console.log(ok);
      })
    },
    //对用户添加数据
    async UserAdditionForms(state: any, payload: any) {
      state.commit('UserAdditionForm')
      console.log(payload, "actions");
      // let data = {
      //   id: payload.id,
      //   title: payload.title,
      //   type: payload.type,
      //   num: payload.num,
      //   hometype: payload.hometype,
      //   name: payload.name,
      // }
      await link(apiUrl.HouseholdInformation, "POST", payload).then((ok: any) => {
      }, (error: any) => {
        alert('当前编号已存在');
      })
    },
    //对用户修改数据进行修改
  },
  getters: {
  },
  mutations: {
    //获取当前账户ID
    UserAccountIDIng(state: any, stark: string) {
      state.UserAccountID = stark;
    },
    //导航隐藏
    aaa(state: any) {
      state.navBool = !state.navBool;
    },
    //添加用户弹出框
    UserAdditionForm(state: any) {
      state.dialogAdditionForm = !state.dialogAdditionForm
    },
    //修改用户数据弹出框
    UserModification(state: any) {
      state.dialogTableVisible = !state.dialogTableVisible
    },
    //修改户主的ID
    UserModificationID(state: any, stark: any) {
      console.log(state, stark.id, "1111111111111");
      state.UserModificationID = stark.id
    },
    //修改数据
    UserModificationData(state: any, stark: any) {
      state.UserModificationData = stark;
    },
  },
}

export default HomeModule