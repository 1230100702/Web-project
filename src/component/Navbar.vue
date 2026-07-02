<template>
  <nav class="navbar">

    <div class="logo">
      PDF Summarizer
    </div>

    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/upload">Upload</router-link>
      <router-link to="/summary">Summary</router-link>
      <router-link to="/history">History</router-link>
      <router-link to="/login">Login</router-link>
    </div>

  </nav>
</template>

<script setup>

</script>

<style scoped>

.navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:18px 40px;
    background:linear-gradient(90deg,#4942c5d7,#FF8A65);
    box-shadow:0 3px 10px (0,0,0,0.2);
}

.logo{
    color:white;
    font-size:26px;
    font-weight:bold;
    letter-spacing:1px;
}

.nav-links{
    display:flex;
    gap:25px;
}

.nav-links a{
    color:white;
    text-decoration:none;
    font-size:18px;
    font-weight:500;
    padding:8px 14px;
    border-radius:6px;
    transition:0.3s;
}

.nav-links a:hover{
    background:rgba(255,255,255,0.2);
}

.router-link-active{
    background:white;
    color:#6C63FF !important;
    font-weight:bold;
}

</style>