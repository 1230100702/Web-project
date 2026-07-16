<template>
  <div class="upload-page">

    <UploadForm
      @file-selected="handleFileSelected"
    />

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import UploadForm from '../component/UploadForm.vue'
import { addFile } from '../store/fileStore'

const router = useRouter()

function handleFileSelected(fileName) {

  addFile(fileName)

  router.push({
    path: '/summary',
    query: {
      file: fileName
    }
  })

}
</script>

<style scoped>

.upload-page{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
    padding:40px 20px;
}

</style>