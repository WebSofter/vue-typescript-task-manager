import type { TFilter } from '@/types/form'
import type { ITag } from '@/types/tag'
import { TaskStatus, type ITask } from '@/types/task'
import { defineStore } from 'pinia'

const STORE_NAME = 'task'

const defaultTask: ITask = {
  pk: '',
  name: '',
  description: '',
  tags: [],
  datetime: '',
  status: TaskStatus.active
}

const getDefaultTasks = () => (defaultTask)

const getTasks = () => {
  const tasks = localStorage.getItem(STORE_NAME)
  return tasks ? JSON.parse(tasks) : []
}
const saveTasks = (tasks: ITask[]) => localStorage.setItem(STORE_NAME, JSON.stringify(tasks))
export const useTaskStore = defineStore(STORE_NAME, {
  state: () => ({
    tasks: getTasks(),
  }),
  actions: {
    getTaskEmpty(): ITask {
      return getDefaultTasks()
    },
    getTaskByPk(pk: string): ITask {
      return this.tasks.find((task: ITask) => task.pk === pk)
    },
    getTasks(offset: number, limit: number): ITask[] {
      if(limit < 0) return this.tasks.slice(offset);
      return this.tasks.slice(offset, offset + limit);
    },
    addTask(task: ITask) {
      this.tasks.unshift(task)
      saveTasks(this.tasks)
    },
    getTaskFiltered(filter: TFilter, offset: number, limit: number) {
      const tasks_ = this.tasks.filter((task: ITask) => {
        // Если выбраны оба фильтра
        if(filter.tag && filter.status) {
          if(task.status === filter.status && task.tags.map(tag => tag.value.toLowerCase()).includes(filter.tag.toLowerCase())) {
            return true
          } else {
            return false
          }
        }

        // Если выбран один из фильтров
        if (filter.tag && task.tags.map(tag => tag.value.toLowerCase()).includes(filter.tag.toLowerCase())) return true
        if (filter.status && task.status === filter.status) return true
        
        // Если фильтр не выбран
        return false
      })
      if(limit < 0) return tasks_.slice(offset);
      return tasks_.slice(offset, offset + limit);
    },
    removeTaskByPk(pk: string) {
      this.tasks = this.tasks.filter((task: ITask) => task.pk !== pk)
      saveTasks(this.tasks)
    },
    removeTaskByIndex(index: number) {
      this.tasks = this.tasks.filter((task: ITask, i: number) => i !== index)
      saveTasks(this.tasks)
    },
    updateTaskByPk(pk: string, task: ITask) {
      this.tasks = this.tasks.map((t: ITask) => {
        if (t.pk === pk) return task
        return t
      })
      saveTasks(this.tasks)
    }
  },
})