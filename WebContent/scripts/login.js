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
});
 
    
function connect()
{
   
     if(!validate())
         return;
     
   
     var data={username:username,usertype:usertype,password:password};
    var request=$.post("LoginControllerServlet",data,processResponse);
    request.error(handleError);
}

function processResponse(responseText)
{
    var type;
    responseText=responseText.trim();
    if(responseText==='error')
    { 
        $("#loginresult").html("Login Rejected!").css("font-weight","bold").css("color","red");
    }
    else if(responseText.indexOf("jsessionid")!==-1)
    {
        if(usertype==="ADMIN")
            type="Option";
        else
            type="Store";
        $("#loginresult").html("Login Accepted! Redirecting to the "+type+" Page!").css("font-weight","bold").css("color","green");
      window.setTimeout( function(){window.location=responseText},3000);
       
    }
     else
    {
        $("#loginresult").text('An error occured during your request: '+xhr.status);
       // setTimeout(window.location=responseText,7000);
    }
    
   
}

function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#loginresult").text('An error occured during your request: '+xhr.status);
}

function validate()
{
     usertype=$("#usertype option:selected").text();
    username=$("#username").val();
    password=$("#password").val();
    if(username==="")
    {
        $("#span1").text("Username Required!").css("font-weight","bold").css("color","red");
    }
     if(password==="")
    {
        $("#span2").html("Password Required!").css("font-weight","bold").css("color","red");
    }
    if(username===""||password==="")
        return false;
    else
        return true;
}
