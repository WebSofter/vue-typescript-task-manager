<template>
  <a-form :model="formState" v-bind="formItemLayout" layout="inline"
    :style="{ width: '100%', justifyContent: 'space-between' }">
    <a-form-item label="Метка" name="tag">
      <a-select ref="select" v-model:value="formState.tag" :options="optionsTag" @change="handleChange"
        :style="{ width: '100%' }"></a-select>
    </a-form-item>
    <a-form-item label="Статус" name="status">
      <a-select ref="select" v-model:value="formState.status" :options="optionStatus" @change="handleChange"
        :style="{ width: '100%' }"></a-select>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import { TaskStatus } from '@/types/task';
import { useTagStore, useTaskStore } from '@/stores';
import type { TFilter } from '@/types/form';
const tagStore = useTagStore()
const props = defineProps<{
  onFilter?: Function;
  modelValue?: TFilter
}>();
interface FormState {
  tag: string;
  status: string;
}
const emptyFilter: FormState = {
  tag: '',
  status: '',
}
const emptyOption = {
  value: '',
  label: 'Все',
}
const getStatusName = (value: string) => {
  if(value === 'completed') return 'Выполнено'
  if(value === 'active') return 'Активно'
  return value
}
const formState = reactive<FormState>(emptyFilter);
const optionsTag = ref<SelectProps['options']>([emptyOption, ...tagStore.tags])
const optionStatus = ref<SelectProps['options']>([emptyOption, ...Object.keys(TaskStatus).map((key, value) => ({ value: key, label: getStatusName(key), }))]);

const emit = defineEmits(['update:modelValue'])
function updateValue(value: TFilter) {
  emit('update:modelValue', value)
}
watch(
  () => [formState.status, formState.tag],
  () => {
    updateValue(formState)
  },
  { flush: 'post' },
);

const handleChange = (value: string) => {
  if (props.onFilter) props.onFilter(formState)
};

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
</script>

<style lang="css" scoped>
.ant-form > div.ant-form-item {
  display: block;
  width: 45%;
}
</style>