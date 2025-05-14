document.addEventListener("DOMContentLoaded", async function () {
  // 1. Create Navigation Tab
  let nav = document.createElement("nav");
  nav.className = "tab-nav";
  
  let navList = document.createElement("ul");
  let navItem = document.createElement("li");
  let navLink = document.createElement("a");
  navLink.href = "#app";
  navLink.innerText = "Home Selling Price Calculator";
  
  navItem.appendChild(navLink);
  navList.appendChild(navItem);
  nav.appendChild(navList);
  
  // Insert the navigation at the top of the body
  document.body.insertBefore(nav, document.body.firstChild);

  // 2. Create the Calculator Section Container (with id "app")
  let appContainer = document.createElement("div");
  appContainer.id = "app";
  document.body.appendChild(appContainer);

  // Create title and description for the calculator section
  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  appContainer.appendChild(title);

  let description = document.createElement("p");
  description.innerText = "Enter values below to estimate the selling price.";
  appContainer.appendChild(description);

  // 3. Create the Form Container for Inputs & Button
  let formContainer = document.createElement("div");
  formContainer.id = "form-container";
  appContainer.appendChild(formContainer);

  // Resize for mobile dynamically
  function adjustLayout() {
    if (window.innerWidth < 600) {
      formContainer.style.flexDirection = "column";
      document.body.style.padding = "20px";
    } else {
      formContainer.style.flexDirection = "row";
    }
  }
  window.addEventListener("resize", adjustLayout);
  adjustLayout();

  // Field configurations for the calculator
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

  // Create a vertical container for each field (label and input)
  fields.forEach((field) => {
    let fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";

    let label = document.createElement("label");
    label.innerText = field.label;

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.id = field.id;
    input.setAttribute("placeholder", field.placeholder);

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
  });

  // Create a bubble container for the Calculate button
  let buttonBubble = document.createElement("div");
  buttonBubble.className = "bubble";
  
  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", runPython);
  buttonBubble.appendChild(button);
  formContainer.appendChild(buttonBubble);

  // Create a result container (in its own styled box)
  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  resultBox.innerHTML =
    "<h2>Estimated Selling Price</h2><p>Result: <span id='result'></span></p>";
  appContainer.appendChild(resultBox);

  // 4. Create Footer / Contact Information Section
  let footer = document.createElement("footer");

  let contactDiv = document.createElement("div");
  contactDiv.className = "contact-info";

  // Contact info
  let contactText = document.createElement("p");
  contactText.innerHTML =
    'Contact me at: <a href="mailto:your.email@example.com">your.email@example.com</a>';
  contactDiv.appendChild(contactText);

  // Social media links
  let socialText = document.createElement("p");
  socialText.innerText = "Follow me on social media:";
  contactDiv.appendChild(socialText);

  let socialList = document.createElement("ul");

  let twitterItem = document.createElement("li");
  let twitterLink = document.createElement("a");
  twitterLink.href = "https://twitter.com/yourhandle";
  twitterLink.target = "_blank";
  twitterLink.innerText = "Twitter";
  twitterItem.appendChild(twitterLink);
  socialList.appendChild(twitterItem);
  
  let linkedInItem = document.createElement("li");
  let linkedInLink = document.createElement("a");
  linkedInLink.href = "https://www.linkedin.com/in/yourprofile";
  linkedInLink.target = "_blank";
  linkedInLink.innerText = "LinkedIn";
  linkedInItem.appendChild(linkedInLink);
  socialList.appendChild(linkedInItem);
  
  contactDiv.appendChild(socialList);
  footer.appendChild(contactDiv);

  // Append footer at the end of the body
  document.body.appendChild(footer);

  // 5. Load Pyodide and External Python Code
  async function loadPyodideAndPythonScripts() {
    window.pyodide = await loadPyodide();
    const response = await fetch("sell_price_calculator.py");
    if (!response.ok) {
      throw new Error("Failed to load sell_price_calculator.py");
    }
    const sellPriceScript = await response.text();
    await pyodide.runPythonAsync(sellPriceScript);
  }
  await loadPyodideAndPythonScripts();

  // 6. Run the Python Calculation (using values from the inputs)
  async function runPython() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);
    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("result").innerText = result;
  }
});
