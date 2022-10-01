<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Contact Support Button </title>
  </head>
  <body>
    <button @click="getPoints">
      <b>Contact Support</b>
    </button>
  </body>
  </html>
</template>

<script>
import axios from "axios";

export default {
  name: 'PointsButton',
  data() {
    return {
      data: ''
    }
  },
  methods: {
    getPoints: function() {
      axios
        .get('https://niiertdkbf.execute-api.us-east-1.amazonaws.com/test/users/3/points')
        .then(response => (this.data = response.data))
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>
.button {
  background-color: orange;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>