async function loadPyodide() {
    window.pyodide = await loadPyodide();
}
loadPyodide(); // Initialize Pyodide

async function runPython() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;

    let pythonCode = `
def add_numbers(a, b):
    return a + b

result = add_numbers(${num1}, ${num2})
`;

    let output = await pyodide.runPythonAsync(pythonCode);
    document.getElementById("result").innerText = output;
}
