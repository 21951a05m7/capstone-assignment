function showError(message) {
    errorContainer.textContent = "";
    errorContainer.textContent = message;
  }
  
  //  targeting elements
  let errorContainer = document.querySelector(".error-msg");
  let form = document.getElementById("formData");
  let userName = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let dob = document.getElementById("dob");
  let checkBox = document.getElementById("agree");
  let tableBody = document.getElementById("tableBody");
  let btn = document.getElementById("submit");
  
  //validation functions
  
  function isNameEmpty(name) {
    return name === "";
  }
  function isEmailEmpty(email) {
    return email === "";
  }
  
  function isPasswordEmpty(password) {
    return password == "";
  }
  function isAgeEmpty(age) {
    return age == "";
  }
  function isInvalidAge(age) {
    let currentDate = new Date();
    let userDob = new Date(age);
    let userAge = currentDate.getFullYear() - userDob.getFullYear();
    return userAge < 18 || userAge > 55;
  }
  
  //responding to submit event
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = userName.value;
    let userEmail = email.value;
    let userPassword = password.value;
    let userDob = dob.value;
    let acceptedTerms = checkBox.checked;
  
    if (isNameEmpty(name)) {
      showError("Name Cannot Be Empty, Please Fill That field");
      return;
    }
    if (isEmailEmpty(userEmail)) {
      showError("Email is Required, Please Fill That Field");
      return;
    }
  
    if (isPasswordEmpty(userPassword)) {
      showError("Please Fill The Password");
      return;
    }
    if (isAgeEmpty(userDob)) {
      showError("Date of Birth is Required");
      return;
    }
    if (isInvalidAge(userDob)) {
      showError("Your Age Should be Between 18 and 55");
      return;
    }
  
    showError("");
  
    let userDetails = {
      uName: name,
      uEmail: userEmail,
      uPassword: userPassword,
      uDob: userDob,
      UTerms: acceptedTerms,
    };
    let storedData = JSON.parse(localStorage.getItem("userDetailsArray")) || [];
    storedData.push(userDetails);
    localStorage.setItem("userDetailsArray", JSON.stringify(storedData));
  
    tableBody.innerHTML = `<tr>
    <td>${name}</td>
    <td>${userEmail}</td>
    <td>${userPassword}</td>
    <td>${userDob}</td>
    <td>${acceptedTerms}</td>
  </tr>`;
    form.reset();
  });