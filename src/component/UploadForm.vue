<template>
  <div class="upload-box">

    <h2>Upload PDF</h2>

    <p>Select PDF file to generate its summary</p>

    <input
      type="file"
      accept=".pdf"
      @change="selectFile"
    />

    <button @click="uploadFile">
      Upload
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])

const selectedFile = ref(null)

function selectFile(event) {
  selectedFile.value = event.target.files[0]
}

function uploadFile() {
  if (selectedFile.value) {
    emit('file-selected', selectedFile.value.name)
  } else {
    alert('Please select a PDF first.')
  }
}
</script>

<style scoped>

.upload-box{
    width:500px;
    background:white;
    padding:40px;
    border-radius:15px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,.2);

    display:flex;
    flex-direction:column;
    align-items:center;
}

h2{
    color:#6C63FF;
    font-size:36px;
    margin-bottom:15px;
}

p{
    color:#555;
    font-size:18px;
    margin-bottom:25px;
}

input{
    margin-bottom:30px;
}

button{
    width:180px;
    padding:12px;
    border:none;
    border-radius:8px;
    background:#FF8A65;
    color:white;
    font-size:18px;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#ff7043;
    transform:scale(1.05);
}

</style>