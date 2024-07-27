<template>
  <a-form ref="formRef" :model="formState" name="dynamic_rule" v-bind="formItemLayout" layout="vertical">
    <a-form-item label="Название" name="name" :rules="[{ required: true, message: 'Необходимо ввести имя!' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>

    <a-form-item label="Описание" name="description"
      :rules="[{ required: true, message: 'Необходимо ввести описание!' }]">
      <a-textarea v-model:value="formState.description" />
    </a-form-item>
    <a-form-item label="Метки" name="tags" :rules="[{ required: true, message: 'Необходимо ввести метку!' }]">
      <a-select v-model:value="formState.tags" mode="tags" placeholder="Теги задачи" :options="options"
        @change="handleChange" @search="handleTypeTag"></a-select>
    </a-form-item>
    <a-form-item v-bind="formTailLayout">
      <a-button type="primary" @click="onSubmit">Добавить</a-button> &nbsp;
      <a-button style="margin-left: 10px" @click="onReset">Сброосить</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useTagStore, useTaskStore } from '@/stores';
import type { IFormState, IInputEvent } from '@/types/form';
import { getCurrentDateTime } from '@/utils/time';
import { TaskStatus, type ITask } from '@/types/task';
import { pkByText } from '@/utils/text';

const tagStore = useTagStore()
const taskStore = useTaskStore()
const tagsFromArray = (data: any[]) => data.map(t => ({ name: t, value: t.toString() }))
const handleChange = (value: string[]) => {
  const tags = tagsFromArray(value)
  tagStore.addTags(tags)
};

const formRef = ref<FormInstance | undefined>();
const formState = reactive<IFormState>(taskStore.getTaskEmpty());
watch(
  () => [formState.name, formState.description, formState.tags],
  () => {
    formRef.value && formRef.value.validateFields(['name', 'description', 'tags']);
  },
  { flush: 'post' },
);
const options = computed(() => tagStore.tags)
const onReset = () => formRef.value!.resetFields();
const onSubmit = async (e: IInputEvent) => {
  e.preventDefault()
  try {
    await formRef.value!.validateFields();
    const datetime = getCurrentDateTime()
    const task: ITask = { ...formState, ...{ pk: pkByText(datetime), datetime, status: TaskStatus.active, tags: tagsFromArray(formState.tags) } }
    taskStore.addTask(task)
    onReset()
  } catch (errorInfo) {
    console.error('Failed:', errorInfo);
  }
};
const handleTypeTag = async (e: string) => {
  if(e.includes(',')) {
    const tag_ = e.replace(/[^\w\s\d]+/gi, '');
    formState.tags.push({name: tag_, value: tag_})
  }
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};
</script>