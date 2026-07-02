<template>
  <div class="login-page">

    <div class="login-card">

      <h1>Welcome Back</h1>

      <p class="subtitle">
        Sign in to continue to PDF Summarizer
      </p>

      <form>

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
        >

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        >

        <button type="submit">
          Login
        </button>

      </form>

      <p class="register">
        Don't have an account?
        <a href="#">Register</a>
      </p>

    </div>

  </div>
</template>

<script setup>
// Frontend UI only
</script>

<style scoped>

.login-page{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#6C63FF,#FF8A65);
    padding:40px;
}

.login-card{
    width:420px;
    background:white;
    padding:40px;
    border-radius:18px;
    box-shadow:0 10px 25px rgba(0,0,0,.2);
}

h1{
    text-align:center;
    color:#6C63FF;
    font-size:36px;
    margin-bottom:10px;
}

.subtitle{
    text-align:center;
    color:#666;
    font-size:16px;
    margin-bottom:30px;
}

label{
    display:block;
    color:#444;
    font-weight:bold;
    margin-bottom:8px;
    margin-top:18px;
}

input{
    width:100%;
    padding:12px;
    border:1px solid #ccc;
    border-radius:8px;
    font-size:16px;
    box-sizing:border-box;
    transition:.3s;
}

input:focus{
    outline:none;
    border-color:#6C63FF;
    box-shadow:0 0 8px rgba(108,99,255,.3);
}

button{
    width:100%;
    margin-top:30px;
    padding:13px;
    border:none;
    border-radius:8px;
    background:#FF8A65;
    color:white;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#ff7043;
    transform:scale(1.03);
}

.register{
    text-align:center;
    margin-top:25px;
    color:#666;
    font-size:15px;
}

.register a{
    color:#6C63FF;
    text-decoration:none;
    font-weight:bold;
}

.register a:hover{
    text-decoration:underline;
}

</style>