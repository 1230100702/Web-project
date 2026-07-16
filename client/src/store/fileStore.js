import { reactive } from 'vue'

export const fileStore = reactive({
  files: []
})

export function addFile(fileName) {
  fileStore.files.push({
    name: fileName,
    date: new Date().toLocaleString()
  })
}