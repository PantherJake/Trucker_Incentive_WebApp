<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
  <router-link :to="{ name: 'CartPage'}">
    <i class="fa fa-shopping-cart" style="font-size:70px;color:black"></i>
  </router-link>
  <div class="dot">
    <router-link :to="{ name: 'ProfilePage' }">
      <div class="dot-text">Profile</div>
    </router-link>
  </div>
  <div class="dot" @click="signOut">
    <router-link :to="{ name: 'LogInPage' }">
      <div class="dot-text">Sign Out</div>
    </router-link>
  </div>
  <img class="logo" src="../../assets/appLogoSmall.png" alt=""/>
  <h1> {{ this.name }}'s Catalog </h1>
  <div class="topnav">
    <router-link :to="{ name: 'DriverDashboardPage'}">
      <a href="/driverdashboard">Home</a>
    </router-link>
    <router-link :to="{ name: 'DriverPointsPage'}">
      <a href="driverdashboard/points">Points</a>
    </router-link>
    <router-link :to="{ name: 'DriverCatalogPage'}">
      <a class="active" href="driverdashboard/catalog">Catalog</a>
    </router-link>
  </div>
  <br>
  <div class="mainbox">
    <p>Welcome to the Catalog for your Sponsor!</p>
    <select class="mediaInput" name="searchOption" v-model="this.mediaType" id="searchOption">
      <option value="music">Music</option>
      <option value="movie">Movie</option>
      <option value="podcast">Podcast</option>
      <option value="musicVideo">Music Video</option>
      <option value="audiobook">Audiobook</option>
      <option value="shortFilm">Short Film</option>
      <option value="tvShow">TV Show</option>
      <option value="software">Software</option>
      <option value="ebook">Ebook</option>
      <option value="all">All</option>
    </select>
    <input class="searchText" v-model="this.mediaInput" placeholder="Type keywords"/>
    <button class="searchButton" @click="getMedia()">Search</button>
    <div v-for="result in this.m.results" :key="result">
      <div class="row">
        <div class="column">
          <img :src=result.artworkUrl100 alt=""/>
          <p>{{result.trackName}}</p>
          <p>{{result.artistName}}</p>
          <p>Price: ${{result.trackPrice}}</p>
          <button class="add">Add to Cart</button>
        </div>
      </div>
    </div>
    <br>
    {{ this.noResults }}
  </div>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";
import {itunesApiRequestMedia} from "@/components/iTunesAPI";

export default {
  name: "CartPage",
  data() {
    return {
      name: '',
      userObj: '',
      user: [],

      mediaInput: '',
      mediaType: '',
      media: '',
      m: [],
      noResults: "",
      isResults: false
    }
  },
  async created() {
    try {
      this.userObj = await Auth.currentAuthenticatedUser()
          .then(response => this.userObj = JSON.stringify(response))
          .catch(e => console.log(e))
      this.user = JSON.parse(this.userObj)
      this.name = this.user.attributes.given_name
    } catch(e) {
      console.log(e)
      console.log("FATAL: No user authenticated")
      await router.push('/login')
    }
  },
  methods: {
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    },
    async getMedia() {
      this.media = await itunesApiRequestMedia(this.mediaInput, this.mediaType);
      this.m = JSON.parse(this.media)
      if(this.m.resultCount === 0) {
        this.noResults = "No search results found"
        this.isResults = false
      }
      else {
        this.isResults = true
      }
    },
  }
}
</script>

<style>
Body {
  font-family: Calibri, Helvetica, sans-serif;
  background-color: #008037;
  font-size: 20px;
}
.topnav {
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  background-color: #7ed957;
  border-style: solid;
  text-align: center;
  justify-content: center;
  display: flex;
  filter: drop-shadow(10px 8px 8px black);
}
.topnav a {
  color: black;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
.topnav a.active {
  background-color: #c9e265;
  color: black;
}
.right {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 10px;
}
a {
  color: black;
  text-decoration: none;
}
a:hover{
  color: white;
}
ul.breadcrumb{
  list-style: none;
  background-color: #008037;
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumb li+li:before {
  padding: 5px;
  color: black;
  content: "/\00a0";
}
.dot {
  height: 75px;
  width: 75px;
  background: #7ed957;
  border-radius: 50%;
  float: right;
  line-height: 0;
  position: relative;
  margin-top: 10px;
  margin-right: 20px;
  background: linear-gradient(135deg, #c9e265 10%,#008037 100%);
  filter: drop-shadow(10px 8px 8px black);
}
.dot-text{
  position: absolute;
  bottom: 50%;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.mainbox {
  overflow: auto;
  background-color: #7ed957;
  width: 800px;
  height: 25rem;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color: #c9e265;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  text-align: center;
}
.logo {
  display: block;
  margin-left: 42rem;
  margin-right: auto;
}
p {
  text-align: center;
}
.mediaInput {
  margin-top: 0;
  margin-left: 8rem;
  margin-right: 1rem;
  width: 10rem;
  height: 4rem;
}
.searchButton {
  margin-top: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 10rem;
  height: 4rem;
}
.searchText {
  margin-top: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 10rem;
  height: 4rem;
}
.column {
  float: left;
  width: 25%;
}
p {
  font-size: 1rem;
  margin: 0;
}
.add {
  width: 8rem;
  display: block;
  margin: auto;
}
</style>