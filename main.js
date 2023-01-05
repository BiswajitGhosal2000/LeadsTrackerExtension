let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

//localStorage.clear();
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (myLeads.includes(tabs[0].url)){
            alert("Already added");
        } else {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            renderLeads(myLeads);
        }
    });
})

inputBtn.addEventListener("click", function () {
    let txt = inputEl.value.trim();
    if (txt.length === 0) {
        alert("enter a text!");
    } else if (myLeads.includes(txt)) {
        alert(` "${txt}" is already in the list!`);
    } else {
        myLeads.push(txt);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    }
})
deleteBtn.addEventListener("dblclick", function () {
    console.log("doubled click");
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});

function renderLeads(leads) {
    let listItem = ""
    for (let i = 0; i < leads.length; i++) {
        listItem += `
        <li>
            <a href = '${leads[i]}' target = '_blank' >${leads[i]} </a>
        </li>
    `;
    }
    ulEl.innerHTML = listItem;
}