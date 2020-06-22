//add button onclick open form


function openForm() {
    document.getElementById("popupForm").style.display="block";
  }
  
  function closeForm() {
    document.getElementById("popupForm").style.display="none";
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
    cell1.innerHTML=update.data[i]["id"];
    cell2.innerHTML=update.data[i]["employee_name"];
    cell3.innerHTML=update.data[i]["employee_salary"];
    cell4.innerHTML=update.data[i]["employee_age"];
}

}

//add employee to ui.......
function addEmpData(){
   
  var x=document.getElementById('formData')
  
  const id=x.elements[0].value;
  for(let i=0;i<checkId.length;i++)
  {
    if(id===checkId[i]){
      alert('Given employee id already exits,please enter new id..!');
      return;
    }
  } 
    checkId.push(id);
    var table=document.getElementById('myTable');
    var row=table.insertRow(-1);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    cell1.innerHTML=x.elements[0].value;
    cell2.innerHTML=x.elements[1].value;
    cell3.innerHTML=x.elements[2].value;
    cell4.innerHTML=x.elements[3].value;
    closeForm();
  

}


















 
 