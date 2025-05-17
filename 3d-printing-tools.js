// This script runs when the 3D Printing Tools tab is activated
console.log("3d-printing-tools.js is executing");

// Ensure the container exists
const container = document.getElementById('printingToolsBox');
if (container && !container.querySelector('iframe')) {
  // Optional: clear old content if you want only the iframe
  // container.innerHTML = ""; // Uncomment if you want to clear

  // Create the heading
  const heading = document.createElement('h2');
  heading.textContent = 'Helpful 3D Printing Info';

  // Create the iframe
  const sheetFrame = document.createElement('iframe');
  sheetFrame.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HHuvSGzxTRE9XEH3EJHhZbhOmYH-sWOb8JK6snC4gmwthOix1ZBuuxFqVG8IbS4OOVU4AcKrSCcj/pubhtml?widget=true&amp;headers=false'; // Replace with your published Google Sheet link
  sheetFrame.width = '100%';
  sheetFrame.height = '400';
  sheetFrame.style.border = '1px solid #ccc';

  // Append to container
  container.appendChild(heading);
  container.appendChild(sheetFrame);
}
