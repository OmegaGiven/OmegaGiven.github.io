document.addEventListener("DOMContentLoaded", async function () {
  // 1. Create Navigation Tab
  let nav = document.createElement("nav");
  nav.className = "tab-nav";

  let navList = document.createElement("ul");
  let navItem = document.createElement("li");
  let navLink = document.createElement("a");
  navLink.href = "#calc-box";
  navLink.innerText = "Home Selling Price Calculator";
  navItem.appendChild(navLink);
  navList.appendChild(navItem);
  nav.appendChild(navList);
  document.body.insertBefore(nav, document.body.firstChild);




  

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

  


  // 4. Load Pyodide and External Python Code
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

  

  // Add a new tab for Fence Calculator
  let fenceNavItem = document.createElement("li");
  let fenceNavLink = document.createElement("a");
  fenceNavLink.href = "#fence-calc-tab";
  fenceNavLink.innerText = "Fence Cost Calculator";
  fenceNavItem.appendChild(fenceNavLink);
  navList.appendChild(fenceNavItem);

  // Create the Fence Calculator Content
  let fenceCalcTab = document.createElement("div");
  fenceCalcTab.id = "fence-calc-tab";
  fenceCalcTab.style.display = "none"; // Initially hidden

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
  let fenceCalcBox = document.createElement("div");
  fenceCalcBox.className = "calc-box";
  fenceCalcBox.id = "fence-calc-tab"; // so the nav link can scroll here
  fenceCalcBox.appendChild(fenceLeftCol);
  fenceCalcBox.appendChild(fenceRightCol);
  document.body.appendChild(fenceCalcBox);

  // Tab Navigation Logic
  document.querySelectorAll(".tab-nav a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Hide all tabs
      document.querySelectorAll("div[id$='-tab']").forEach(tab => {
        tab.style.display = "none";
      });

      // Show the selected tab
      let target = this.getAttribute("href").substring(1);
      document.getElementById(target).style.display = "block";
    });
  });

  // Python Calculation Logic
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




  

  
  // 2. Create Calculator Wrapper Box
  // This box will have two columns: left for description; right for form and result.
  let calcBox = document.createElement("div");
  calcBox.className = "calc-box";
  calcBox.id = "calc-box"; // so the nav link can scroll here

  // Left Column: Description
  let leftCol = document.createElement("div");
  leftCol.className = "calc-description";
  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  let desc = document.createElement("p");
  desc.innerText = "Enter the values on the right to estimate the selling price of your home. Use the form fields to input your current debt, real estate cost percentage, and desired cashback. Then click calculate to get your estimated price.";
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




  
  // 3. Create Footer / Contact Info Section
  let footer = document.createElement("footer");
  let contactDiv = document.createElement("div");
  contactDiv.className = "contact-info";

  let contactP = document.createElement("p");
  contactP.innerHTML =
    'Contact me at: <a href="mailto:omegagiven9@gmail.com">omegagiven9@gmail.com</a>';
  contactDiv.appendChild(contactP);

    // Add a link to the Etsy Store
  let etsyLinkP = document.createElement("p");
  etsyLinkP.innerHTML =
    'Check out my Etsy store: <a href="https://www.etsy.com/shop/OmegaSolutions" target="_blank">My Etsy Store</a>';
  contactDiv.appendChild(etsyLinkP);

  footer.appendChild(contactDiv);
  document.body.appendChild(footer);



  
  // 5. Execute the Python Calculation
  async function runPython() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);
    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("result").innerText = result;
  }
});
