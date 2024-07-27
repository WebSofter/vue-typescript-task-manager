<template>
  <task-filter-form v-model:model-value="filterData"/>
  <a-list class="btn-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="taskList">
    <template #loadMore>
      <div v-if="!initLoading" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-button @click="onLoadMore" :disabled="taskStore.tasks.length <= taskList.length || taskList.length < limit">Больше...</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <task-item :item="item" :change-status="changeStatus" :remove-task="removeTask" />
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useTaskStore } from '@/stores';
import { type ITask } from '@/types/task';
import TaskItem from './TaskItem.vue'
import TaskFilterForm from './forms/TaskFilterForm.vue'
import type { TFilter } from '@/types/form';

const filterData = ref<TFilter>({
  tag: '',
  status: ''
})
const limit = ref(3);
const taskStore = useTaskStore()
const taskList = ref<ITask[]>([])
const initLoading = ref(true);
onMounted(() => {
  initLoading.value = false;
});
watchEffect(() => {
  if(filterData.value.tag || filterData.value.status) {
    taskList.value = taskStore.getTaskFiltered(filterData.value, 0, limit.value)
  } else {
    taskList.value = taskStore.getTasks(0, limit.value)
  }
    
})
const onLoadMore = () => {
  limit.value += limit.value
}
// const onFilter = (data: TFilter) => {
//   if (data.status || data.tag) taskList.value = taskStore.getTaskFiltered(data)
//   else taskList.value = taskStore.getTasks(0, limit.value)
// }
const changeStatus = (task: ITask, status: string) => {
  const task_: ITask = { ...task, ...{ status } } as ITask
  task.pk && taskStore.updateTaskByPk(task.pk, task_)
}
const removeTask = (pk: string) => taskStore.removeTaskByPk(pk)
</script>
<style scoped>
.btn-loadmore-list {
  min-height: 350px;
}
.ant-list-item {
  padding-left: 0px;
}
</style>