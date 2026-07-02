<template>
  <div class="home">

    <div class="home-box">

      <h1>PDF Summarizer</h1>

      <p>
        Upload your PDF file and get a clear and concise summary within seconds.
      </p>

      <router-link to="/upload">
        <button>Get Started</button>
      </router-link>

    </div>

  </div>
</template>

<script setup>
// No JavaScript needed
</script>

<style scoped>

.home{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
}

.home-box{
    width:700px;
    background:white;
    padding:50px;
    border-radius:15px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

h1{
    color:#6C63FF;
    font-size:45px;
    margin-bottom:20px;
}

p{
    color:#555;
    font-size:20px;
    line-height:30px;
    margin-bottom:35px;
}

button{
    background:#FF8A65;
    color:white;
    border:none;
    padding:14px 30px;
    font-size:18px;
    border-radius:8px;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#ff7043;
    transform:scale(1.05);
}

</style>