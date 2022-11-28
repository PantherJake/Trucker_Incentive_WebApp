<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Admin Create User Page </title>
  </head>
  <body>
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
  <center> <img src="../../assets/appLogoSmall.png" /> </center>
  <center><h1> Admin HomePage </h1></center>
  <center><div class="topnav">
    <a href="/admindashboard">Home</a>
    <a class="active" href="/admindashboard/create">Create</a>
    <a href="/admindashboard/catalog">Catalog</a>
    <a href="/admindashboard/drivers">Drivers</a>
    <a href="/admindashboard/audits">Audits</a>
  </div></center>
  <center><ul class="breadcrumb">
    <li><a href="/admindashboard">Create a User</a></li>
  </ul></center>
  <form v-if="this.isNotValid">
    <center><div>
      <select class="mediaInput" name="Select Type of user" v-model="this.userType" id="searchOption">
        <option value="3">Driver</option>
        <option value="2">Sponsor</option>
        <option value="1">Admin</option>
      </select>
      <button class="searchButton" @click="getType()">Submit</button>

    </div>
    </center>
    <center><div v-show=this.show_input  class="mainbox">
      <label>Email : </label>
      <input type="text" v-model="useremail" placeholder="Enter Email" required>
      <label>Password : (At least 1 uppercase, 1 lowercase and 1 special character and at least 8 characters long)</label>
      <input type="password" v-model="password" placeholder="Enter Password"  required>
      <label>Organization ID: (needs to be a number) </label>
      <input type="text" v-model="createOrgID" placeholder="Enter Organization ID"  required>
      <label>First name : </label>
      <input type="text" v-model="fname" placeholder="Enter First Name" required>
      <label>Middle name : </label>
      <input type="text" v-model="mname" placeholder="Enter Middle Name" required>
      <label>Last name : </label>
      <input type="text" v-model="lname" placeholder="Enter Last Name" required>
      <label v-show=this.driverinfo >Drivers License # : </label>
      <input v-show=this.driverinfo type="text" v-model="DLnumber" placeholder="Enter DL#" required>
      <label>Phone Number : (need country code +1 in front)</label>
      <input type="text" v-model="phone" placeholder="Home/Mobile Phone" required>
      <label v-show=this.driverinfo>Home Address : </label>
      <input v-show=this.driverinfo type="text" v-model="address" placeholder="Home Address" required>
      {{ this.errorMessage }}
      <br>
      {{ this.dbError }}

      <button type="button" @click="createAccount()">Create User</button>
    </div></center>
  </form>
  <form v-else>
    <div class="container">
      <label>Verification Code : </label>
      <input type="text" v-model="code" placeholder="Enter verification code" required>
      {{ this.errorMessage }}
      <button type="button" @click="verifyEmail()">Submit</button>
      <button type="button" @click="resendConfirmationCode()">Resend Code</button>
    </div>
  </form>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";

