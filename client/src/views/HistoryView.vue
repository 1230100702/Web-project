<template>
  <div class="history-page">

    <div class="history-box">

      <h1>History</h1>

      <div v-if="fileStore.files.length">

        <ul>
          <li v-for="(file, index) in fileStore.files" :key="index">
            <strong>{{ file.name }}</strong><br>
            {{ file.date }}
          </li>
        </ul>

      </div>

      <div v-else>

        <p>No files uploaded yet.</p>

      </div>

    </div>

  </div>
</template>

<script setup>
import { fileStore } from '../store/fileStore'
</script>

<style scoped>

.history-page{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
}

.history-box{
    width:500px;
    background:white;
    padding:30px;
    border-radius:15px;
    box-shadow:0 5px 15px rgba(0,0,0,.2);
}

h1{
    text-align:center;
    color:#6C63FF;
    margin-bottom:20px;
}

ul{
    list-style:none;
    padding:0;
}

li{
    background:#F3F0FF;
    padding:12px;
    margin-bottom:10px;
    border-radius:8px;
    color:#333;
}

p{
    text-align:center;
    color:#666;
}

</style>