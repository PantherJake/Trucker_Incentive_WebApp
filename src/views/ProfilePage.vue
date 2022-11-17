<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
  </head>
  <body>
    <img src="@/assets/appLogoSmall.png" alt=""/>
    <h1> {{ this.name }}'s Profile </h1>
    <div class="mainbox">
      <div>
        Email : {{ this.email }}
      </div>
      <div>
        <button>Change Password</button>
      </div>
      <div>
        <label>Changing Profile Information : </label><br/><br/>
        <table style = "border-collapse: collapse;">
          <tr>
            <th>Change</th>
            <th>Current</th>
          </tr>
          <tr>
            <td><input  v-model="fname" placeholder="First Name"/><br/></td>
            <td class="formlabel"><label >{{this.dbObj.body.users[`${this.user.username}`]['fname']}}:</label></td>
          </tr>
          <tr>
            <td><input v-model="mname" placeholder="Middle Name"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['mname']}}: </label></td>
          </tr>
          <tr>
            <td><input v-model="lname" placeholder="Last Name"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['lname']}}:</label></td>
          </tr>
          <tr>
            <td><input class = "tab1" v-model="dlnum" placeholder="Driver License"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['dl']}}:&nbsp; </label></td>
          </tr>
          <tr>
            <td><input v-model="address" placeholder="Address"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['address']}}:&nbsp; </label></td>
          </tr>
        </table>

        <button @click="changeProfile()" > Change Profile Information</button>
        <br/><br/>{{this.errorMessage}}
      </div>

      <div >
        <input style="margin-top: 8rem;" v-model="orgid" placeholder="OrgID"/>
        <button class="delete" @click="deleteAccount()" > Delete Account</button>
      </div>
    </div>
    <router-link :to="{ name: 'DriverDashboardPage'}">
      <button>Return to Dashboard</button>
    </router-link>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";

export default {
  name: "ProfilePage",
  data() {
    return {
      name: '',
      email: '',
      userObj: '',
      user: [],
      orgID: '',
      userid: '',
      orgid: '',
      fname: '',
      mname: '',
      lname: '',
      address: '',
      dlnum: '',
      dbObj: '',
      stateObj: '',
      errorMessage: ''
    }
  },
  async created() {
    try {
      this.userObj = await Auth.currentAuthenticatedUser()
          .then(response => this.userObj = JSON.stringify(response))
          .catch(e => console.log(e))
      this.user = JSON.parse(this.userObj)
      this.name = this.user.attributes.given_name
      this.email = this.user.attributes.email
    } catch (e) {
      console.log(e)
      console.log("FATAL: No user authenticated")
      await router.push('/login')
    }
    this.me()
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
      this.userid= this.dbObj.body.users[`${this.user.username}`]["user_id"]
      this.orgID = this.dbObj.body.users[`${this.user.username}`]["org_id"]
    },
    async changeProfile(){
      console.log(this.user.username)
      console.log(this.fname)
      console.log(this.mname)
      console.log(this.lname)
      console.log(this.dlnum)
      console.log(this.address)
      console.log(this.orgID)
      try {
        console.log("Preparing to remove account from the DB")
        this.stateObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users/profile", {
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
                useremail: this.user.username,
                fname: this.fname,
                mname: this.mname,
                lname: this.lname,
                dl_num: this.dlnum,
                address: this.address,
                orgid: this.orgID
              },
              path: {},
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
      console.log(this.stateObj)
      this.errorMessage = this.stateObj.body
      this.me()
    },

    async deleteAccount() {
      console.log(this.userid)
      console.log(this.reason)
      console.log(this.orgid)
      console.log(this.user.username)
      try {
        console.log("Preparing to remove account from the DB")
        this.stateObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgid + "/drivers/" + this.userid + "/application/cancel", {
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
                state: "removed",
                reason: "User wanted to delete their account with this organization"
              },
              path: {
                orgid: this.orgid,
                userid: this.userid
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
      console.log(this.stateObj)
      this.errorMessage = this.stateObj.body
    }
  },
}
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
.delete{
  background-color: red;
  /*width: 600px;*/
  color: black;
  padding: 0px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin-left: 13rem;
  margin-right: auto;
  /*margin-top: 1rem;*/
  margin-top: -1.75rem;
  width: 18rem;
  height: 2rem;
}
.formlabel{
  text-align: center;
}
.mainbox {
  background-color: #7ed957;
  width: 600px;
  height: 600px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color: #c9e265;
  margin-left: auto;
  margin-right: auto;

}
table, th, td {
  border: 1px solid black;
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