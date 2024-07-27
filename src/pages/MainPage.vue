<template>
    <page-layout>
        <template v-slot:content>
            <a-card title="Задачник" :style="{ maxWidth: '800px', margin: '0 auto' }">
                <a-card title="Добавление задачи">
                    <task-add-form></task-add-form>
                </a-card>
                <a-divider>Список задач</a-divider>
                <a-card :style="{ marginTop: '16px' }">
                    <task-list></task-list>
                </a-card>
            </a-card>
        </template>
    </page-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import PageLayout from '../components/layout/PageLayout.vue'
import TaskList from '../components/task/TaskList.vue'
import TaskAddForm from '../components/task/forms/TaskAddForm.vue'
const selectedKeys = ref<string[]>(['2']);
</script>
<style scoped>

</style>