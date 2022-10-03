<template>
    <html>
    <head>  
      <meta name="viewport" content="width=device-width, initial-scale=1">  
      <title> Driver Dashboard </title>    
    </head>    
      <body>
        <center> <img src="../assets/appLogoSmall.png" /> </center>
        <h1 style="align-self: center;"> Driver Incentive Home </h1>
            <div class="topnav">
                <a class="active" href="#home">Home</a>
                <a href="#points">Points</a>
                <a href="#catalog">Catalog</a>
            </div>
            <div class="sidebox">
                <h2>Profile</h2>
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
form {   
    border: 3px solid #7ed957;   
}     
button:hover {   
    opacity: 0.7;   
}   
.cancelbtn {   
    width: auto;   
    padding: 10px 18px;  
    margin: 10px 5px;  
}      
.topnav {      
    background-color: #7ed957; 
    overflow: hidden; 
}   
.topnav a {      
    float: left;
    color: black;
    text-align: center;
    padding: 14px 16px;
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

}
.right {
  position: absolute;
  right: 0px;
  width: 300px;
  padding: 10px;
}
</style> 