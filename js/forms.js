// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC8bqfMCZw8aLTl5syWswn7zYvKJOwbOFs",
    authDomain: "praddy-e8ca2.firebaseapp.com",
    projectId: "praddy-e8ca2",
    storageBucket: "praddy-e8ca2.appspot.com",
    messagingSenderId: "792442464829",
    appId: "1:792442464829:web:930344311ade5342a85854"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    
    /* Validation of data collected through form,
    on click event of Submit button, submitForm function is called */
    var UserInputsRef=firebase.database().ref('UserInputs')
    document.getElementById('testForm').addEventListener('submit',submitForm);
  
    /* function store input values in variables */
    function submitForm(e){
      e.preventDefault();
      var fname =getInputVal('firstname');
      var lname =getInputVal("lastname");
      var mobile =getInputVal("mobile");
      var email =getInputVal("email");
      var emailstatus =validateEmail();
      var dob =getInputVal("dateofbirth");
      var state =getInputVal("state");
      state= state.toLowerCase();
      readState(state);
      var profession =getInputVal("profession");
      var symptomsList =getSelectedCheckboxValues("symptoms");
      
      // Add more variables to get input values
      
  
      var selectedOption = document.querySelector('input[name = option]:checked').value;
      /* function call to store data values in firebase
      after email id validation  */
      if(emailstatus)
          saveMessages(lname+ " " +fname,mobile,email,profession,dob,state,selectedOption,symptomsList);
  }
  
  /* function to accept state value as parameter, read database
   to return and display center details on web page */
  function readState(state){
    var centre;
    var ref=firebase.database().ref(state);
    ref.on("value",(data)=>{
      centre=data.val();
      document.getElementById("result").innerHTML="<br>"+centre.toUpperCase();
    })
  }
  
  
  /* function to return input values as per the id passed as parameter */
  function getInputVal(id){
      return document.getElementById(id).value;
  }
  
  /* function to write collected details in firebase,
  create new record and add values in respective fields */
  function saveMessages(name,mobile,email,profession,dob,state,selectedOption,symptomsList){
    var newUserInputsref= UserInputsRef.push();
    newUserInputsref.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dob:dob,
      state:state,
      selectedOption:selectedOption,
      symptomsList:symptomsList,
    })
    alert("Thank you. Here's the info");
  }
  
  
  
  
  /* function to return value(s) of selcted checkboxes */
  function getSelectedCheckboxValues(name) {
      const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
      let values = [];
      checkboxes.forEach((checkbox) => {
          values.push(checkbox.value);
      });
      return values;
  }
  
  /* function to check if email id entered by user is valid */
  function validateEmail() 
  {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
    {
      return (true)
    }
      alert("You have entered an invalid email address!")
      return (false)
  }
  