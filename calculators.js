console.log("calculators.js is executing"); // Debugging log

const calculators = [
  { id: "calc-box", name: "Home Selling Price Calculator" },
  { id: "fence-calc-tab", name: "Fence Cost Calculator" },
  { id: "investment-calc-tab", name: "Investment Calculator" },
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

  // Add Calculator Content
  if (calc.id === "calc-box") {
    createHomeSellingCalculator(calcBox);
  } else if (calc.id === "fence-calc-tab") {
    createFenceCalculator(calcBox);
  } else if (calc.id === "investment-calc-tab") {
    createInvestmentCalculator(calcBox);
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





function createHomeSellingCalculator(container) {
  // Add Home Selling Price Calculator content
  console.log("Creating Home Selling Price Calculator");
  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  container.appendChild(title);
    
  // Left Column: Description
  let leftCol = document.createElement("div");
  leftCol.className = "calc-description";
  title.innerText = "Home Selling Price Calculator";
  let desc = document.createElement("p");
  desc.innerText =
    "Enter the values on the right to estimate the selling price of your home. Use the form fields to input your current debt, real estate cost percentage, and desired cashback.";
  leftCol.appendChild(title);
  leftCol.appendChild(desc);

  // Right Column: Form & Result
  let rightCol = document.createElement("div");
  rightCol.className = "calc-form";

  const fields = [
    { id: "num1", label: "Current Debt on House:", placeholder: "Enter debt amount" },
    { id: "num2", label: "Real Estate Cost (%):", placeholder: "Enter cost percentage" },
    { id: "num3", label: "Desired Cashback:", placeholder: "Enter cashback amount" },
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
  rightCol.appendChild(formContainer);

  let buttonBubble = document.createElement("div");
  buttonBubble.className = "bubble";
  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", async () => {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);

    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("result").innerText = result;
  });
  buttonBubble.appendChild(button);
  rightCol.appendChild(buttonBubble);

  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  resultBox.innerHTML = '<h2>Estimated Selling Price</h2><p>Result: $<span id="result"></span></p>';
  rightCol.appendChild(resultBox);

  calcBox.appendChild(leftCol);
  calcBox.appendChild(rightCol);
  document.body.appendChild(calcBox);

  // 3. Fence Cost Calculator
  let fenceCalcBox = document.createElement("div");
  fenceCalcBox.className = "calc-box";
  fenceCalcBox.id = "fence-calc-tab";

  let fenceLeftCol = document.createElement("div");
  fenceLeftCol.className = "calc-description";
  let fenceTitle = document.createElement("h1");
  fenceTitle.innerText = "Fence Cost Calculator";
  let fenceDesc = document.createElement("p");
  fenceDesc.innerText =
    "Calculate the cost to paint a fence. Provide the height, length, and whether one or both sides need to be painted.";
  fenceLeftCol.appendChild(fenceTitle);
  fenceLeftCol.appendChild(fenceDesc);

  let fenceRightCol = document.createElement("div");
  fenceRightCol.className = "calc-form";

  const fenceFields = [
    { id: "fence-height", label: "Height of Fence (ft):", placeholder: "Enter height" },
    { id: "fence-length", label: "Length of Fence (ft):", placeholder: "Enter length" },
    { id: "fence-sides", label: "Number of Sides (1 or 2):", placeholder: "Enter sides" },
  ];

  let fenceFormContainer = document.createElement("div");
  fenceFields.forEach(field => {
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
    fenceFormContainer.appendChild(fieldContainer);
  });
  fenceRightCol.appendChild(fenceFormContainer);

  let fenceButtonBubble = document.createElement("div");
  fenceButtonBubble.className = "bubble";
  let fenceButton = document.createElement("button");
  fenceButton.innerText = "Calculate";
  fenceButton.addEventListener("click", async () => {
    let height = Number(document.getElementById("fence-height").value);
    let length = Number(document.getElementById("fence-length").value);
    let sides = Number(document.getElementById("fence-sides").value);

    const pythonCommand = `calculate_fence_cost(${height}, ${length}, ${sides})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    const [sqft, materialCost, suggestedCost] = JSON.parse(result);

    document.getElementById("fence-sqft").innerText = sqft;
    document.getElementById("fence-material-cost").innerText = materialCost.toFixed(2);
    document.getElementById("fence-suggested-cost").innerText = suggestedCost.toFixed(2);
  });
  fenceButtonBubble.appendChild(fenceButton);
  fenceRightCol.appendChild(fenceButtonBubble);

  let fenceResultBox = document.createElement("div");
  fenceResultBox.className = "result-box";
  fenceResultBox.innerHTML = `
    <h2>Fence Cost Estimation</h2>
    <p>Total Square Footage: <span id="fence-sqft"></span></p>
    <p>Cost of Material: $<span id="fence-material-cost"></span></p>
    <p>Suggested Fence Cost: $<span id="fence-suggested-cost"></span></p>
  `;
  fenceRightCol.appendChild(fenceResultBox);

  fenceCalcBox.appendChild(fenceLeftCol);
  fenceCalcBox.appendChild(fenceRightCol);
  document.body.appendChild(fenceCalcBox);

}





function createFenceCalculator(container) {
  // Add Fence Cost Calculator content
  console.log("Creating Fence Cost Calculator");
  let title = document.createElement("h1");
  title.innerText = "Fence Cost Calculator";
  container.appendChild(title);

  let fenceLeftCol = document.createElement("div");
  fenceLeftCol.className = "calc-description";
  let fenceTitle = document.createElement("h1");
  fenceTitle.innerText = "Fence Cost Calculator";
  let fenceDesc = document.createElement("p");
  fenceDesc.innerText =
    "Calculate the cost to paint a fence. Provide the height, length, and whether one or both sides need to be painted.";
  fenceLeftCol.appendChild(fenceTitle);
  fenceLeftCol.appendChild(fenceDesc);

  let fenceRightCol = document.createElement("div");
  fenceRightCol.className = "calc-form";

  const fenceFields = [
    { id: "fence-height", label: "Height of Fence (ft):", placeholder: "Enter height" },
    { id: "fence-length", label: "Length of Fence (ft):", placeholder: "Enter length" },
    { id: "fence-sides", label: "Number of Sides (1 or 2):", placeholder: "Enter sides" },
  ];

  let fenceFormContainer = document.createElement("div");
  fenceFields.forEach(field => {
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
    fenceFormContainer.appendChild(fieldContainer);
  });
  fenceRightCol.appendChild(fenceFormContainer);

  let fenceButtonBubble = document.createElement("div");
  fenceButtonBubble.className = "bubble";
  let fenceButton = document.createElement("button");
  fenceButton.innerText = "Calculate";
  fenceButton.addEventListener("click", async () => {
    let height = Number(document.getElementById("fence-height").value);
    let length = Number(document.getElementById("fence-length").value);
    let sides = Number(document.getElementById("fence-sides").value);

    const pythonCommand = `calculate_fence_cost(${height}, ${length}, ${sides})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    const [sqft, materialCost, suggestedCost] = JSON.parse(result);

    document.getElementById("fence-sqft").innerText = sqft;
    document.getElementById("fence-material-cost").innerText = materialCost.toFixed(2);
    document.getElementById("fence-suggested-cost").innerText = suggestedCost.toFixed(2);
  });
  fenceButtonBubble.appendChild(fenceButton);
  fenceRightCol.appendChild(fenceButtonBubble);

  let fenceResultBox = document.createElement("div");
  fenceResultBox.className = "result-box";
  fenceResultBox.innerHTML = `
    <h2>Fence Cost Estimation</h2>
    <p>Total Square Footage: <span id="fence-sqft"></span></p>
    <p>Cost of Material: $<span id="fence-material-cost"></span></p>
    <p>Suggested Fence Cost: $<span id="fence-suggested-cost"></span></p>
  `;
  fenceRightCol.appendChild(fenceResultBox);

  fenceCalcBox.appendChild(fenceLeftCol);
  fenceCalcBox.appendChild(fenceRightCol);
  document.body.appendChild(fenceCalcBox);
}





function createInvestmentCalculator(container) {
  // Add Investment Calculator content
  console.log("Creating Investment Calculator");
  let title = document.createElement("h1");
  title.innerText = "Investment Calculator";
  container.appendChild(title);
    
  let investmentLeftCol = document.createElement("div");
  investmentLeftCol.className = "calc-description";
  let investmentTitle = document.createElement("h1");
  investmentTitle.innerText = "Investment Calculator";
  let investmentDesc = document.createElement("p");
  investmentDesc.innerText =
    "Calculate the future value of your investment. Enter the initial investment amount, annual percentage yield (APY), and the number of years.";
  investmentLeftCol.appendChild(investmentTitle);
  investmentLeftCol.appendChild(investmentDesc);

  let investmentRightCol = document.createElement("div");
  investmentRightCol.className = "calc-form";

  const investmentFields = [
    { id: "initial-investment", label: "Initial Investment ($):", placeholder: "Enter initial amount" },
    { id: "apy", label: "APY (%):", placeholder: "Enter APY" },
    { id: "years", label: "Years:", placeholder: "Enter years" },
  ];

  let investmentFormContainer = document.createElement("div");
  investmentFields.forEach(field => {
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
    investmentFormContainer.appendChild(fieldContainer);
  });
  investmentRightCol.appendChild(investmentFormContainer);

  let investmentButtonBubble = document.createElement("div");
  investmentButtonBubble.className = "bubble";
  let investmentButton = document.createElement("button");
  investmentButton.innerText = "Calculate";
  investmentButton.addEventListener("click", async () => {
    let principal = Number(document.getElementById("initial-investment").value);
    let apy = Number(document.getElementById("apy").value);
    let years = Number(document.getElementById("years").value);

    const pythonCommand = `calculate_investment_future_value(${principal}, ${apy}, ${years})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("future-value").innerText = result;
  });
  investmentButtonBubble.appendChild(investmentButton);
  investmentRightCol.appendChild(investmentButtonBubble);

  let investmentResultBox = document.createElement("div");
  investmentResultBox.className = "result-box";
  investmentResultBox.innerHTML = `
    <h2>Investment Growth</h2>
    <p>Future Value: $<span id="future-value"></span></p>
  `;
  investmentRightCol.appendChild(investmentResultBox);

  investmentCalcBox.appendChild(investmentLeftCol);
  investmentCalcBox.appendChild(investmentRightCol);
  document.body.appendChild(investmentCalcBox);

  // Initially hide all tabs except the first one
  document.querySelectorAll(".calc-box").forEach((tab, index) => {
    tab.style.display = index === 0 ? "block" : "none";
  });
}
