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
    // console.log('displayTableData : ' + displayTableData);
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
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^(.+)@(.+)$/; //^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$
    const alpabetRegex = /^[a-zA-Z]+$/;
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;

    if (!alpabetRegex.test(fname)) {
        alert("First Name Should be Alphabetical");
        return false;
    }
    if (!alpabetRegex.test(lname)) {
        alert("Last Name Should be Alphabetical");
        return false;
    }
    if (!alphaNumericRegex.test(address)) {
        alert("Address Allows Only AlphaNumeric Values");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!alpabetRegex.test(data.fname)) {
        alert("First Name Should be Alphabetical");
        return false;
    }
    if (!alpabetRegex.test(data.lname)) {
        alert("Last Name Should be Alphabetical");
        return false;
    }
    if (!alphaNumericRegex.test(data.address)) {
        alert("Address Allows Only AlphaNumeric Values");
        return false;
    }
    if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

function handleSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const alpabetRegex = /^[a-zA-Z]+$/g;
    const alpabetRegex = /^[a-zA-Z]+$/;
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/g;
    if (isEdited) {
        const id = formData[changedIndex].id;
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        console.log(formData[changedIndex], "Original object before update");
        const updateObj = { id, fname, lname, email, address }
        if (!updateObj.id || !updateObj.fname || !updateObj.lname || !updateObj.email || !updateObj.address) {
            alert("All fields are required. Please fill out the form completely.");
            return;
        }
        const isValidate = handleValidation(fname, lname, email, address);

        if (!isValidate) {
            return;
        }

        formData[changedIndex] = updateObj;
        console.log(updateObj, "upadte obj");
        console.log(formData[changedIndex], "formdata");
        isEdited = false;
        savelocalStorage();
        displayData();
        handleClearInput();
        return;
    }

    if (!data.fname || !data.lname || !data.email || !data.address) {
        alert("All fields are required. Please fill out the form completely.");
        return;
    }

    const isValidate = handleValidation(data.fname, data.lname, data.email, data.address);
    if (!isValidate) {
        return;
    }
    const formObject = {
        id: GenerateRandomId(8),
        isActive: true,
        ...data
    }

    console.log(formObject, "formObject");
    formData.push(formObject);
    savelocalStorage();
    displayData();
    handleClearInput();
    data = {}
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
