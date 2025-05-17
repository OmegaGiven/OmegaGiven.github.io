(function() {
  console.log("3D Printing Tools script loaded!");

  var container = document.getElementById('printing-tools-tab');
  if (container) {
    container.innerHTML = ""; // clear old content

    // Add header
    var heading = document.createElement('h2');
    heading.textContent = 'Helpful 3D Printing Info';
    container.appendChild(heading);

    // Embed Google Sheet
    var iframe = document.createElement('iframe');
    iframe.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5HHuvSGzxTRE9XEH3EJHhZbhOmYH-sWOb8JK6snC4gmwthOix1ZBuuxFqVG8IbS4OOVU4AcKrSCcj/pubhtml?widget=true&amp;headers=false';
    iframe.width = "100%";
    iframe.height = "400";
    iframe.style.border = "1px solid #ccc";
    container.appendChild(iframe);

    console.log("Iframe added!");
  } else {
    console.log("Could not find printing-tools-tab");
  }
})();
