//add button onclick open form


function openForm() {
  document.getElementById("popupForm").style.display="block";
}
//open edit form
function openEditForm(){
  document.getElementById("editformData").style.display="block";
}

function closeForm() {
 x=document.getElementById('formData');
  x.elements[0].value='';
  x.elements[1].value='';
  x.elements[2].value='';
 document.getElementById("popupForm").style.display="none";
  
}
//close edit form
function closeEditForm(){
  x=document.getElementById('editData');
  x.elements[0].value='';
  x.elements[1].value='';
  x.elements[2].value='';
 document.getElementById("editformData").style.display="none";
}


var checkId=new Array();

//get data from api...

async function getData(){
 
 const fetchResult=await fetch('http://dummy.restapiexample.com/api/v1/employees');
 const fetchData=await fetchResult.json();

 uiUpdate(fetchData);
}


getData();

//add fetched_data to ui...

function uiUpdate(update){

var table=document.getElementById('myTable');

for(let i=0;i<update.data.length;i++){
  
  
  checkId.push(update.data[i]["id"]);
  var row=table.insertRow(-1);
  var cell1=row.insertCell(0);
  var cell2=row.insertCell(1);
  var cell3=row.insertCell(2);
  var cell4=row.insertCell(3);
  var cell5=row.insertCell(4);
  cell1.innerHTML=update.data[i]["id"];
  cell2.innerHTML=update.data[i]["employee_name"];
  cell3.innerHTML=update.data[i]["employee_salary"];
  cell4.innerHTML=update.data[i]["employee_age"];
  cell5.innerHTML="<button onClick='editForm(this)'  >EDIT</button><button onClick='DeleteRow(this)'>DELETE</button>";


}

}
var r_index;
function editForm(r){
var i=r.parentNode.parentNode.rowIndex;
r_index=i;
//console.log(i);

x=document.getElementById('editData');
var data={
 // id:document.getElementById('myTable').rows[i].cells[0].innerHTML,
  name:document.getElementById('myTable').rows[i].cells[1].innerHTML,
  salary:document.getElementById('myTable').rows[i].cells[2].innerHTML,
  age:document.getElementById('myTable').rows[i].cells[3].innerHTML
}
x.elements[0].value=data.name;
x.elements[1].value=data.salary;
x.elements[2].value=data.age;
openEditForm();

}

function verify(data){
  if(data.elements[0].value.length==0||data.elements[1].value.length==0||data.elements[2].value.length==0 ){
    window.alert('fields should not be empty..!')
    return false;
  }
  
  if(data.elements[0].value.match(/^[a-zA-Z ]+$/!=null))
  {
    window.alert('Name should only contain alphabets');
    return false;
  }
  if(data.elements[1].value<1){
    window.alert('salary should be >1');
    return false;
  
  }
  if(data.elements[2].value<18){
  window.alert('Age should be > 18');
  return false;
  }
  else{
    return true;
  }
  }

function editEmpData(){

var x=document.getElementById('editData');
if(verify(x)){
document.getElementById('myTable').rows[r_index].cells[1].innerHTML=x.elements[0].value;
document.getElementById('myTable').rows[r_index].cells[2].innerHTML=x.elements[1].value;
document.getElementById('myTable').rows[r_index].cells[3].innerHTML=x.elements[2].value;
window.alert('Employee data updated...!')
closeeditForm();
}

}
async function DeleteRow(r){

var i=r.parentNode.parentNode.rowIndex;


var data={
  id:document.getElementById('myTable').rows[i].cells[0].innerHTML,
  name:document.getElementById('myTable').rows[i].cells[1].innerHTML,
  salary:document.getElementById('myTable').rows[i].cells[2].innerHTML,
  age:document.getElementById('myTable').rows[i].cells[3].innerHTML
}
//Delete in api...

/* var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');
var add=await fetch('http://dummy.restapiexample.com/api/v1/delete/2/',{
  method : 'DELETE',
  mode : 'cors',
  cache: 'no-cache',
  credentials:'same-origin',
  headers:{
    'Content-Type':'application/json'
  },
  redirect:'follow',
  referrerPolicy:'no-referrer',
  body: JSON.stringify(data)
});*/

document.getElementById('myTable').deleteRow(i);
window.alert('employee deleted');
}




//add employee to ui.......

async function addEmpData()
{
 
  var x=document.getElementById('formData');
  
// const id=x.elements[0].value;
/* for(let i=0;i<checkId.length;i++)
  {
    if(id===checkId[i]){
      alert('Given employee id already exits,please enter new id..!');
      return;
    }
  } */
  var data={
    name : x.elements[0].value,
    salary : x.elements[1].value,
    age : x.elements[2].value
  };
  
  if(verify(x)){
    
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var add=await fetch('http://dummy.restapiexample.com/api/v1/create',{
      method : 'POST',
      mode : 'cors',
      cache: 'no-cache',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json'
      },
      redirect:'follow',
      referrerPolicy:'no-referrer',
      body: JSON.stringify(data)

    });
    var check= await add.json();
    
    if(check.status=='success')
    {
      window.alert('Employee added..!');
     // addToTable();
      
      checkId.push(++(checkId[checkId.length-1]));
      var table=document.getElementById('myTable');
      var row=table.insertRow(-1);
      var cell1=row.insertCell(0);
      var cell2=row.insertCell(1);
      var cell3=row.insertCell(2);
      var cell4=row.insertCell(3);
      var cell5=row.insertCell(4);
      cell1.innerHTML=checkId[checkId.length-1];
      cell2.innerHTML=x.elements[0].value;
      cell3.innerHTML=x.elements[1].value;
      cell4.innerHTML=x.elements[2].value;
      cell5.innerHTML="<button onClick='editForm(this)'  >EDIT</button><button onClick='DeleteRow(this)'>DELETE</button>";
      closeForm();
    }
    else{
      window.alert('Sorry failed to add employee..!');
    }
    
  
  }

}
