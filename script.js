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


// Add a new tab for the Etsy Store
  let etsyNavItem = document.createElement("li");
  let etsyNavLink = document.createElement("a");
  etsyNavLink.href = "#etsy-tab";
  etsyNavLink.innerText = "Etsy Store";
  etsyNavItem.appendChild(etsyNavLink);
  navList.appendChild(etsyNavItem);

  // Create the Etsy Tab Content
  let etsyTab = document.createElement("div");
  etsyTab.id = "etsy-tab";
  etsyTab.style.display = "none"; // Initially hidden

  let etsyIframe = document.createElement("iframe");
  etsyIframe.src = "https://www.etsy.com/shop/omegasolutions"; // Replace with your store URL
  etsyIframe.width = "100%";
  etsyIframe.height = "800px";
  etsyIframe.style.border = "none";
  etsyIframe.title = "Etsy Storefront";

  etsyTab.appendChild(etsyIframe);
  document.body.appendChild(etsyTab);

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

  // let socialP = document.createElement("p");
  // socialP.innerText = "Follow me on social media:";
  // contactDiv.appendChild(socialP);

  // let socialUl = document.createElement("ul");

  // let liTwitter = document.createElement("li");
  // let linkTwitter = document.createElement("a");
  // linkTwitter.href = "https://twitter.com/yourhandle";
  // linkTwitter.target = "_blank";
  // linkTwitter.innerText = "Twitter";
  // liTwitter.appendChild(linkTwitter);
  // socialUl.appendChild(liTwitter);

  // let liLinkedIn = document.createElement("li");
  // let linkLinkedIn = document.createElement("a");
  // linkLinkedIn.href = "https://www.linkedin.com/in/yourprofile";
  // linkLinkedIn.target = "_blank";
  // linkLinkedIn.innerText = "LinkedIn";
  // liLinkedIn.appendChild(linkLinkedIn);
  // socialUl.appendChild(liLinkedIn);

  // contactDiv.appendChild(socialUl);
  footer.appendChild(contactDiv);
  document.body.appendChild(footer);

  // 4. Load Pyodide and External Python Code
  async function loadPyodideAndPythonScripts() {
    window.pyodide = await loadPyodide();
    const response = await fetch("sell_price_calculator.py");
    if (!response.ok) {
      throw new Error("Failed to load sell_price_calculator.py");
    }
    const scriptText = await response.text();
    await pyodide.runPythonAsync(scriptText);
  }
  await loadPyodideAndPythonScripts();

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
