<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    open a Form nested Dialog
  </el-button>
  <el-dialog v-model="store.state.HomeModule.dialogAdditionForm" title="请输入你要添加的内容" :before-close="CancelButton">
    <el-form :model="form">
      <el-form-item label="编号" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off" @input="(v: any) => (form.id = v.replace(/[^\d]/g, ''))" />
      </el-form-item>
      <el-form-item label="楼盘地址" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择房源类型">
          <el-option label="住户" value="住户"></el-option>
          <el-option label="商铺" value="商铺"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门牌号" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="CancelButton">取消</el-button>
        <el-button type="primary" @click="DefiniteAddition">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

let props = defineProps(['userget']);

let store = useStore()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
let form = reactive({
  id: '',
  title: "",
  type: "",
  num: "",
  name: ""
})
//取消关闭按钮
let CancelButton = () => {
  store.commit('UserAdditionForm');
  form = reactive({
    id: '',
    title: "",
    type: "",
    num: "",
    name: ""
  })
}
//点击确定按钮
let DefiniteAddition = async () => {
  // store.commit('UserAdditionForm');
  if (form.id && form.title && form.type && form.num && form.name) {
    await store.dispatch('UserAdditionForms', form);
    props.userget();
    form = reactive({
      id: '',
      title: "",
      type: "",
      num: "",
      name: ""
    })
  } else {
    alert('不可以为空')
  }
}
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>