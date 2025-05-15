console.log("3d-printing-tools.js is executing");

let printingToolsBox = document.getElementById("printing-tools-tab");

if (!printingToolsBox) {
  console.error("printing-tools-tab element not found");
} else {
  console.log("Found printing-tools-tab element");

  // Add Title
  let title = document.createElement("h1");
  title.innerText = "3D Printing Tools - Filament Stats";
  printingToolsBox.appendChild(title);

  // Add Description
  let desc = document.createElement("p");
  desc.innerText =
    "Below is a table of commonly used filament types and their properties.";
  printingToolsBox.appendChild(desc);

  // Create Table
  let table = document.createElement("table");
  table.className = "filament-stats-table";

  // Table Header
  let thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Filament Type</th>
      <th>Density (g/cm³)</th>
      <th>Print Temp (°C)</th>
      <th>Bed Temp (°C)</th>
    </tr>
  `;
  table.appendChild(thead);

  // Table Body
  let tbody = document.createElement("tbody");
  const filamentData = [
    { type: "PLA", density: "1.25", printTemp: "190-220", bedTemp: "No/Optional" },
    { type: "ABS", density: "1.04", printTemp: "220-250", bedTemp: "80-110" },
    { type: "PETG", density: "1.27", printTemp: "230-250", bedTemp: "70-90" },
    { type: "TPU", density: "1.20", printTemp: "220-240", bedTemp: "50-60" },
  ];

  filamentData.forEach(filament => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${filament.type}</td>
      <td>${filament.density}</td>
      <td>${filament.printTemp}</td>
      <td>${filament.bedTemp}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  printingToolsBox.appendChild(table);
}
