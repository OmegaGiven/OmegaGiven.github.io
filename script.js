document.addEventListener("DOMContentLoaded", async function () {
  // 1. Create Navigation Tab
  let nav = document.createElement("nav");
  nav.className = "tab-nav";

  let navList = document.createElement("ul");
  nav.appendChild(navList);
  document.body.insertBefore(nav, document.body.firstChild);




  
  
  // Add tabs for Calculators
  const tabs = [
    { id: "calc-box", name: "Home Selling Price Calculator" },
    { id: "fence-calc-tab", name: "Fence Cost Calculator" },
  ];

  tabs.forEach(tab => {
    let navItem = document.createElement("li");
    let navLink = document.createElement("a");
    navLink.href = `#${tab.id}`;
    navLink.innerText = tab.name;
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });






  
  // Tab Navigation Logic
  document.querySelectorAll(".tab-nav a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Hide all calculator boxes
      document.querySelectorAll(".calc-box").forEach(tab => {
        tab.style.display = "none";
      });

      // Show the selected tab
      let target = this.getAttribute("href").substring(1);
      document.getElementById(target).style.display = "block";
    });
  });




  

  // Add Investment Calculator Tab
  const investmentTab = { id: "investment-calc-tab", name: "Investment Calculator" };
  let navList = document.querySelector(".tab-nav ul");
  let navItem = document.createElement("li");
  let navLink = document.createElement("a");
  navLink.href = `#${investmentTab.id}`;
  navLink.innerText = investmentTab.name;
  navItem.appendChild(navLink);
  navList.appendChild(navItem);

  // Create Investment Calculator Content
  let investmentCalcBox = document.createElement("div");
  investmentCalcBox.className = "calc-box";
  investmentCalcBox.id = investmentTab.id; // Matches the tab link

  // Left Column: Description
  let investmentLeftCol = document.createElement("div");
  investmentLeftCol.className = "calc-description";
  let investmentTitle = document.createElement("h1");
  investmentTitle.innerText = "Investment Calculator";
  let investmentDesc = document.createElement("p");
  investmentDesc.innerText =
    "Calculate the future value of your investment. Enter the initial investment amount, annual percentage yield (APY), and the number of years to see how much your money will grow.";
  investmentLeftCol.appendChild(investmentTitle);
  investmentLeftCol.appendChild(investmentDesc);

  // Right Column: Form & Result
  let investmentRightCol = document.createElement("div");
  investmentRightCol.className = "calc-form";

  // Input Fields
  const investmentFields = [
    {
      id: "initial-investment",
      label: "Initial Investment Amount ($):",
      placeholder: "Enter initial amount",
    },
    {
      id: "apy",
      label: "Annual Percentage Yield (APY %):",
      placeholder: "Enter APY (e.g., 5 for 5%)",
    },
    {
      id: "years",
      label: "Number of Years:",
      placeholder: "Enter number of years",
    },
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

  // Create a bubble container for the Calculate button
  let investmentButtonBubble = document.createElement("div");
  investmentButtonBubble.className = "bubble";
  let investmentButton = document.createElement("button");
  investmentButton.innerText = "Calculate";
  investmentButton.addEventListener("click", calculateFutureValue);
  investmentButtonBubble.appendChild(investmentButton);
  investmentRightCol.appendChild(investmentButtonBubble);

  // Create the result box
  let investmentResultBox = document.createElement("div");
  investmentResultBox.className = "result-box";
  investmentResultBox.innerHTML = `
    <h2>Investment Growth</h2>
    <p>Future Value: $<span id="future-value"></span></p>
  `;
  investmentRightCol.appendChild(investmentResultBox);

  // Append both columns to the calculator box
  investmentCalcBox.appendChild(investmentLeftCol);
  investmentCalcBox.appendChild(investmentRightCol);
  document.body.appendChild(investmentCalcBox);

  // Initially hide all tabs except the first one
  document.querySelectorAll(".calc-box").forEach((tab, index) => {
    tab.style.display = index === 0 ? "block" : "none";
  });

  // Calculator Logic
  function calculateFutureValue() {
    let principal = Number(document.getElementById("initial-investment").value);
    let apy = Number(document.getElementById("apy").value) / 100; // Convert APY to decimal
    let years = Number(document.getElementById("years").value);

    if (principal <= 0 || apy <= 0 || years <= 0) {
      alert("Please enter positive values for all fields.");
      return;
    }

    let futureValue = principal * Math.pow(1 + apy, years);
    document.getElementById("future-value").innerText = futureValue.toFixed(2);
  }


  


  
  // 2. Create Home Selling Price Calculator
  let calcBox = document.createElement("div");
  calcBox.className = "calc-box";
  calcBox.id = "calc-box"; // so the nav link can scroll here

  // Left Column: Description
  let leftCol = document.createElement("div");
  leftCol.className = "calc-description";
  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  let desc = document.createElement("p");
  desc.innerText =
    "Enter the values on the right to estimate the selling price of your home. Use the form fields to input your current debt, real estate cost percentage, and desired cashback. Then click calculate to get your estimated price.";
  leftCol.appendChild(title);
  leftCol.appendChild(desc);

  // Right Column: Form & Result
  let rightCol = document.createElement("div");
  rightCol.className = "calc-form";

  // Container for Input Fields (each vertically stacked)
  const fields = [
    {
      id: "num1",
      label: "Current Debt on House:",
      placeholder: "Enter debt amount",
    },
    {
      id: "num2",
      label: "Real Estate Cost (% without % sign):",
      placeholder: "Enter cost percentage",
    },
    {
      id: "num3",
      label: "Desired Cashback:",
      placeholder: "Enter cashback amount",
    },
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

  // Create a bubble container for the Calculate button
  let buttonBubble = document.createElement("div");
  buttonBubble.className = "bubble";
  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", runPython);
  buttonBubble.appendChild(button);
  rightCol.appendChild(buttonBubble);

  // Create the result box
  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  resultBox.innerHTML =
    '<h2>Estimated Selling Price</h2><p>Result: $<span id="result"></span></p>';
  rightCol.appendChild(resultBox);

  // Append both columns to the calculator box
  calcBox.appendChild(leftCol);
  calcBox.appendChild(rightCol);
  document.body.appendChild(calcBox);







  
  // 3. Create Fence Cost Calculator
  let fenceCalcBox = document.createElement("div");
  fenceCalcBox.className = "calc-box";
  fenceCalcBox.id = "fence-calc-tab"; // so the nav link can scroll here

  // Left Column: Description
  let fenceLeftCol = document.createElement("div");
  fenceLeftCol.className = "calc-description";
  let fenceTitle = document.createElement("h1");
  fenceTitle.innerText = "Fence Cost Calculator";
  let fenceDesc = document.createElement("p");
  fenceDesc.innerText =
    "Calculate the cost to paint a fence. Provide the height, length, and whether one or both sides need to be painted. The calculator will estimate the total square footage, material cost, and the suggested price to charge.";
  fenceLeftCol.appendChild(fenceTitle);
  fenceLeftCol.appendChild(fenceDesc);

  // Right Column: Form & Result
  let fenceRightCol = document.createElement("div");
  fenceRightCol.className = "calc-form";

  // Container for Input Fields (each vertically stacked)
  const fenceFields = [
    {
      id: "fence-height",
      label: "Height of Fence (ft):",
      placeholder: "Enter height",
    },
    {
      id: "fence-length",
      label: "Length of Fence (ft):",
      placeholder: "Enter length",
    },
    {
      id: "fence-sides",
      label: "Number of Sides (1 or 2):",
      placeholder: "Enter 1 or 2",
    },
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

  // Create a bubble container for the Calculate button
  let fenceButtonBubble = document.createElement("div");
  fenceButtonBubble.className = "bubble";
  let fenceButton = document.createElement("button");
  fenceButton.innerText = "Calculate";
  fenceButton.addEventListener("click", runFencePython);
  fenceButtonBubble.appendChild(fenceButton);
  fenceRightCol.appendChild(fenceButtonBubble);

  // Create the result box
  let fenceResultBox = document.createElement("div");
  fenceResultBox.className = "result-box";
  fenceResultBox.innerHTML = `
    <h2>Fence Cost Estimation</h2>
    <p>Total Square Footage: <span id="fence-sqft"></span></p>
    <p>Cost of Material: $<span id="fence-material-cost"></span></p>
    <p>Suggested Fence Cost: $<span id="fence-suggested-cost"></span></p>
  `;
  fenceRightCol.appendChild(fenceResultBox);

  // Append both columns to the calculator box
  fenceCalcBox.appendChild(fenceLeftCol);
  fenceCalcBox.appendChild(fenceRightCol);
  document.body.appendChild(fenceCalcBox);

  // Initially hide all tabs except the first one
  document.querySelectorAll(".calc-box").forEach((tab, index) => {
    tab.style.display = index === 0 ? "block" : "none";
  });





  
  // Python Logic for Fence Calculator
  async function runFencePython() {
    let height = Number(document.getElementById("fence-height").value);
    let length = Number(document.getElementById("fence-length").value);
    let sides = Number(document.getElementById("fence-sides").value);
    const pythonCommand = `calculate_fence_cost(${height}, ${length}, ${sides})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    const [sqft, materialCost, suggestedCost] = JSON.parse(result);

    document.getElementById("fence-sqft").innerText = sqft;
    document.getElementById("fence-material-cost").innerText = materialCost.toFixed(2);
    document.getElementById("fence-suggested-cost").innerText = suggestedCost.toFixed(2);
  }
  
  // Python Logic for Home Selling Price Calculator
  async function runPython() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);
    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("result").innerText = result;
  }





  
  // Load Pyodide and External Python Scripts
  async function loadPyodideAndPythonScripts() {
    window.pyodide = await loadPyodide();

    // Load multiple Python scripts
    const pythonScripts = ["sell_price_calculator.py", "fence_cost_calculator.py"];
    for (const script of pythonScripts) {
      const response = await fetch(script);
      if (!response.ok) {
        throw new Error(`Failed to load ${script}`);
      }
      const scriptText = await response.text();
      await pyodide.runPythonAsync(scriptText);
    }
  }
  await loadPyodideAndPythonScripts();




  // 3. Create Footer / Contact Info Section
  let footer = document.createElement("footer");
  let contactDiv = document.createElement("div");
  contactDiv.className = "contact-info";

  // Add a link to email
  let contactP = document.createElement("p");
  contactP.innerHTML =
    'Contact me at: <a href="mailto:omegagiven9@gmail.com">omegagiven9@gmail.com</a>';
  contactDiv.appendChild(contactP);

  // Add a link to the Github
  let gitlinkP = document.createElement("p");
  contactP.innerHTML =
    'Contact me at: <a href="https://github.com/OmegaGiven">GitHub</a>';
  contactDiv.appendChild(gitlinkP);

   // Add a link to the Etsy Store
  let etsyLinkP = document.createElement("p");
  etsyLinkP.innerHTML =
    'Check out my Etsy store: <a href="https://www.etsy.com/shop/OmegaSolutions" target="_blank">My Etsy Store</a>';
  contactDiv.appendChild(etsyLinkP);

  footer.appendChild(contactDiv);
  document.body.appendChild(footer);
});
