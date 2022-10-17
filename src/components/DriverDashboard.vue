<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
  </head>
  <body>
  <center> <img src="../assets/appLogoSmall.png" /> </center>
  <center><h1> Driver Incentive Home </h1></center>
  <center><div class="topnav">
    <a class="active" href="#home">Home</a>
    <a href="#points">Points</a>
    <a href="#catalog">Catalog</a>
  </div></center>
  <br>
  <div class="sidebox">
    <center><h2>Profile</h2></center>
    <ul>
      <li><a href="#logininfo">Password Information</a></li>
    </ul>
  </div>
  </body>
  </html>
</template>

<style>
Body {
  font-family: Calibri, Helvetica, sans-serif;
  background-color: #008037;
  font-size: 20px;
}
.topnav {
  background-color: #7ed957;
  border-style: solid;
  width: 600px;
  height: 50px;
  text-align: center;
  justify-content: center;
  display: flex;
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
.sidebox {
  background-color: #7ed957;
  float: right;
  height: 200px;
  width: 250px;
  border-style: solid;
}
.right {
  position: absolute;
  right: 0px;
  width: 300px;
  padding: 10px;
}
a {
  color: black;
}
a:hover{
  color: white;
}
</style> 