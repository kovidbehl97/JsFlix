// JQuery Ready Method

$(document).ready(function() {
    const form = window.document.getElementById("registration-form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const loginbtn = document.getElementById("login")
    const togglebtn = document.getElementById("switch")
    const submit = document.getElementById("submit")
    const signup = document.getElementById("signup")
    const emailLabel = document.getElementById("emailLabel")
    const confirmPasswordLabel = document.getElementById("confirmPasswordLabel")
    loginbtn.style.display= "none"
    signup.style.display= "none"
    let formValid = false;
    let lengthValid = false;
    let emailValid = false;
    let passwordValid = false;
    let userValid;
    let newUsername = []
    let newPassword = []
    let index = 0

    // Error Message Function (Shows Red Outline and Displays Error Message)

    let showError = function(input, message) {
        const formFields = input.parentElement;
        formFields.className = "form-fields error";
        const smallTags = formFields.querySelector("small");
        smallTags.innerText = message;
    };

    // Success Outline Function (Shows Green Outline)

    let showSuccess = function(input) {
        const formFields = input.parentElement;
        formFields.className = "form-fields success";
    };

    // Get Field Name

    let getFieldName = function(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };

    // Validate Data in Field (Checking for Empty fields and validating data)

    let validateFields = function(inputArray) {
        inputArray.forEach(function(input) {
            if (input.value.trim() === "") {
                showError(input, `${getFieldName(input)} is required`);
            } else if(userValid == false){
                showError(input, `${getFieldName(input)} already exists`);
                userValid = undefined
            } else {
                showSuccess(input);
            }
        });
    };

    // Validate Input Length

    let validateLength = function(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
            lengthValid = false;
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
            window.alert("You've Reached the Maximum Limit of Characters for the Username");
            lengthValid = false;
        } else {
            showSuccess(input);
            lengthValid = true;
        }
    };

    // Check if Email is Valid

    let isValidEmail = function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email.value.trim())) {
                showSuccess(email);
                emailValid = true;
        } else {
            showError(email, "Email is not valid");
            emailValid = false;
        }
    };

    // Validating Passwords Match

    let validatePasswordsMatch = function(pass1, pass2) {
        if (pass1.value !== pass2.value) {
            showError(pass2, "Passwords do no match");
            passwordValid = false;
        } else {
            passwordValid = true;
        }
    }

    // Validate Username

    let validateUsername = function(username, max , min){
        if (newUsername.includes(username.value.trim())){
            showError(username, `${getFieldName(username)} already exists`)
            userValid = false;
        } else if (username.value.length < min) {
            showError(username, `${getFieldName(username)} must be at least ${min} characters`);
            lengthValid = false;
        } else if (username.value.length > max) {
            showError(username, `${getFieldName(username)} must be less than ${max} characters`);
            window.alert("You've Reached the Maximum Limit of Characters for the Username");
            lengthValid = false;
        } else if(!newUsername.includes(username.value.trim()) && username.value.length > min && username.value.length < max){
            showSuccess(username);
            lengthValid = true;
            userValid = true;
        }
    }

  
    // Store in Local Storage

    let storeData = function(username, password){
        if(formValid && !userValid){    
            newUsername[index]=username.value
            newPassword[index]=password.value
            form.reset()
            email.style.display= "none"
            confirmPassword.style.display= "none"
            emailLabel.style.display= "none"
            confirmPasswordLabel.style.display= "none"
            submit.style.display= "none"
            loginbtn.style.display = "block"
            togglebtn.style.display= "none"
            signup.style.display = "block"
            $(".form-fields").removeClass("success");
            $(".form-fields:nth-child(3)").hide();
            $(".form-fields:nth-child(5)").hide();
            index++
        }
    }

    // Form Validator
    
    let isFormValid = function(){
        if(lengthValid && passwordValid && emailValid){
            formValid = true;
        } else{
            formValid = false;
        }
    }
    
    // Switch Button Event Listener

    togglebtn.addEventListener("click",function(event){
            event.preventDefault()
            form.reset()

            
            email.style.display= "none"
            confirmPassword.style.display= "none"
            emailLabel.style.display= "none"
            confirmPasswordLabel.style.display= "none"
            submit.style.display= "none"
            loginbtn.style.display = "block"
            signup.style.display = "block"
            togglebtn.style.display = "none"
            

            $(".form-fields").removeClass("error");
            $(".form-fields").removeClass("success");
            $("small").hide();
            $(".form-fields:nth-child(3)").hide();
            $(".form-fields:nth-child(5)").hide();
            
            
            
        
    })

    // SignUp Button Event Listener
        
    signup.addEventListener("click",function(event){
        event.preventDefault()
        form.reset()
       
        email.style.display= "block"
        confirmPassword.style.display= "block"
        emailLabel.style.display= "block"
        confirmPasswordLabel.style.display= "block"
        submit.style.display= "block"
        togglebtn.style.display="block"
        loginbtn.style.display = "none"
        signup.style.display = "none"

        $(".form-fields:nth-child(3)").show();
        $(".form-fields:nth-child(5)").show();
        $("small").show();
    })


    // Form Submit Event Listener

    submit.addEventListener("click", function(event) {
        event.preventDefault();
        validateUsername(username, 3, 15);
        validateFields([username, email, password, confirmPassword]); 
        validateLength(password, 6, 25);
        isValidEmail(email);
        validatePasswordsMatch(password, confirmPassword);
        isFormValid()
        storeData(username, password)

    });

    // Login Button Event Listener

    loginbtn.addEventListener("click",function(event){
        event.preventDefault();

        if(newUsername.includes(username.value.trim())){
            let newIndex = newUsername.indexOf(username.value.trim())
            
            if(password.value == newPassword[newIndex]){
                window.location.href = "./app.html"
                window.localStorage.setItem("currentUsername", username.value.trim());
            }else{
                // $(".form-fields").addClass("error")
                $("small").hide();
                
                alert("Wrong Password")
            }
        }else{
            // $(".form-fields").addClass("error")
            // $("small").hide();
            alert("Wrong Password or Username")
        }
       
    })

    
    
    $(".back-icon").click(function() {
        window.history.back();
    });
});

// Window Onload Function

window.onload = function() {
    $("#username").focus();
};
