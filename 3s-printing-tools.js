// This script runs when the 3D Printing Tools tab is activated

console.log("3d-printing-tools.js is executing");

// Find the container for 3D Printing Tools
const container = document.getElementById('printingToolsBox');

// Create the iframe
const sheetFrame = document.createElement('iframe');
sheetFrame.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HHuvSGzxTRE9XEH3EJHhZbhOmYH-sWOb8JK6snC4gmwthOix1ZBuuxFqVG8IbS4OOVU4AcKrSCcj/pubhtml?widget=true&amp;headers=false'; // Replace with your published Google Sheet link
sheetFrame.width = '100%';
sheetFrame.height = '400';
sheetFrame.style.border = '1px solid #ccc';

// Add a title or heading if desired
const heading = document.createElement('h2');
heading.textContent = 'Helpful 3D Printing Info';

// Append them to the container
container.appendChild(heading);
container.appendChild(sheetFrame);
