/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function()
{
    $("#username").focus(function()
    {
        $("#span1").text("");
    });
     $("#password").focus(function()
    {
        $("#span2").text("");
    });  
    $("#registerbtn").click(function()
    {
        connect();
    });
});

function connect()
{
    if(!validate())
        return;
    
    var data={username:username,password:password};
    var request=$.post("RegistrationControllerServlet",data,processResponse);
    request.error(handleError);
    
}

function validate()
{
    username=$("#username").val();
    password=$("#password").val();
    if(username==="")
        $("#span1").html("Username Required!").css("font-weight","bold").css("color","red");
    if(password==="")
       $("#span2").html("Password Required!").css("font-weight","bold").css("color","red"); 
   if(username===""||password==="")
       return false;
   return true;
}

function processResponse(responseText)
{
    responseText=responseText.trim();
    if(responseText==='success')
    { 
        $("#regresult").html("Registration Successfully<br>You can now Login").css("font-weight","bold").css("color","green");
        cleartext();
    }
    else if(responseText==="uap")
    {
       
        $("#regresult").html("Sorry! the username is already present!").css("font-weight","bold").css("color","red");
       cleartext();
    }
     else if(responseText==="failure")
    {
        $("#regresult").text("Registration Failed! Try Again").css("font-weight","bold").css("color","red");
         cleartext();
    }
     else
    {
        $("#regresult").text("Some problem at the server! Try Again Later").css("font-weight","bold").css("color","red");
      cleartext();
   }
    
   
}

function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}

function cleartext()
{
     $("#username").text("");
     $("#password").text("");
}