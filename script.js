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
    { id: "investment-calc-tab", name: "Investment Calculator" }, // New Investment Calculator Tab
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




  
  // 2. Create Investment Calculator
  let investmentCalcBox = document.createElement("div");
  investmentCalcBox.className = "calc-box";
  investmentCalcBox.id = "investment-calc-tab";

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
    { id: "initial-investment", label: "Initial Investment Amount ($):", placeholder: "Enter initial amount" },
    { id: "apy", label: "Annual Percentage Yield (APY %):", placeholder: "Enter APY (e.g., 5 for 5%)" },
    { id: "years", label: "Number of Years:", placeholder: "Enter number of years" },
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
  investmentButton.addEventListener("click", async () => {
    let principal = Number(document.getElementById("initial-investment").value);
    let apy = Number(document.getElementById("apy").value);
    let years = Number(document.getElementById("years").value);

    if (principal <= 0 || apy <= 0 || years <= 0) {
      alert("Please enter positive values for all fields.");
      return;
    }

    const pythonCommand = `calculate_investment_future_value(${principal}, ${apy}, ${years})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("future-value").innerText = result;
  });
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




  
  // 3. Load Pyodide and External Python Scripts
  async function loadPyodideAndPythonScripts() {
    window.pyodide = await loadPyodide();

    const pythonScripts = ["sell_price_calculator.py", "fence_cost_calculator.py", "investment_calculator.py"];
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
});
