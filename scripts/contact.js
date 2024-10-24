// Contact Validation
        
function formValidation() {
    const email = document.querySelector('.contact-email').value
    const phoneNumber = document.querySelector('.contact-phone_number').value
    const fullName = document.querySelector('.contact-full_name').value
    const address = document.querySelector('.contact-address').value
    const city = document.querySelector('.contact-city').value
    const state = document.querySelector('.contact-state').value
    const pinCode = document.querySelector('.contact-pin_code').value
    const checkBox = document.querySelector('.contact-checkbox').checked;


    const emailRegexCode = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegexCode.test(email)){
        alert("Email is Not valid");
        return false;
    }

    const phoneNumberRegexCode = /^[0-9]{10}$/;
    if(!phoneNumberRegexCode.test(phoneNumber)){
        alert("phoneNumber is Not valid");
        return false;
    }

    if(fullName === "") {
        alert("Please Enter Your full name")
        return false;
    }

    if (address === "") {
        alert("Please Enter Your Address")
        return false;
    }
    if (city === "") {
        alert("Please Enter Your City")
        return false;
    }
    if (state === "") {
        alert("Please Enter Your State")
        return false;
    }

    const pinCodeRegexCode = /^[0-9]{6}$/;
    if (!pinCodeRegexCode.test(pinCode)) {
        alert("Please Enter Your Pin Code")
        return false;
    }
    if (!checkBox) {
        alert("Please Check the checkbox");
        return false;
    }


    return true;
}


document.querySelector('.contact-form').addEventListener('submit' , (e) => {
    e.preventDefault()
    if(formValidation()) {
        alert("Form Submitted Successfully");
        document.querySelector('.contact-form').reset();
    }else {
        alert("Form Not Submitted")
    }
})