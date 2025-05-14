document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");

    // Create a title
    let title = document.createElement("h1");
    title.innerText = "Home Selling Price Calculator";
    app.appendChild(title);

    // Create a description
    let description = document.createElement("p");
    description.innerText = "Enter values below to estimate the selling price.";
    app.appendChild(description);

    // Create a container for form elements
    let formContainer = document.createElement("div");
    formContainer.setAttribute("id", "form-container");
    app.appendChild(formContainer);

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

    // Create and append button
    let button = document.createElement("button");
    button.innerText = "Calculate";
    button.addEventListener("click", runPython);
    formContainer.appendChild(button);

    // Create and append result display
    let resultContainer = document.createElement("div");
    resultContainer.innerHTML = "<h2>Estimated Selling Price</h2><p>Result: <span id='result'></span></p>";
    app.appendChild(resultContainer);

    // Load Pyodide for running Python
    async function loadPyodide() {
        window.pyodide = await loadPyodide();
    }
    loadPyodide();

    async function runPython() {
        let num1 = document.getElementById("num1").value;
        let num2 = document.getElementById("num2").value;
        let num3 = document.getElementById("num3").value;

        let pythonCode = `
def calculate_sell_price(debt, realestate_cost, desired_cashback):
    return (debt + desired_cashback) * (1 + (realestate_cost * 0.01))

result = calculate_sell_price(${num1}, ${num2}, ${num3})
`;

        let output = await pyodide.runPythonAsync(pythonCode);
        document.getElementById("result").innerText = output;
    }
});
