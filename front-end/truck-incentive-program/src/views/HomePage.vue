<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Home Page </title>
  </head>
    <body>
        <router-link :to="{ name: 'LogInPage'}">
          <button>
            Log in
          </button>
        </router-link>

        <router-link :to="{ name: 'SignUpPage'}">
          <button>
            Sign up
          </button>
        </router-link>
    </body>
  </html>
</template>
