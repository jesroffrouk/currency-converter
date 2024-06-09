const select = document.querySelectorAll(".dropdown select");
const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const submit = document.querySelector("#submit");
const fromcurr = document.querySelector("#from");
const tocurr = document.querySelector("#to");
for(let se of select){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(se.name =="from" && currcode === "USD"){
            newOption.selected = "selected";
        }
        else if(se.name == "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        se.append(newOption);
    }
    se.addEventListener("change" ,(e)=>{
        updateflag(e.target);
    })
}
const updateflag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.parentElement.querySelector("img");
    img.src = newsrc;
}
submit.addEventListener("click" , async(e)=>{
    e.preventDefault();
    let amount = document.querySelector("form #input-tag");
    if (amount.value === "" || amount.value < 1){
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let amv = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamount = amv * amount.value;
    const result = document.querySelector("h4");
    result.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
})
