console.log("3D Printing Tools script loaded!");

// Make sure the container exists
const container = document.getElementById('printing-tools-tab');
if (container && !container.querySelector('iframe')) {
  // Optionally clear old content:
  // container.innerHTML = "";

  // Create a heading (optional)
  const heading = document.createElement('h2');
  heading.textContent = 'Helpful 3D Printing Info';

  // Create the iframe
  const sheetFrame = document.createElement('iframe');
  sheetFrame.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HHuvSGzxTRE9XEH3EJHhZbhOmYH-sWOb8JK6snC4gmwthOix1ZBuuxFqVG8IbS4OOVU4AcKrSCcj/pubhtml?widget=true&amp;headers=false';
  sheetFrame.width = '100%';
  sheetFrame.height = '400';
  sheetFrame.style.border = '1px solid #ccc';

  // Append
  container.appendChild(heading);
  container.appendChild(sheetFrame);

  console.log("Google Sheet iframe added to printing-tools-tab!");
} else {
  console.log("Container not found or iframe already present.");
}
