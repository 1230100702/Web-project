<template>
  <div class="summary-page">

    <h1>Summary Result</h1>

    <div class="summary-box">

      <div v-if="fileName">

        <h3>Uploaded File</h3>

        <p class="file-name">
          {{ fileName }}
        </p>

        <h3>Summary</h3>

        <p>
          This is the summary of your uploaded PDF.
        
        </p>

        <button @click="downloadSummary">
          Download Summary
        </button>

      </div>

      <div v-else>

        <h3>No PDF Uploaded</h3>

        <p>
          Please upload a PDF first to generate its summary.
        </p>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const fileName = route.query.file

function downloadSummary() {
  alert("Summary downloaded successfully.")
}
</script>

<style scoped>

.summary-page{
    min-height:100vh;
    padding:40px;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
}

h1{
    text-align:center;
    color:white;
    font-size:42px;
    margin-bottom:35px;
}

.summary-box{
    width:700px;
    margin:auto;
    background:white;
    border-radius:15px;
    padding:35px;
    box-shadow:0 10px 25px rgba;
}

h3{
    color:#6C63FF;
    font-size:26px;
    margin-top:15px;
}

.file-name{
    color:#FF8A65;
    font-weight:bold;
    font-size:18px;
    margin-bottom:25px;
}

p{
    color:#555;
    font-size:18px;
    line-height:30px;
}

button{
    margin-top:30px;
    background:#FF8A65;
    color:white;
    border:none;
    padding:14px 30px;
    border-radius:8px;
    font-size:17px;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#ff7043;
    transform:scale(1.05);
}

</style>