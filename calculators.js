console.log("calculators.js is executing"); // Debugging log

const calculators = [
  { id: "home-selling-calc", name: "Home Selling Price Calculator" },
  { id: "fence-calc", name: "Fence Cost Calculator" },
  { id: "investment-calc", name: "Investment Calculator" },
];

let calculatorsBox = document.getElementById("calculators-tab");
if (!calculatorsBox) {
  console.error("calculators-tab element not found");
} else {
  console.log("Found calculators-tab element");
}

// Create sub-navigation for calculators
let subNav = document.createElement("ul");
subNav.className = "sub-nav";
calculatorsBox.appendChild(subNav);

calculators.forEach(calc => {
  let subNavItem = document.createElement("li");
  let subNavLink = document.createElement("a");
  subNavLink.href = `#${calc.id}`;
  subNavLink.innerText = calc.name;
  subNavItem.appendChild(subNavLink);
  subNav.appendChild(subNavItem);

  // Create calculator container
  let calcBox = document.createElement("div");
  calcBox.className = "calc-box";
  calcBox.id = calc.id;
  calcBox.style.display = "none"; // Hide initially
  calculatorsBox.appendChild(calcBox);

  // Add content to each calculator
  switch (calc.id) {
    case "home-selling-calc":
      createHomeSellingCalculator(calcBox);
      break;
    case "fence-calc":
      createFenceCalculator(calcBox);
      break;
    case "investment-calc":
      createInvestmentCalculator(calcBox);
      break;
  }
});

// Sub-tab Navigation Logic
document.querySelectorAll(".sub-nav a").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(`Clicked on ${this.innerText}`);

    // Hide all individual calculators
    calculators.forEach(calc => {
      let calcBox = document.getElementById(calc.id);
      if (calcBox) calcBox.style.display = "none";
    });

    // Show the selected calculator
    let target = this.getAttribute("href").substring(1);
    let targetElement = document.getElementById(target);
    if (targetElement) {
      targetElement.style.display = "block";
    } else {
      console.error(`Target element with ID ${target} not found`);
    }
  });
});

// Create Home Selling Price Calculator
function createHomeSellingCalculator(container) {
  console.log("Creating Home Selling Price Calculator");

  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  container.appendChild(title);

  let desc = document.createElement("p");
  desc.innerText =
    "Enter the values below to estimate the selling price of your home.";
  container.appendChild(desc);

  const fields = [
    { id: "num1", label: "Current Debt on House ($):", placeholder: "Enter debt amount" },
    { id: "num2", label: "Real Estate Cost (%):", placeholder: "Enter cost percentage" },
    { id: "num3", label: "Desired Cashback ($):", placeholder: "Enter cashback amount" },
  ];

  let formContainer = document.createElement("div");
  fields.forEach(field => {
    let fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";

    let label = document.createElement("label");
    label.innerText = field.label;

    let input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.placeholder = field.placeholder;

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
  });
  container.appendChild(formContainer);

  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", async () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);

    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    resultBox.innerText = `Result: $${result}`;
  });

  container.appendChild(button);

  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  container.appendChild(resultBox);
}

// Create Fence Cost Calculator
function createFenceCalculator(container) {
  console.log("Creating Fence Cost Calculator");

  let title = document.createElement("h1");
  title.innerText = "Fence Cost Calculator";
  container.appendChild(title);

  let desc = document.createElement("p");
  desc.innerText =
    "Calculate the cost to paint a fence. Provide the dimensions and sides to paint.";
  container.appendChild(desc);

  const fields = [
    { id: "fence-height", label: "Height of Fence (ft):", placeholder: "Enter height" },
    { id: "fence-length", label: "Length of Fence (ft):", placeholder: "Enter length" },
    { id: "fence-sides", label: "Number of Sides (1 or 2):", placeholder: "Enter sides" },
  ];

  let formContainer = document.createElement("div");
  fields.forEach(field => {
    let fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";

    let label = document.createElement("label");
    label.innerText = field.label;

    let input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.placeholder = field.placeholder;

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
  });
  container.appendChild(formContainer);

  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", async () => {
    let height = Number(document.getElementById("fence-height").value);
    let length = Number(document.getElementById("fence-length").value);
    let sides = Number(document.getElementById("fence-sides").value);

    const pythonCommand = `calculate_fence_cost(${height}, ${length}, ${sides})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    const [sqft, materialCost, suggestedCost] = JSON.parse(result);

    resultBox.innerHTML = `
      Total Square Footage: ${sqft} <br>
      Cost of Material: $${materialCost.toFixed(2)} <br>
      Suggested Fence Cost: $${suggestedCost.toFixed(2)}
    `;
  });

  container.appendChild(button);

  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  container.appendChild(resultBox);
}

// Create Investment Calculator
function createInvestmentCalculator(container) {
  console.log("Creating Investment Calculator");

  let title = document.createElement("h1");
  title.innerText = "Investment Calculator";
  container.appendChild(title);

  let desc = document.createElement("p");
  desc.innerText =
    "Calculate the future value of your investment. Provide the details below.";
  container.appendChild(desc);

  const fields = [
    { id: "initial-investment", label: "Initial Investment ($):", placeholder: "Enter initial amount" },
    { id: "apy", label: "APY (%):", placeholder: "Enter APY" },
    { id: "years", label: "Years:", placeholder: "Enter years" },
  ];

  let formContainer = document.createElement("div");
  fields.forEach(field => {
    let fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";

    let label = document.createElement("label");
    label.innerText = field.label;

    let input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.placeholder = field.placeholder;

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
  });
  container.appendChild(formContainer);

  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", async () => {
    let principal = Number(document.getElementById("initial-investment").value);
    let apy = Number(document.getElementById("apy").value);
    let years = Number(document.getElementById("years").value);

    const pythonCommand = `calculate_investment_future_value(${principal}, ${apy}, ${years})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    resultBox.innerHTML = `Future Value: $${result}`;
  });

  container.appendChild(button);

  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  container.appendChild(resultBox);
}
