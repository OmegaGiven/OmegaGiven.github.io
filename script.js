document.addEventListener("DOMContentLoaded", async function() {
    const app = document.getElementById("app");

    let title = document.createElement("h1");
    title.innerText = "Home Selling Price Calculator";
    app.appendChild(title);

    let description = document.createElement("p");
    description.innerText = "Enter values below to estimate the selling price.";
    app.appendChild(description);

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
    adjustLayout();  // Run once on page load

    // Field configurations
    const fields = [
        { id: "num1", label: "Current Debt on House:", placeholder: "Enter debt amount" },
        { id: "num2", label: "Real Estate Cost (% without % sign):", placeholder: "Enter cost percentage" },
        { id: "num3", label: "Desired Cashback:", placeholder: "Enter cashback amount" }
    ];

    fields.forEach(field => {
        let label = document.createElement("label");
        label.innerText = field.label;

        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", field.id);
        input.setAttribute("placeholder", field.placeholder);

        formContainer.appendChild(label);
        formContainer.appendChild(input);
    });

    let button = document.createElement("button");
    button.innerText = "Calculate";
    button.addEventListener("click", runPython);
    formContainer.appendChild(button);

    let resultContainer = document.createElement("div");
    resultContainer.innerHTML = "<h2>Estimated Selling Price</h2><p>Result: <span id='result'></span></p>";
    app.appendChild(resultContainer);

    // Load Pyodide
    async function loadPyodideAndPythonScripts() {
        window.pyodide = await loadPyodide();

        // Load external Python file(s). 
        // If you have multiple Python files, you can fetch each one.
        const response = await fetch('sell_price_calculator.py');
        if (!response.ok) {
            throw new Error("Failed to load sell_price_calculator.py");
        }
        const sellPriceScript = await response.text();
        await pyodide.runPythonAsync(sellPriceScript);
    }
    await loadPyodideAndPythonScripts();

    // Run the Python function using values from your form
    async function runPython() {
        let num1 = document.getElementById("num1").value;
        let num2 = document.getElementById("num2").value;
        let num3 = document.getElementById("num3").value;

        // Ensure that values are properly converted to numbers if necessary:
        num1 = Number(num1);
        num2 = Number(num2);
        num3 = Number(num3);
        
        // Call the Python function defined in the external file
        const pythonCommand = `calculate_sell_price(${num1}, ${num2}, ${num3})`;
        const result = await pyodide.runPythonAsync(pythonCommand);
        document.getElementById("result").innerText = result;
    }
});
