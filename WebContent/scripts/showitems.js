/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var item;
function getItemNames(itemtype)
{
    item=itemtype;
    var para=document.getElementById(itemtype);
    var span=para.getElementsByTagName("span")[0];
    var spantext=span.innerHTML.trim();
    
    if(spantext.indexOf("+")!==-1)
    {
        span.innerHTML="-"+itemtype;
    }
    else if(spantext.indexOf("-")!==-1)
    {
        span.innerHTML="+"+itemtype;
        $("#"+item+".itemnames").hide("slow");
        return;
    }
    var data={itemtype:itemtype};
    var request=$.post("StoreControllerServlet",data,processResponse);
    request.error(handleError);
}



function processResponse(responseText)
{
    var para=document.getElementById(item);
    
    responseText=responseText.trim();
    
    var olddiv=para.getElementsByClassName("itemnames")[0];
    if(typeof olddiv!=='undefined')
    {
        para.removeChild(olddiv);
    }
    var newdiv=document.createElement("div");
    newdiv.setAttribute("class","itemnames");
    newdiv.innerHTML=responseText;
    para.appendChild(newdiv);
}


function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}