var item;
var myoptionsarray=[];
var myfunctionnamesarray=[];
var productoptions=["Add","Update","Delete"];
var productoptionsfunctions=["showAddProductForm()","showUpdateProductForm()","showDeleteProductForm()"];
var useroptions=["Remove"];
var useroptionsfunctions=["showRemoveUser()"];
var viewoptions=["Orders"];
var viewoptionsfunctions=["viewOrders()"];



function removeProductForm()
{
    var contdiv=document.getElementById("productcontainer");
    var formdiv=document.getElementById("productform");
    if(formdiv!==null)
    {
        //alert("div has been removed");
        $("#productform").fadeOut("3500");
        contdiv.removeChild(formdiv);   
    }
}



function getItemNames(itemType)
{
    
    item=itemType;
para=document.getElementById(itemType);
var span=para.getElementsByTagName("span")[0];
//alert("span is "+span);
var spantext=span.innerHTML.trim();
//alert("spantext is "+spantext);

if(spantext.indexOf("+")!==-1)
{
    span.innerHTML="-"+itemType;
      
}
else if(spantext.indexOf("-")!==-1)
{
    span.innerHTML="+"+itemType;
    $("#"+item+ " .itemnames").hide("slow");
    removeProductForm();
    return;    
}
showItems();
}




function showItems()
{
var olddiv=para.getElementsByClassName("itemnames")[0];
if(typeof olddiv!=='undefined')
{
 //alert("div removed");
 para.removeChild(olddiv);   
}
var newdiv=document.createElement("div");
newdiv.setAttribute("class","itemnames");
var newul=document.createElement("ul");
if(item==="Products")
{
    myoptionsarray=productoptions;
    myfunctionnamesarray=productoptionsfunctions;
}
else if(item==="Users")
{
    myoptionsarray=useroptions;
    myfunctionnamesarray=useroptionsfunctions;
    }
else
{
     myoptionsarray=viewoptions;
     myfunctionnamesarray=viewoptionsfunctions;
}
for(var i=0;i<myoptionsarray.length;i++)
{
    newul.innerHTML+="<li><a href='#' onclick='"+myfunctionnamesarray[i]+"'>"+myoptionsarray[i]+"</a></li>";
    
}
newdiv.appendChild(newul);
para.appendChild(newdiv);
$("#"+item+ " .itemnames").hide();
$("#"+item+ " .itemnames").show("slow");
}





function showAddProductForm()
{
//alert("showAddProduct called");
removeProductForm();
var newdiv=document.createElement("div");
newdiv.setAttribute("id","productform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Add New Product</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'><table><tr><th>Product Name:</th><td><input type='text' id='pname'></td></tr><tr><th>Product Type:</th><td><input type='text' id='ptype'></td></tr><tr><th>Product Price:</th><td><input type='text' id='pprice'></td></tr><tr><th>Product Desc:</th><td><input type='text' id='pdesc'></td></tr><tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr><tr><th><input type='button' value='Add Product' onclick='addProduct()' id='addprd'></th><th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<span id='addresp'></span>";
var addPrd=$("#productcontainer")[0];
addPrd.appendChild(newdiv);
$("#productform").hide();
$("#productform").fadeIn("3500");

}





function clearText()
{
    $("#addresp").html(""); 
}
function addProduct()
{
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
 //   alert(data);
    var pname=$("#pname").val();
    var ptype=$("#ptype").val();
    var pdesc=$("#pdesc").val();
    var pprice=$("#pprice").val();
    data.append("pname",pname);
    data.append("ptype",ptype);
    data.append("pdesc",pdesc);
    data.append("pprice",pprice);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "AddNewProductControllerServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {

                $("#addresp").html(data);
                
                

            },
            error: function (e) {

                $("#addresp").html(e.responseText);
                
                

            }
        });
}





function updateProduct()
{
     var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
   // alert(data);
    var pname=$("#pname").val();
   // var ptype=$("#ptype").val();
    var pdesc=$("#pdesc").val();
    var pprice=$("#pprice").val();
    data.append("pname",pname);
    //data.append("ptype",ptype);
    data.append("pdesc",pdesc);
    data.append("pprice",pprice);
    data.append("pid",pvid);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "UpdateProductControllerServlet3",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {

                $("#addresp").html(data);
                
                

            },
            error: function (e) {

                $("#addresp").html(e.responseText);
                
                

            }
        });
}







