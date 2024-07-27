<template>
  <a-flex gap="middle" vertical>
    <a-list-item-meta vertical="true">
      <template #title>
        <a href="#">{{ item.name }}</a>
      </template>
    </a-list-item-meta>
    <a-space :size="[0, 'small']" wrap vertical="true">
      {{ item.description }}
    </a-space>
    <a-space :size="[0, 'small']" wrap vertical="true">
      {{ item.status === 'active' ? 'В работе' : 'Выполнено' }}
    </a-space>
    <a-space :size="[0, 'small']" wrap vertical="true">
      <a-tag v-for="tag in item.tags" :bordered="false" color="processing">{{ tag.name }}</a-tag>
    </a-space>
    <a-space :size="[0, 'small']" wrap vertical="true">
      <clock-circle-outlined /> &nbsp; {{ item.datetime }}
    </a-space>
    <div vertical="true">
      <a-button :disabled="item.status !== 'active'" type="primary"
        @click="() => changeStatus(item, 'completed')">Выполнено</a-button> &nbsp;
      <a-button @click="() => removeTask(item.pk)">Удалить</a-button>
    </div>
  </a-flex>
</template>

<script lang="ts" setup>
import type { ITask } from '@/types/task';
import { computed } from 'vue';
import {
  ClockCircleOutlined,
} from '@ant-design/icons-vue';
const props = defineProps<{
  changeStatus?: Function;
  removeTask?: Function;
  item: ITask
}>();
const item = computed(()=> props.item)
const changeStatus = (task: ITask, status: string): void => props.changeStatus && props.changeStatus(task, status)
const removeTask = (pk: string | undefined): void => props.removeTask && props.removeTask(pk)
</script>