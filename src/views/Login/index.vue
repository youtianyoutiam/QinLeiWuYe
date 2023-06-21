<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="login">
    <div class="login-con">
      <div class="menu-tab">
        <ul>
          <li v-for="(v) in MenuData" :key="v.type" :class="{ current: v.current, currenta: !v.current }"
            @click="clickMenu(v)">
            {{ v.txt }}
          </li>
        </ul>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
          <el-form-item prop="username">
            <lable>邮箱</lable>
            <el-input v-model="ruleForm.username" type="email" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="password">
            <lable>密码</lable>
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item v-show="model === 2" prop="refpassword">
            <lable>重置密码</lable>
            <el-input v-model="ruleForm.refpassword" type="password" autocomplete="off" minlength="6" maxlength="15" />
          </el-form-item>
          <el-form-item>
            <el-button class="login-DL" type="primary"
              @click="submitForm(ruleFormRef)">{{ model === 1 ? '登录' : '注册' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import ck from "../../util/verfifcation";
// import * as ck from "../../util/verfifcation.js"
import { reactive, ref, onMounted } from 'vue';
// @ts-ignore
import apiUrl from "../../api/url.js";
// @ts-ignore
import link from "../../api/Link.js";
// @ts-ignore
import md5 from "../../hock/login.js";
import { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
const store = useStore()
const router = useRouter();
// import  ck from "";
onMounted(() => {
  // //查看当前环境的URL
  // console.log(process.env.VUE_APP_API + apiUrl.url);
  // //查看当前环境
  // console.log(process.env.NODE_ENV);
})
const MenuData = reactive([
  { txt: "登录", current: true, type: 1 },
  { txt: "注册", current: false, type: 2 },])

// 定义一个变量
let model = ref(1);

let clickMenu = (item: { current: boolean; type: number; }) => {
  MenuData.forEach((elemt) => {
    elemt.current = false;
  })
  item.current = true;
  //使用要加上value
  model.value = item.type
}

// Elementpuls表单校验
const ruleFormRef = ref<FormInstance>()

//邮箱校验规则
const checkUser = (rule: any, value: any, callback: any) => {
  // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  } else if (ck.CkEmail(value)) {
    return callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
//密码校验规则
const validatePass = (rule: any, value: any, callback: any) => {
  // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;// 验证密码 6至15位的字母+数字
  if (!value) {
    callback(new Error('密码不可为空'))
  } else if (ck.CkPaworld(value)) {
    callback(new Error('密码格式错误'))
  } else {
    callback()
  }
}
//重复密码校验规则
const validatePass2 = (rule: any, value: any, callback: any) => {
  //如果是登录者取消检验
  if (model.value === 1) {
    callback()
  } else {
    if (value === '') {
      callback(new Error('重复密码不能为空'))
    } else if (value !== ruleForm.password) {
      callback(new Error("两次密码不一致"))
    } else {
      callback()
    }
  }
}
//数据
const ruleForm = reactive({
  //邮箱
  username: "123@qq.com",
  //密码
  password: "adadad3131dq",
  // 重复密码
  refpassword: "adadad3131dq",
  // pass: '',
  // checkPass: '',
  // age: '',
})
// 这里是设置 以那种方式触发校验
const rules = reactive<FormRules>({
  //邮箱校验规则
  username: [{ validator: checkUser, trigger: 'blur' }],
  //密码校验规
  password: [{ validator: validatePass, trigger: 'blur' }],
  //重复密码校验规
  refpassword: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // console.log('submit!')
      if (model.value === 1) {
        link(apiUrl.url).then((ok: any) => {
          // console.log(ok.data);
          const flag = ok.data.find((i: any) => {
            return i.name == ruleForm.username && i.pwd == md5(ruleForm.password).value
          })
          // console.log(flag);
          if (flag) {
            console.log(flag, 'flagflagflag');
            store.commit('UserAccountIDIng', flag.id)
            // alert("登录成功")
            // 登录成功后跳转
            router.push({ name: "DataStatistics" })
          } else {
            alert("账号不存在或密码错误")
          }
          // console.log(flag);
          // console.log(ok);
          // console.log("登录成功");
          // let getName: any = [];

          // ok.data.forEach((i: any) => {
          //   // getName.push({
          //   //   name: i.name,
          //   //   pwd: i.pwd
          //   // })
          //   console.log(i);

          // })
          // console.log(getName);
          // let flag = getName.some((i: any) => {
          //   return i.name == ruleForm.username && i.pwd == ruleForm.password
          // })
          // console.log(flag);

          // getName.forEach((i: any) => {
          //   if (i.name == ruleForm.username && i.pwd == ruleForm.password) {
          //     // alert('成功')
          //     return alert('成功')
          //   } else {
          //   }
          // });
        })
      } else {
        let data = reactive({
          name: ruleForm.username,
          pwd: md5(ruleForm.password).value
        })
        // console.log(data);
        //先发一个请求判断是否重复
        link(apiUrl.url).then((ok: any) => {
          // console.log(ok.data[0].name);
          let QB: any = []
          ok.data.forEach((v: any) => {
            QB.push(v.name)
          })
          const list = QB.find((i: any) => { return i === data.name })
          if (list) {
            alert('当前账号已被注册')
          } else {
            link(apiUrl.url, "POST", data).then((ok: any) => {
              // console.log(ok);
              // console.log(Object.keys(ok.data).length);
              if (Object.keys(ok.data).length) {
                //样式不生效
                // ElMessage({
                //   message: 'this is a message.',
                //   grouping: true,
                //   type: 'success',
                // })
                alert('注册成功')
                model.value = 1;
                MenuData.forEach(v => {
                  v.current = false;
                })
                MenuData[0].current = true
              } else {
                // 注册失败
                alert('注册失败')
              }
            })
          }
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style lang="scss">
.login {
  // background-color: blue;
  height: 100%;
}

html,
body,
#app {
  height: 100%;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    // color: white;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 20px;
  }
}

.currenta {
  background-color: white;
}

.current {
  background-color: pink;
}

.demo-ruleForm {
  width: 30%;
  margin: 20px auto;

  label {
    display: block;
    // margin-bottom:5px; 
  }
}

.login-DL {
  width: 100%;
  margin-top: 20px;
  border-radius: 100px;
}

.gissearch .x-toolbar-ct {
  padding-left: 165px;
  transform: translate(14%, 0);
}
</style>
