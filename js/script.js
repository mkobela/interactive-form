/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/******************************************
Treehouse FSJS Techdegree:
Project 3 - An Interactive Form
******************************************/

// get elememts from HTML
const form = document.querySelector('form');
const usernameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobRoleInput = document.getElementById('title');
const otherJobInput = document.getElementById('other-title');
const designInput = document.getElementById('design');

/**
 * 
 * VALIDATORS
 *  
 */

/***
 * @function isValidUsername - cannot be blank
 * @property {string} username - user name entered on form
 * @returns {boolean} - true if valid
***/
function isValidUsername(username) {
  const isValid = (username.length === 0) ? false : true;
  return isValid;
}

/***
 * @function isValidEmail - Must be a valid email address
 * @property {string} email - email entered on form
 * @returns {boolean} - true if valid
***/
function isValidEmail(email) {
  return /^[^@]+@[^@]+\.[a-z]{3}$/i.test(email);
}

/***
 * @function isValidJobRole - Must be a valid job role
 * @property {string} otherJob - other field
 * @returns {boolean} - true if valid
***/
function isValidJobRole(otherJob) {
  const isValid = (otherJob.length === 0) ? false : true;
  return isValid;
}

/***
 * @function isValidDesign- Must be a valid product
 * @property {string} index - index of selected design
 * @returns {boolean} - true if valid
***/
function isValidDesign(index) {
  const isValid = (index === 0) ? false : true;
  return isValid;
}

/***
 * @function isValidRegistration - Must be a valid registration
 * @returns {boolean} - true if valid
***/
function isValidRegistration() {
  let isChecked = false;

  // get list of checkboxes
  const checkboxList = document.querySelectorAll('.activities input');
  for (let i = 0; i < checkboxList.length; i++) {
    // validate that at least one is selecteed
    if (checkboxList[i].checked) {
      isChecked = true;
      break;
    }
  }

  return isChecked;
}

/***
 * @function isValidCreditCard- Must be a valid creditcard
 * @property {string} number - credit card number
 * @returns {boolean} - true if valid
***/
function isValidCCNumber(number) {
  // check cc number is betweend 13-16 digits
  return /^\d{13,16}$/.test(number);
}

/***
 * @function isValidCCZip- Must be a valid zip code
 * @property {string} zip - zip code
 * @returns {boolean} - true if valid
***/
function isValidCCZip(zip) {
  // check zip code has 5 digigs
  return /^\d{5}$/.test(zip);
}

/***
 * @function isValidCVV- Must be a valid CVV
 * @property {string} cvv - cvv value
 * @returns {boolean} - true if valid
***/
function isValidCVV(cvv) {
  // check CC CVV number has 3 digits
  return /^\d{3}$/.test(cvv);
}

/***
 * @function validateForm - Validiate all form fields
 * @returns {boolean} - true if valid
***/
function validateForm() {

  let isFormValid = true;

  // validate user name input
  const nameError = document.getElementById('name-error');
  isFormValid &= validate(isValidUsername, usernameInput.value, nameError);

  // validate email input
  const emailError = document.getElementById('mail-error');
  isFormValid &= validate(isValidEmail, emailInput.value, emailError);

  // validate job role
  const otherTitleError = document.getElementById('other-title-error');
  if (jobRoleInput.value === 'other') {
    isFormValid &= validate(isValidJobRole, otherJobInput.value, otherTitleError);
  }

  // validate design
  const designError = document.getElementById('design-error');
  isFormValid &= validate(isValidDesign, designInput.selectedIndex, designError)

  // validate registration
  const activitiesError = document.getElementById('activties-error');
  isFormValid &= validate(isValidRegistration, '', activitiesError);


  // validate credit card information
  const payment = document.querySelector('#payment');
  if (payment.value === 'credit card') {
    const ccNumberError = document.getElementById('ccnumber-error');

    // validate number, use conditional messages
    const ccNumber = document.querySelector('#cc-num');
    if (!validate(isValidCCNumber, ccNumber.value, ccNumberError)) {
      isFormValid &= true;

      if (ccNumber.value.length == 0) {
        ccNumberError.innerHTML = '* Please enter a credit card number';
      } else {
        ccNumberError.innerHTML = '* Please enter a number that is 13 to 16 digits long';
      }
    }

    // validate zip code
    const ccZip = document.querySelector('#zip');
    const ccZipError = document.getElementById('zip-error');
    isFormValid &= validate(isValidCCZip, ccZip.value, ccZipError);

    // validate CVV number
    const ccCVV = document.querySelector('#cvv');
    const ccCVVError = document.getElementById('cvv-error');
    isFormValid &= validate(isValidCVV, ccCVV.value, ccCVVError);
  }

  return isFormValid;
}

/***
 * @function validtor - helper function to set css display
 * @param {function} - validatior function
 * @param {string} - element value
 * @param {element} - HTML element
***/
function validate(validator, value, element) {
  let isFieldValid = false;

  if (validator(value)) {
    isFieldValid = true;
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }

  return isFieldValid;
}

/**
 * 
 * SET UP EVENTS
 * 
 */

// add listener on email input
emailInput.addEventListener('input', (e) => {
  // show email validation real-time
  const emailError = document.getElementById('mail-error');
  validate(isValidEmail, emailInput.value, emailError);
});

