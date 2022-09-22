<template>
  <!-- <SignUp></SignUp> -->
  <LoginPage></LoginPage>
</template>

<script>
// import SignUpPage from './components/SignUpPage.vue'
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    // SignUp: SignUpPage
    LoginPage,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
