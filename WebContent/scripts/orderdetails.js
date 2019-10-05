/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ordid;
function getdetails(id)
{
    ordid=id.trim();
      var data={ordid:ordid};
    var request=$.post("OrderControllerServlet",data,processResponse);
    request.error(handleError);
}

function processResponse(responseText)
{
    $("#t1").html(responseText);
    
}


function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}
