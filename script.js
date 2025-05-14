document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");

    // Create input fields dynamically
    let num1 = document.createElement("input");
    num1.setAttribute("type", "number");
    num1.setAttribute("id", "num1");
    num1.setAttribute("placeholder", "Enter first number");

    let num2 = document.createElement("input");
    num2.setAttribute("type", "number");
    num2.setAttribute("id", "num2");
    num2.setAttribute("placeholder", "Enter second number");

    let button = document.createElement("button");
    button.innerText = "Calculate";
    button.addEventListener("click", runPython);

    let result = document.createElement("p");
    result.innerHTML = "Result: <span id='result'></span>";

    // Append elements to the page
    app.appendChild(num1);
    app.appendChild(num2);
    app.appendChild(button);
    app.appendChild(result);

    async function loadPyodide() {
        window.pyodide = await loadPyodide();
    }
    loadPyodide(); // Initialize Pyodide
    
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
