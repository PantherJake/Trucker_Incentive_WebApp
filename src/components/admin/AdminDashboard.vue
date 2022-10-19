<template>
    <html>
    <head>  
      <meta name="viewport" content="width=device-width, initial-scale=1">  
      <title> Sponsor Dashboard </title>    
    </head>    
      <body>
        <div class="dot">
          <div class="dot-text"><a href="#profile">Profile</a></div>
        </div>
        <center> <img src="../../assets/appLogoSmall.png" /> </center>
        <center><h1> Driver Incentive Home </h1></center>
            <center><div class="topnav">
                <a class="active" href="/admindashboard">Home</a>
                <a href="/admindashboard/points">Points</a>
                <a href="/admindashboard/catalog">Catalog</a>
                <a href="/admindashboard/drivers">Drivers</a>
            </div></center>
            <center><ul class="breadcrumb">
              <li><a href="/admindashboard">Home</a></li>
            </ul></center>
            <center><div class="mainbox">
              <center><p>Welcome to the Home Page for the Driver Incentive Application!</p></center>
            </div></center>
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
</style> 