<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <!-- <SignUp></SignUp> -->
  <LoginPage></LoginPage>
  <ContactSupport></ContactSupport>
</template>

<script>
// import SignUpPage from './components/SignUpPage.vue'
import LoginPage from './components/LoginPage.vue';
import ContactSupport from './components/extras/ContactSupport.vue';

export default {
  name: 'App',
  components: {
    // SignUp: SignUpPage
    LoginPage,
    ContactSupport
}
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