// add listener on job role title
jobRoleInput.addEventListener("change", () => {
  // get selected title option
  const selectedOption = jobRoleInput.value;

  if (selectedOption === 'other') {
    //show other title input
    otherJobInput.style.display = "block";
  } else {
    // hide other title input
    otherJobInput.style.display = "none";
  }
});

// add listener on design element
designInput.addEventListener("change", (e) => {

  const selectedDesignIndex = e.target.selectedIndex;
  processColorList(selectedDesignIndex);
});

// add listener on activities eleent
const activities = document.querySelector('.activities');
activities.addEventListener("change", (e) => {
  processActivities(e);
});

// add listener on credit card element
payment.addEventListener("change", (e) => {

  const paymentOptions = e.target.options;
  const selectedOption = paymentOptions[paymentOptions.selectedIndex];
  processPayment(selectedOption);
});

// add listener on submit button
form.addEventListener("submit", (e) => {
  // validate form values
  if (!validateForm()) {
    // form is not valid, stop submit
    e.preventDefault();
  }
});

/***
 * @function processPayment - process pauyment activity
 * @property {object} event - window event
***/
function processPayment(selectedOption) {

  const creditDiv = document.querySelector('#credit-card');
  const paypalDiv = document.querySelector('#paypal');
  const bitcoinDiv = document.querySelector('#bitcoin');

  function setDisplayFields(ccDisplay, ppDisplay, bcDisplay) {
    creditDiv.style.display = ccDisplay;
    paypalDiv.style.display = ppDisplay;
    bitcoinDiv.style.display = bcDisplay;
  }

  if (selectedOption.value === 'credit card') {
    setDisplayFields('block', 'none', 'none');
  } else if (selectedOption.value === 'paypal') {
    setDisplayFields('none', 'block', 'none');
  } else if (selectedOption.value === 'bitcoin') {
    setDisplayFields('none', 'none', 'block');
  }
}

/***
 * @function processActivities - process activity checkboxes
 * @property {object} event - window event
***/
function processActivities(e) {

  // get list of all checkboxes
  const checkboxList = document.querySelectorAll('.activities input');
  const selectedCheckbox = e.target;
  let total = 0;

  for (let i = 0; i < checkboxList.length; i++) {

    // ignore box being checked
    if (selectedCheckbox.name !== checkboxList[i].name) {
      // check if any other box matches selected date
      const a1 = selectedCheckbox.getAttribute('data-day-and-time');
      const a2 = checkboxList[i].getAttribute('data-day-and-time');

      // check if events have same time
      if (a1 === a2) {
        // check if current selection is being checked or no
        if (selectedCheckbox.checked === true) {
          // disable conflicting item
          checkboxList[i].disabled = true;
        } else {
          // clear conflicting item
          checkboxList[i].disabled = false;
        }
      }
    }

    // total all checked items
    if (checkboxList[i].checked) {
      total += parseInt(checkboxList[i].getAttribute('data-cost'));
    }

  }

  // get total amount element and update $
  const totalAmountElement = document.querySelector('#totalAmount');

  if (total > 0) {
    const displayAmount = `
      <label id="totalAmt">
      $${total}
      </label>
    `;

    totalAmountElement.innerHTML = displayAmount;
  } else {
    totalAmountElement.innerHTML = "";
  }
}

/***
 * @function processColorList - show/hide colors
 * @property {number} selectedDesignIndex - index of selected design
***/
function processColorList(selectedDesignIndex) {

  const colorInput = document.getElementById('color');
  const colorOptions = colorInput.options;
  let isOptionSelected = false;

  function showOptions(condition, index) {
    if (condition) {
      showOption(index, true);
    } else {
      showOption(index, false);
    }
  }

  function showOption(index, show) {
    if (show) {
      // remove hidden attribute
      colorOptions[index].removeAttribute('hidden');

      // select first available shown option
      if (!isOptionSelected) {
        colorOptions[index].selected = 'true'
        isOptionSelected = true;
      }
    } else {
      // set hidden attribute
      colorOptions[index].hidden = 'true';
    }
  }

  // show color options that match selected design
  const shirtDiv = document.getElementById('shirt-colors')
  for (let i = 0; i < colorOptions.length; i++) {
    if (selectedDesignIndex === 0) {

      // no theme selected, hide all options except warning
      showOptions(i == 0, i);
      shirtDiv.style.display = 'none';
    } else if (selectedDesignIndex === 1) {

      // Puns theme selected
      shirtDiv.style.display = 'block';
      showOptions(colorOptions[i].innerHTML.includes('JS Puns'), i)
    } else if (selectedDesignIndex === 2) {

      // Love theme selected
      shirtDiv.style.display = 'block';
      showOptions(colorOptions[i].innerHTML.includes('JS shirt'), i)
    }
  }
}

function setDefaultJobRole() {
  jobRoleInput[0].selected = 'true'
  otherJobInput.style.display = 'none';
}

function setDefaultPayment() {
  processPayment(payment.options[1]);
}

/**
 * 
 * Start of program
 *  
 */

// set focus to username
usernameInput.focus();

// setup color list
processColorList(0);

// select default job role
setDefaultJobRole()

// select default payment
setDefaultPayment();