function deleteProduct()
{
   // alert("deleteProduct called");
    
   
    
    var data={productId:dvid};
    var request=$.post("DeleteProductControllerServlet",data,processResponseDelete);
    request.error(handleErrorDelete);
     removeProductForm();
    
}
function processResponseDelete()
{
    
}
function handleErrorDelete(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}





function viewOrders()
{
    alert("viewOrder called");
    removeProductForm();
    var data={vieworders:"vieworders"};
    var rq=$.post("ViewOrdersControllerServlet",data,viewOrdersResponse);
    rq.error(handleError);
    var newdiv=document.createElement("div");
       newdiv.setAttribute("id","productform");
       newdiv.setAttribute("float","left");
       newdiv.setAttribute("padding-left","12px");
       newdiv.setAttribute("border","solid 2px red");
       newdiv.innerHTML="<h3>View All Orders</h3>";
       newdiv.innerHTML=newdiv.innerHTML+"<span id='viewOrders'></span>";
      // newdiv.innerHTML=newdiv.innerHTML+"<span id='addresp'></span>";
       var addPrd=$("#productcontainer")[0];
       addPrd.appendChild(newdiv);
        alert("viewOrder called");
      //  $("#productform").hide();
        //$("#productform").fadeIn("3500");
    
}
function viewOrdersResponse(responseText)
{
    var viewo=document.getElementById("viewOrders");
    viewo.innerHTML=responseText;
    
  
    
}




function showRemoveUser()
{
    removeProductForm();
    
    var data={username:"username"};
 var request=$.post("ShowUsernameControllerServlet",data,showProcessResponse);
    request.error(showhandleError);
var newdiv=document.createElement("div");
newdiv.setAttribute("id","productform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Remove User</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' id='fileUploadForm'><table ><tr><th>Username:</th><td><select id='userName' name='dropdown'></select></tr><tr><th><input type='button' value='Remove' onclick='removeUser()' id='removeuser'></th></table></form>";
newdiv.innerHTML=newdiv.innerHTML+"<span id='addresp'></span>";
var addPrd=$("#productcontainer")[0];
addPrd.appendChild(newdiv);
$("#productform").hide();
$("#productform").fadeIn("3500");
  //  alert("removeUser called");
    //removeProductForm();
    
    $("#userName").on('change',function()
    {
   // alert("in change method");
     user=$(this).find("option:selected").attr("id");
   // alert(user);

     });
}

function showhandleError()
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}


function showProcessResponse(responseText)
{
      var para=document.getElementById("userName");
    
    responseText=responseText.trim();
    para.innerHTML=responseText;
    
}


function removeUser()
{
    var data={user:user};
    var request=$.post("RemoveUserControllerServlet",data,removeProcessResponse);
    request.error(removeHandleError); 
    removeProductForm();
    
    
}

function removeProcessResponse(responseText)
{
    
}


function removeHandleError(xhr,textStatus)
{
     if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}



