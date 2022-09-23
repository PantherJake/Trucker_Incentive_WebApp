<template>
  <!-- <SignUp></SignUp> -->
  <LogIn></LogIn>
</template>

<script>
// import SignUpPage from './components/SignUpPage.vue'
import LogIn from './components/LogIn.vue';

export default {
  name: 'App',
  components: {
    // SignUp: SignUpPage
    LogIn,
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
