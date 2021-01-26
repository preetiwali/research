
// function checkDate(){
//   var startDate = new Date(document.getElementById('dob').value);
//   var today = new Date();
//   if (startDate.getTime() > today.getTime()) {

//     document.getElementById("dob").classList.add("ng-invalid");
//     document.getElementById("dob").classList.add("is-invalid");
  
//     document.getElementById("dob").classList.remove("ng-valid");
//     document.getElementById("dob").classList.remove("is-valid");
//   }else{

//     document.getElementById("dob").classList.remove("ng-invalid");
//     document.getElementById("dob").classList.remove("is-invalid");
  
//     document.getElementById("dob").classList.add("ng-valid");
//     document.getElementById("dob").classList.add("is-valid");
//   }
// }


// function firstLogin(){
//   alert("skdjhsaj");
//   $("#myModal").modal('show');

// }

// function nextMod() {
//   // $("#modal2").show();
//   // $("#modal1").hide();
//   // alert("cdsj")
//   // $("#modal1").css('display','none');

//   $("#modal2").css('display','block');

// }


function copyText(element) {
  var range, selection, worked;

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
  try {
    document.execCommand('copy');
    alert('Completion code copied');
  }
  catch (err) {
    alert('Unable to copy completion text');
  }
}


function myfunction() {
    const select_val = document.getElementById("registerparticipate").value;
    if(select_val == "participant")
    {
        $("#form_2").css('display','none');
        $("#form_1").css('display','block');
    }
    else
    {
        $("#form_2").css('display','block');
        $("#form_1").css('display','none');
    }
}


function showDropDown(){
  const select_val = document.getElementById("description").value;
    if(select_val == "yes")
    {
      $(".showmodal").css('display','block');
      document.getElementById("description").classList.add("ng-valid");
      document.getElementById("description").classList.add("is-valid");
      document.getElementById("description").classList.remove("ng-invalid");
      document.getElementById("description").classList.remove("is-invalid"); 
    }
    else
    {
      $(".showmodal").css('display','none');
      document.getElementById("description").classList.add("ng-valid");
      document.getElementById("description").classList.add("is-valid");
      // document.getElementById("description").classList.add("ng-invalid");
      // document.getElementById("description").classList.add("is-invalid"); 
    }
}

function showpublishbutton(){
  const val = document.getElementById("showbutton").value;
    if(val == "yes")
    {
      $(".confirm").css('display','block');
      document.getElementById("showbutton").classList.add("ng-valid");
      document.getElementById("showbutton").classList.add("is-valid");
      document.getElementById("showbutton").classList.remove("ng-invalid");
      document.getElementById("showbutton").classList.remove("is-invalid"); 
    }
    else if(val == "no")
    {
      $(".confirm").css('display','none');
      document.getElementById("showbutton").classList.remove("ng-valid");
      document.getElementById("showbutton").classList.remove("is-valid");
      document.getElementById("showbutton").classList.add("ng-invalid");
      document.getElementById("showbutton").classList.add("is-invalid"); 
    }
}