function showUpdateProductForm()
{
//alert("showAddProduct called");
removeProductForm();

var data={product:"product"};
 var request=$.post("UpdateProductControllerServlet",data,processResponse);
    request.error(handleError);
    
var newdiv=document.createElement("div");
newdiv.setAttribute("id","productform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Update Product</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id='fileUploadForm'><table><tr><th>Product Id:</th><td><select id='optionId' name='dropdown'></select></tr><tr><th>Product Name:</th><td><input type='text' id='pname'></td></tr><tr><th>Product Type:</th><td><input type='text' id='ptype'></td></tr><tr><th>Product Price:</th><td><input type='text' id='pprice'></td></tr><tr><th>Product Desc:</th><td><input type='text' id='pdesc'></td></tr><tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr><tr><th  colspan='2'><input type='button' value='Update Product' onclick='updateProduct()' id='updateprd'></th></tr></table><span id='itemImage'></span></form>";
newdiv.innerHTML=newdiv.innerHTML+"<span id='addresp'></span>";
var addPrd=$("#productcontainer")[0];
addPrd.appendChild(newdiv);
$("#productform").hide();
$("#productform").fadeIn("3500");

$("#optionId").on('change',function()
    {
   // alert("in change method");
     pvid=$(this).find("option:selected").attr("id");
  //  alert(pvid);
    var d={productId:pvid};
    var req=$.post("UpdateProductControllerServlet2",d,processResponse2);
   // alert("execute req");
    request.error(handleError2);

     });

    
    
     function processResponse2(responseText)
     {
       //alert(responseText);
         var details=JSON.parse(responseText);
         $('#pname').val(details.pname);
         $('#ptype').val(details.ptype);
         $("#pprice").val(details.pprice);
         $("#pdesc").val(details.pdesc);
         var pimage=document.getElementById("itemImage");
         pimage.innerHTML="<img src=\'images/"+details.pimage+"'>";
         //var newdiv=document.createElement("div");
         //newdiv.setAttribute("id","pimage");
     //   newdiv.setAttribute("float","right");
        //newdiv.setAttribute("padding","12px");
        //newdiv.setAttribute("border","solid 2px red");
       // newdiv.innerHTML="<img src=\'images/"+details.pimage+"'>";
      //  var addPrd=$("#productcontainer")[0];
        //    addPrd.appendChild(newdiv);
     //         $("#fileUploadForm").after(newdiv);
          //$("#fileUploadForm").appendChild("<div style='float:right;'><img src=\'images/"+details.pimage+"'></div>");
       
         
    }
    


function handleError2(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}
     

}



function processResponse(responseText)
{
    //alert(responseText);
    var para=document.getElementById("optionId");
    
    responseText=responseText.trim();
    para.innerHTML=responseText;
    

}




function handleError(xhr,textStatus)
{
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
}




function showDeleteProductForm()
{
    var data={product:"product"};
 var request=$.post("UpdateProductControllerServlet",data,processResponse);
    request.error(handleError);
    removeProductForm();
    var newdiv=document.createElement("div");
newdiv.setAttribute("id","productform");
newdiv.setAttribute("float","left");
newdiv.setAttribute("padding-left","12px");
newdiv.setAttribute("border","solid 2px red");
newdiv.innerHTML="<h3>Delete Product</h3>";
newdiv.innerHTML=newdiv.innerHTML+"<form method='POST'  id='fileUploadForm'><table><tr><th>Product Id:</th><td><select id='optionId' name='dropdown'></select></tr><tr><th>Product Name:</th><td><input type='text' id='pname'></td></tr><tr><th>Product Type:</th><td><input type='text' id='ptype'></td></tr><tr><th>Product Price:</th><td><input type='text' id='pprice'></td></tr><tr><th>Product Desc:</th><td><input type='text' id='pdesc'></td></tr><tr><th colspan='2'><input align='center' type='button' value='Delete Product' onclick='deleteProduct()' id='deleteprd'></th></tr></table><span id='itemImage'></span></form>";
newdiv.innerHTML=newdiv.innerHTML+"<span id='addresp'></span>";
var addPrd=$("#productcontainer")[0];
addPrd.appendChild(newdiv);
$("#productform").hide();
$("#productform").fadeIn("3500");

$("#optionId").on('change',function()
    {
   // alert("in change method");
     dvid=$(this).find("option:selected").attr("id");
   // alert(dvid);
    var d={productId:dvid};
    var req=$.post("UpdateProductControllerServlet2",d,processResponse2);
   // alert("execute req");
    request.error(handleError2);

     });
     
     function processResponse2(responseText)
     {
       //alert(responseText);
         var details=JSON.parse(responseText);
         $('#pname').val(details.pname);
         $('#ptype').val(details.ptype);
         $("#pprice").val(details.pprice);
         $("#pdesc").val(details.pdesc);
          var pimage=document.getElementById("itemImage");
         pimage.innerHTML="<img src=\'images/"+details.pimage+"'>";
     }
     
     
     function handleError2(xhr,textStatus)
     {
    if(textStatus==='error')
        $("#regresult").text('An error occured during your request: '+xhr.status);
      }
    
}




//  function viewOrderDetails()
//  {
//      alert("view order details called");
//    var id=$(this).attr("id");
//    alert(id);
//    
//   }