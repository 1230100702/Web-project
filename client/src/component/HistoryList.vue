<template>
  <div class="history-page">

    <div class="history-box">

      <h1>Summary History</h1>

      <p class="subtitle">
        View your previously summarized PDF files.
      </p>

      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>AI Notes.pdf</td>
            <td>30 June 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Software Engineering.pdf</td>
            <td>29 June 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Database.pdf</td>
            <td>28 June 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Operating System.pdf</td>
            <td>27 June 2026</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>

.history-page{
    min-height:100vh;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
    display:flex;
    justify-content:center;
    align-items:flex-start;
    padding:120px 20px 40px;
    box-sizing:border-box;
}

.history-box{
    width:900px;
    max-width:100%;
    background:white;
    border-radius:15px;
    padding:35px;
    box-shadow:0 8px 20px ;
}

h1{
    text-align:center;
    color:#6C63FF;
    margin-bottom:10px;
}

.subtitle{
    text-align:center;
    color:#666;
    margin-bottom:25px;
    font-size:18px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#6C63FF;
    color:white;
    padding:15px;
    font-size:17px;
}

td{
    padding:15px;
    text-align:center;
    border-bottom:1px solid #ddd;
}

tr:hover{
    background:#FFF4EF;
}

</style>