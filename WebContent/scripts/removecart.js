/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var item;
function removeRow(itemName)
{
//    $('tr.pagerlink').click(function(){
//        var id=$(this).attr('id');
//        alert(id);
//    });
//itemName=itemName.replace(/%20/g," ");
   
    item=itemName;
     alert(item);
     var data={itemName:item};
    var request=$.post("RemoveCartControllerServlet",data,processResponse);
    request.error(handleError);
}

function processResponse(responseText)
{
   // var myitem="'#"+item+"'";
    alert(responseText);
    alert("myitem is:"+myitem);
   // var x=$(myitem); 
    //alert("X is "+x);
    $("#"+responseText).remove();
    alert(responseText+"pr");
    
}


function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}