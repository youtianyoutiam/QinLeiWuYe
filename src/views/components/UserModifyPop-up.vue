<template>
  <!-- 用户修改 -->
  <el-dialog v-model="store.state.HomeModule.dialogTableVisible" title="请输入你要修改的数据" :before-close="ModifyCancel">
    <el-form :model="form" ref="editForm">
      <el-form-item label="楼盘地址：" :label-width="formLabelWidth" prop="searchKey">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源类型：" :label-width="formLabelWidth" prop="searchKey">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号：" :label-width="formLabelWidth" prop="searchKey">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主：" :label-width="formLabelWidth" prop="searchKey">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ModifyCancel()">取消</el-button>
        <el-button type="primary" @click="ModificationConfirmation">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import { useStore } from 'vuex';
let store = useStore();
let emit = defineEmits();
// @ts-ignore
const editForm = ref(null)
const formLabelWidth = '140px'

//修改填写的数据
let form = reactive({
  title: "",
  type: "",
  num: "",
  name: ""
})

//修改确定按钮
let ModificationConfirmation = async () => {
  if (form.title && form.type && form.num && form.name) {
    store.commit("UserModification");
    store.commit("UserModificationData", form);
    await store.dispatch("ChangeModifiedData");
    emit("JvBu", true);
    // @ts-ignore
    form = reactive({
      title: "",
      type: "",
      num: "",
      name: ""
    })
    // @ts-ignore
    editForm.value.resetFields()
    // console.log(editForm.value.resetFields, 'editForm');
  } else {
    alert('不要为空')
  }

}
//修改取消按钮
let ModifyCancel = () => {
  store.commit("UserModification");
  form = reactive({
    title: "",
    type: "",
    num: "",
    name: ""
  })
  // @ts-ignore
  editForm.value.resetFields()
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