<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Home Page </title>
  </head>
    <body>
        <img src="../assets/appLogo.png"  alt=""/>
        <router-link :to="{ name: 'LogInPage'}">
          <button>
            Log In
          </button>
        </router-link>

        <router-link :to="{ name: 'ApplicationPage'}">
          <button>
            Apply Now
          </button>
        </router-link>
    </body>
  </html>
</template>

<style>
Body {
  font-family: Calibri, Helvetica, sans-serif;
  background-color: #008037;
  font-size: 20px;
}
button {
  background-color: #c9e265;
  width: 100%;
  color: black;
  padding: 15px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
form {
  border: 3px solid #7ed957;
}
button:hover {
  opacity: 0.7;
}
</style>
