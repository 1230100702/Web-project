<template>
  <div class="history-page">

    <div class="history-card">

      <h1>Summary History</h1>

      <p class="subtitle">
        Here are your previously summarized PDF files.
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
            <td>30 Jun 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Software Engineering.pdf</td>
            <td>29 Jun 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Database System.pdf</td>
            <td>28 Jun 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Operating System.pdf</td>
            <td>27 Jun 2026</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Networking.pdf</td>
            <td>26 Jun 2026</td>
            <td>Completed</td>
          </tr>
        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
// No JavaScript required
</script>

<style scoped>

.history-page{
    min-height:100vh;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
    display:flex;
    justify-content:center;
    align-items:center;
    padding:40px;
}

.history-card{
    width:900px;
    background:white;
    border-radius:18px;
    padding:40px;
    box-shadow:0 10px 25px rgba(0,0,0,0.25);
}

h1{
    text-align:center;
    color:#6C63FF;
    margin-bottom:10px;
    font-size:34px;
}

.subtitle{
    text-align:center;
    color:#666;
    margin-bottom:30px;
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
    font-size:18px;
}

td{
    padding:15px;
    text-align:center;
    border-bottom:1px solid #ddd;
    font-size:16px;
}

tbody tr:nth-child(even){
    background:#F8F8FF;
}

tbody tr:hover{
    background:#FFE8E0;
}

</style>