document.addEventListener("DOMContentLoaded", async function () {
  const app = document.getElementById("app");

  // Create title and description
  let title = document.createElement("h1");
  title.innerText = "Home Selling Price Calculator";
  app.appendChild(title);

  let description = document.createElement("p");
  description.innerText = "Enter values below to estimate the selling price.";
  app.appendChild(description);

  // Create the form container for inputs and buttons
  let formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-container");
  app.appendChild(formContainer);

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

  // Field configurations
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

  // Create a vertical container for each field (label + input)
  fields.forEach((field) => {
    let fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";

    let label = document.createElement("label");
    label.innerText = field.label;

    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", field.id);
    input.setAttribute("placeholder", field.placeholder);

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
  });

  // Create a bubble container for the button
  let buttonBubble = document.createElement("div");
  buttonBubble.className = "bubble";

  let button = document.createElement("button");
  button.innerText = "Calculate";
  button.addEventListener("click", runPython);
  buttonBubble.appendChild(button);
  formContainer.appendChild(buttonBubble);

  // Create a result container with a box (result-box)
  let resultBox = document.createElement("div");
  resultBox.className = "result-box";
  resultBox.innerHTML =
    "<h2>Estimated Selling Price</h2><p>Result: <span id='result'></span></p>";
  app.appendChild(resultBox);

  // Load Pyodide and external Python file
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

  // Execute Python calculation with form values
  async function runPython() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let num3 = Number(document.getElementById("num3").value);
    const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
    const result = await pyodide.runPythonAsync(pythonCommand);
    document.getElementById("result").innerText = result;
  }
});
