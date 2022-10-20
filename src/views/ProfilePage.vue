<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
  </head>
  <body>
    <img src="@/assets/appLogoSmall.png" alt=""/>
    <h1> User's Profile </h1>
    <div class="mainbox">
      <div>
        Email :
        <button>Change Email</button>
      </div>
      <div>
        Password :
        <button>Change Password</button>
      </div>
    </div>
    <router-link :to="{ name: 'DriverDashboardPage'}">
      <button>Return to Dashboard</button>
    </router-link>
  </body>
  </html>
</template>

<script>

</script>

<style>
h1 {
  text-align: center;
}
img {
  display: block;
  margin-left: 42rem;
  margin-right: auto;
}
p {
  text-align: center;
}
.mainbox {
  background-color: #7ed957;
  width: 600px;
  height: 300px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color: #c9e265;
  margin-left: auto;
  margin-right: auto;
}
button {
  background-color: #c9e265;
  width: 600px;
  color: black;
  padding: 15px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>