export default {
  name: 'DriverPoints',
  data() {
    return {
      orgID: '', // need to attach that to current user
      driverID: '', // need to attach that to current user
      createOrgID: '',
      // createOrgID: '',

      userType: '',
      driverinfo: false,
      show_input: false,
      userObj: '',
      user: [],
      name: '',
      useremail: '',
      email: '',

      AppObj: '',
      applications: [],

      dbObj: '',
      db: [],
      username: '',
      password: '',
      fname: '',
      mname: '',
      lname: '',
      DLnumber: '',
      phone: '',
      address: '',
      role: '',
      orgid: '',
      createObj: '',

      isRemember: false,
      isValid: false,
      isNotValid: true,
      code: '',
      errorMessage: '',
      dbError: ''
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
// Max functions
//    need to specify which organization they want to see the Point data or if we should just show all of it!

    try {
      this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
          'username': this.user.username
        },
      }).then((response) => response.json()).catch(e => console.log(e))
    } catch (error) {
      console.log(error)
      this.errorMessage="Error fetching user data from database"
    }
    if(this.dbObj.statusCode === 200) {
      console.log("User data retrieved succesfully:")
      console.log(this.dbObj.body.users)
    }
    // this.driverID = this.dbObj.body.users[`${this.user.username}`]["user_id"]
    this.orgID = this.dbObj.body.users[`${this.user.username}`]["org_id"]
    //function to get points of a driver for many organizations
    // try{
    //   console.log("Getting Application information from DB")
    //   this.AppObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/application", {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
    //       'username': this.user.username
    //     },
    //   }).then((response) => response.json()).catch(e => console.log(e));
    //   console.log(this.AppObj)
    // } catch (error) {
    //   console.log(error);
    // }
    // if(this.AppObj.statusCode === 200) {
    //   console.log("Successfully got the Applications json!")
    // }
  },
  methods: {
    async me(){
      //  me function
      try {
        this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.user.username
          },
        }).then((response) => response.json()).catch(e => console.log(e))
      } catch (error) {
        console.log(error)
        this.errorMessage = "Error fetching user data from database"
      }
      if (this.dbObj.statusCode === 200) {
        console.log("User data retrieved succesfully:")
        console.log(this.dbObj.body.users)
      }
      // this.userid= this.dbObj.body.users[`${this.email}`]["user_id"]
      // this.orgID = this.dbObj.body.users[`${this.email}`]["org_id"]
      // localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])
      // localStorage.setItem('status', this.dbObj.statusCode)
    },
    async verifyEmail() {
      await Auth.confirmSignUp(this.useremail, this.code)
          .then(() => {
            console.log('Email verified');
            router.push('/');
          }).catch(e => {
            this.errorMessage = e;
            console.log('failed with error', e);
          });
    },
    async resendConfirmationCode() {
      try {
        await Auth.resendSignUp(this.useremail);
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }
    },

    async createAccount() {
      this.errorMessage = '';
      this.isNotValid = true;
      this.me()
      console.log("Admin data:")
      console.log(this.user.username)
      console.log(this.dbObj.body.users[`${this.user.username}`]["user_role_id"])
      console.log("Create user data: ")
      console.log(this.useremail)
      console.log(this.password)
      console.log(this.userType)
      console.log(this.createOrgID)

      try {
        console.log("Initiating database connection");
        this.createObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.user.username
          },
          body: JSON.stringify({
            path: {},
            params: {
              querystring: {
                orgid: this.createOrgID,
                role_id: this.userType,
                fname: this.fname,
                mname: this.mname,
                lname: this.lname,
                email: this.useremail,
                dl_num: this.DLnumber,
                address: this.address
              },
              header: {
                username: this.user.username
              }
            },
          })
        }).then((response) => response.json()).catch(e => console.log(e));
      } catch (error) {
        console.log(error);
        this.dbError = "Could not establish database connection, please contact support";
      }
      console.log("Connection established")
      console.log(this.createObj)

      try {
        console.log("Initiating cognito authentication")
        await Auth.signUp({
          username: this.useremail,
          password: this.password,
          attributes: {
            email: this.useremail,
            name: `${this.fname} ${this.lname}`,
            given_name: this.fname,
            family_name: this.lname,
            middle_name: this.mname,
            phone_number: this.phone
          },
        }).then(response => this.userObj = JSON.stringify(response)).catch(e => this.errorMessage = e)
        if(this.userObj) this.user = JSON.parse(this.userObj)
        console.log("Cognito connection established")

        if(this.createObj.statusCode === 400) {
          this.dbError = this.createObj.body.message
        }
        if(this.createObj.statusCode === 200) {
          console.log("User is created in database")
          this.isValid = true;
          this.isNotValid = false;
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error;
      }
    },

    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    },
    getType(){
      console.log(this.userType)
      if(this.userType === '3'){
        this.show_input = true
        this.driverinfo = true
      }
      if(this.userType=== '2' || this.userType === '1'){
        this.show_input = true
        this.driverinfo = false
      }
    }
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
  right: 0px;
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
  background-color: #7ed957;
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
.mainbox{
  background-color:#7ed957;
  width: 600px;
  height: 300px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color:#c9e265;
}
input[type=text], input[type=password] {
  width: 100%;
  margin: 8px 0;
  padding: 12px 20px;
  display: inline-block;
  border: 2px solid #c9e265;
  box-sizing: border-box;
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
</style>