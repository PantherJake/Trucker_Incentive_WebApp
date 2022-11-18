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
      <div >
        <button @click="this.Profilevisible = false; this.forgotVisible = true;">Change Password? </button>
      </div>

      <form v-show="this.forgotVisible">
        <div class="container">
          <br/><label>Email : </label>
          <input type="text" v-model="email" placeholder="Enter Email" required><br/>
          <br/>
          {{ this.errorMessage }}
          <button type="button" @click="this.forgotPassword()">Send Reset Code</button>
          <button @click="this.forgotVisible = false; this.Profilevisible = true;">Cancel</button>
        </div>
      </form>
      <form v-show="this.newVisible">
        <div class="container">
          <br/><label>New Password : </label>
          <br/><input type="text" v-model="new_password" placeholder="Enter New Password" required>
          <br/><br/><label>Confirmation Code (Sent to Email) : </label>
          <br/><input type="text" v-model="code" placeholder="Confirmation Code" required>
          <br/><br/>{{ this.errorMessage }}
          <button type="button" @click="this.newPassword()">Change Password</button>
          <button @click="this.newVisible = false; this.Profilevisible = true;">Cancel</button>
        </div>
      </form>

      <div v-show="this.Profilevisible">
        <label>Changing Profile Information : </label><br/><br/>
        <table style = "border-collapse: collapse;">
          <tr>
            <th>Change</th>
            <th>Current</th>
          </tr>
          <tr>
            <td><input  v-model="fname" placeholder="First Name"/><br/></td>
            <td class="formlabel"><label >{{this.dbObj.body.users[`${this.user.username}`]['fname']}}</label></td>
          </tr>
          <tr>
            <td><input v-model="mname" placeholder="Middle Name"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['mname']}} </label></td>
          </tr>
          <tr>
            <td><input v-model="lname" placeholder="Last Name"/><br/></td>
            <td class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['lname']}}</label></td>
          </tr>
          <tr v-show=this.driverinfo>
            <td><input v-show=this.driverinfo class = "tab1" v-model="dlnum" placeholder="Driver License"/><br/></td>
            <td v-show=this.driverinfo class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['dl']}} </label></td>
          </tr>
          <tr v-show=this.driverinfo>
            <td><input v-show=this.driverinfo v-model="address" placeholder="Address"/><br/></td>
            <td v-show=this.driverinfo class="formlabel"><label>{{this.dbObj.body.users[`${this.user.username}`]['address']}} </label></td>
          </tr>
        </table>

        <button @click="changeProfile()" > Change Profile Information</button>
        <br/><br/>{{this.errorMessage}}
      </div>

      <div v-show="this.Profilevisible">
        <input style="margin-top: 8rem;" v-model="orgid" placeholder="OrgID"/>
        <button class="delete" @click="deleteAccount()" > Delete Account</button>
      </div>
    </div>
<!--    <router-link :to="{ name: 'DriverDashboardPage'}">-->
      <button @click="pushDashboard()">Return to Dashboard</button>
<!--    </router-link>-->
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
      Profilevisible: true,
      forgotVisible: false,
      newVisible: false,
      email2: '',
      new_password: '',
      code: '',
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
      errorMessage: '',
      driverinfo: false,
      audit: '',
      // data: ''
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
    async AuditLogin(){
      try {
        try {
          this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
              'username': this.email
            },
          }).then((response) => response.json()).catch(e => console.log(e))
        } catch (error) {
          console.log(error)
          this.errorMessage="Error fetching user data from database"
        }
        console.log(this.dbObj.body.users)
        localStorage.setItem('status', this.dbObj.statusCode)
        this.userid = this.dbObj.body.users[`${this.email}`]["user_id"]
        localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])

        // localStorage.setItem('userid', this.dbObj.body.users[`${this.email}`]["user_id"])
        console.log("Audit function")
        console.log(this.userid)
        console.log(this.email)
        // console.log(localStorage.getItem('userid'))
        console.log(this.userid)
        console.log(this.operation)
        // console.log("Initiating database connection for logging audit");
        this.audit = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/audits", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.email
          },
          body: JSON.stringify({
            path: {},
            params: {
              querystring: {
                userid: this.userid,
                operation: this.operation,
                state: this.state,
                message: this.message
              },
              path: {},
              header: {
                username: this.username
              }
            },
          })
        }).then((response) => response.json()).catch(e => console.log(e));
      } catch (error) {
        console.log(error);
        this.dbError = "Could not establish database connection, please contact support";
      }
      console.log("Audit log:")
      console.log(this.audit.statusCode)
    },

    forgotPassword() {
      this.errorMessage = ''
      Auth.forgotPassword(this.email)
          .then(data => console.log(data))
          .catch(err => this.errorMessage=err);
      this.forgotVisible = false
      this.newVisible = true
    },
    newPassword() {
      this.errorMessage = ''
      Auth.forgotPasswordSubmit(this.email, this.code, this.new_password)
          .then(data => console.log(data))
          .catch(err => {
            console.log(err)
            this.errorMessage="Code was incorrect"
          });
      this.state = "completed"
      this.message = "User " + this.email + " has changed their password"
      this.operation = "PasswordChange"
      this.AuditLogin()
      this.newVisible = false
      this.Profilevisible = true
    },

    async pushDashboard(){
      // this.me()
      console.log(localStorage.getItem('role_id'))
      console.log(localStorage.getItem('status'))
      if(parseInt(localStorage.getItem('status')) == 400){
        // console.log("Made it here")
        router.push("/driverpending")
      }
      if(parseInt(localStorage.getItem('role_id')) === 3){
        router.push("/driverdashboard")
      }
      if(parseInt(localStorage.getItem('role_id')) === 2){
        console.log("Go into sponsor")
        router.push("/sponsordashboard")
      }
      if(parseInt(localStorage.getItem('role_id')) === 1){
        router.push("/admindashboard")
      }
    },
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
      this.userid= this.dbObj.body.users[`${this.email}`]["user_id"]
      this.orgID = this.dbObj.body.users[`${this.email}`]["org_id"]
      localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])
      localStorage.setItem('status', this.dbObj.statusCode)
      if(parseInt(localStorage.getItem('role_id')) === 3){
        this.driverinfo = true
      }
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