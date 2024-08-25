// Data storing variable
companys = [];
model_names = [];
years = [];
fuel_types = [];

// Fetch data and store it

async function fetchData() {
  try {
    const response = await fetch("https://api-car-pice-prediction-website.onrender.com/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // data storing
    companys = data.companys || [];
    model_names = data.model_names || [];
    years = data.year || [];
    fuel_types = data.fuel_type || [];

    populateSelectOptions();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to create select choose option

function createDefaultOption(selectElement, text) {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = text;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);
}

// To add the data in selection
const cnameSelect = document.getElementById("cname");
const modelSelect = document.getElementById("model");
const yearSelect = document.getElementById("year");
const fuelTypeSelect = document.getElementById("fuel_type");
function populateSelectOptions() {
  // add Company Name options
  createDefaultOption(cnameSelect, "Choose option");
  companys.forEach((company) => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;
    cnameSelect.appendChild(option);
  });

  

  // add Year options
  createDefaultOption(yearSelect, "Choose option");
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  // add Fuel Type options
  createDefaultOption(fuelTypeSelect, "Choose option");
  fuel_types.forEach((fuel_type) => {
    const option = document.createElement("option");
    option.value = fuel_type;
    option.textContent = fuel_type;
    fuelTypeSelect.appendChild(option);
  });
}

// To add model selection
function change() {
  modelSelect.value = "";
  modelSelect.innerHTML = "";
  createDefaultOption(modelSelect, "Choose option");
  model_names.forEach((model) => {
    if (model.includes(cnameSelect.value)) {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    }
  });
}

// predict the price

let form = document.getElementById("form");
form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const o = new FormData(form);
    const object = {};
    o.forEach((value, key) => {
      object[key] = value;
    });
    console.log(object);

    const response = await fetch("https://api-car-pice-prediction-website.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    
    let p_predict = document.getElementById("predicted-price");
    document.getElementById("loader-container").style.display = "none";
    p_predict.style.display = "block";
    p_predict.innerHTML = "The Price of Your Car is: $" + data.predict;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("loader-container").style.display = "none";
  }
});
