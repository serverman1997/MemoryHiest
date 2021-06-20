function send() {

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
  
    //Regex Patterns
    var phonepatt = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
    var emailpatt = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  
    var endpointurl="https://script.google.com/macros/s/AKfycbw3CyPlQGs4llwvbyrqN9pIbS5spjI82aLiMA_T-Uu7JcChObIBhFjR9fVjdMkzjtKQoA/exec?func=addData&name="+name+"&phone="+phone+"&email="+email+"&msg="+message+"&subject="+subject;
  
  
    if (navigator.onLine) {
    //data validation start here
    if (name == "") {
      validationmessage("Name");
    }
  
    else if (email == "" || emailpatt.test(email) == false) {
      validationmessage("Email");
  
    }

    else if (phone == "" || phonepatt.test(phone) == false) {
        validationmessage("Phone no");
    
      }
  
    else if (subject == "") {
      validationmessage("Subject");
    }
  
    else if (message == "") {
      validationmessage("Your Message");
    }
  
    // if data is valid go for it here.
    else {
  
        $('#cover-spin').show(30)
        //initiate the ajax request
        $.ajax({
          url: endpointurl,
          type: "GET",
          
          success: function (data, textStatus, jqXHR) {
            //On success code here...
            //data - response from server
            console.log(data.Status);
            if (data.status == true) {
              clearbox();
              Swal.fire({
                type: 'success',
                title: 'Thanks for contacting us.',
                text: 'Your message has been sent. Soon! Someone from our team will get back to you.',
                confirmButtonColor: '#ff5821'
              })
  
            }
            else {
  
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later',
                confirmButtonColor: '#ff5821'
              })
  
            }
            $('#cover-spin').hide(30);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //On error code here...
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later',
              confirmButtonColor: '#ff5821'
            })
            $('#cover-spin').hide(30);
          }
        });
    }
  }
  else{
  
    Swal.fire({
      type: 'question',
      title: 'The Internet?',
      text: 'That thing is still around?',
      confirmButtonColor: '#ff5821'
    })
  }
  
  }
  
  //function for clearing the textbox after successful message drop
  
  
  function clearbox() {
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("email").value = '';
    document.getElementById("subject").value = '';
    document.getElementById("message").value = '';
  
  }
  
  //function for validation popup message
  function validationmessage(msg) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: msg + ' is not valid ' + 'Please provide valid ' + msg,
      confirmButtonColor: '#ff5821'
    })
  
  }
  
  
  
