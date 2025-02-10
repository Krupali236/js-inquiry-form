let formData = JSON.parse(localStorage.getItem("formData")) || [];

function savelocalStorage() {
    localStorage.setItem("formData", JSON.stringify(formData))
}

function GenerateRandomId(length) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}
function displayData() {
    let displayTableData = formData.map((item, index) =>
        `<tr>
            <td>${item.id}</td>
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>
            <button class="btn border-0 bg-transparent ${!item.isActive ? 'disabled' : 'default'}">
                    <i class="bi bi-pencil-fill me-2" onclick=handleEditBtn(${index})></i>
                </button>
                 <button class="btn border-0 bg-transparent ${!item.isActive ? 'disabled' : 'default'}">
                    <i class="bi bi-trash3-fill me-2 disabled" onclick=handleDeleteBtn(${index})></i>            
                </button>            
            </td>            
            <td>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="${item.isActive ? 'flexSwitchCheckChecked' : 'flexSwitchCheckDefault'} " onclick={handleBlockUser(${index})} ${item.isActive ? "checked" : "default"}  >
                     <label class="form-check-label" for="${item.isActive ? 'flexSwitchCheckChecked' : 'flexSwitchCheckDefault'}">${item.isActive ? 'active' : 'block'}</label>
                </div>
            </td>
        </tr>
        `)
    document.getElementById('tableData').innerHTML = displayTableData.join("");
    savelocalStorage();
}
let data = {};
let isEdited = false;
let changedIndex = null;


function inputChange(name, value) {
    data[name] = value;
    console.log(value);
    console.log(data[name], "data[name]");
}

function handleValidation(fname, lname, email, address) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation
    const alphabetRegex = /^[a-zA-Z]+$/;
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    let isValidation = true;

    // First Name Validation
    if (!alphabetRegex.test(fname)) {
        isValidation = false;
        document.getElementById("fname").style.borderColor = "red";
        document.getElementById("fname-error").innerHTML = "Please enter a valid first name.";
    } else {
        document.getElementById("fname").style.borderColor = "";
        document.getElementById("fname-error").innerHTML = "";
    }

    // Last Name Validation
    if (!alphabetRegex.test(lname)) {
        isValidation = false;
        document.getElementById("lname").style.borderColor = "red";
        document.getElementById("lname-error").innerHTML = "Please enter a valid last name.";
    } else {
        document.getElementById("lname").style.borderColor = "";
        document.getElementById("lname-error").innerHTML = "";
    }

    // Address Validation
    if (!alphaNumericRegex.test(address)) {
        isValidation = false;
        document.getElementById("address").style.borderColor = "red";
        document.getElementById("address-error").innerHTML = "Please enter a valid address.";
    } else {
        document.getElementById("address").style.borderColor = "";
        document.getElementById("address-error").innerHTML = "";
    }

    // Email Validation
    if (!emailRegex.test(email)) {
        isValidation = false;
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("email-error").innerHTML = "Please enter a valid email address.";
    } else {
        document.getElementById("email").style.borderColor = "";
        document.getElementById("email-error").innerHTML = "";
    }

    return isValidation; // Return the overall validation result

}
function handleSubmit() {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    console.log(fname + " " + lname + " " + email + " " + address);
    // Perform validation
    const isValidate = handleValidation(fname, lname, email, address);
    if (!isValidate) {
        return; // Exit if validation fails
    }

    if (isEdited) {
        // Update existing data
        const id = formData[changedIndex].id;
        const updateObj = { id, fname, lname, email, address };
        formData[changedIndex] = updateObj;
        isEdited = false;
        changedIndex = null;
    } else {
        // Add new data
        const formObject = {
            id: GenerateRandomId(8),
            isActive: true,
            fname,
            lname,
            email,
            address
        };
        formData.push(formObject);
    }

    // Save and refresh table
    savelocalStorage();
    displayData();
    handleClearInput();
    data = {}; // Clear temporary data
}

function handleDeleteBtn(index) {
    formData.splice(index, 1);
    displayData();
    savelocalStorage();
}

function handleEditBtn(index) {
    isEdited = true;
    const filteredData = formData[index];
    console.log(filteredData.fname, "fileteredData")
    if (!filteredData) return;
    document.getElementById("fname").value = filteredData.fname;
    document.getElementById("lname").value = filteredData.lname;
    document.getElementById("email").value = filteredData.email;
    document.getElementById("address").value = filteredData.address;
    changedIndex = index;
    console.log(changedIndex, "changedIndex");
}

function handleBlockUser(index) {
    formData[index].isActive = formData[index].isActive ? false : true;
    console.log(formData[index].isActive, "isActive");

    displayData();
    savelocalStorage();
}
function handleClearInput() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
}

window.onload = displayData;
