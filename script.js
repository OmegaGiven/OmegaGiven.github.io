document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOMContentLoaded event fired"); // Debugging log

  // 1. Create Navigation Tab
  let nav = document.createElement("nav");
  nav.className = "tab-nav";
  console.log("Navigation element created");

  let navList = document.createElement("ul");
  nav.appendChild(navList);
  document.body.insertBefore(nav, document.body.firstChild);
  console.log("Navigation element appended to the body");

  // Add "Calculators" Tab
  const calculatorsTab = { id: "calculators-tab", name: "Calculators" };
  let calculatorsNavItem = document.createElement("li");
  let calculatorsNavLink = document.createElement("a");
  calculatorsNavLink.href = `#${calculatorsTab.id}`;
  calculatorsNavLink.innerText = calculatorsTab.name;
  calculatorsNavItem.appendChild(calculatorsNavLink);
  navList.appendChild(calculatorsNavItem);
  console.log("Calculators tab added to the navigation");

  // Add "3D Printing Tools" Tab
  const printingToolsTab = { id: "printing-tools-tab", name: "3D Printing Tools" };
  let printingToolsNavItem = document.createElement("li");
  let printingToolsNavLink = document.createElement("a");
  printingToolsNavLink.href = `#${printingToolsTab.id}`;
  printingToolsNavLink.innerText = printingToolsTab.name;
  printingToolsNavItem.appendChild(printingToolsNavLink);
  navList.appendChild(printingToolsNavItem);

  // Create container for calculators
  let calculatorsBox = document.createElement("div");
  calculatorsBox.className = "calc-container";
  calculatorsBox.id = parentTab.id;
  document.body.appendChild(calculatorsBox);
  console.log("Calculators container created and appended");

  // Create Containers for 3d printing tools
  let printingToolsBox = document.createElement("div");
  printingToolsBox.className = "tab-content";
  printingToolsBox.id = printingToolsTab.id;
  document.body.appendChild(printingToolsBox);
  console.log("3d printing containers created and appended");

  // Initially hide all tabs except Calculators
  calculatorsBox.style.display = "block";
  printingToolsBox.style.display = "none";
  
  // Tab Switching Logic
  calculatorsNavLink.addEventListener("click", function (event) {
    event.preventDefault();
    calculatorsBox.style.display = "block";
    printingToolsBox.style.display = "none";
  });

  printingToolsNavLink.addEventListener("click", function (event) {
    event.preventDefault();
    calculatorsBox.style.display = "none";
    printingToolsBox.style.display = "block";

    // Dynamically Load 3D Printing Tools Script
    if (!printingToolsBox.loaded) {
      const script = document.createElement("script");
      script.src = "3d-printing-tools.js";
      script.onload = function () {
        console.log("3d-printing-tools.js loaded successfully");
        printingToolsBox.loaded = true; // Prevent reloading the script
      };
      script.onerror = function () {
        console.error("Failed to load 3d-printing-tools.js");
      };
      document.head.appendChild(script);
    }
  });


  // Dynamically load and execute calculators.js
  const script = document.createElement("script");
  script.src = "calculators.js";
  script.onload = function () {
    console.log("calculators.js loaded successfully");
  };
  script.onerror = function () {
    console.error("Failed to load calculators.js");
  };
  document.head.appendChild(script);
  console.log("calculators.js script tag appended to the head");

  // Load Pyodide and External Python Scripts
  async function loadPyodideAndPythonScripts() {
    try {
      console.log("Loading Pyodide and Python scripts");
      window.pyodide = await loadPyodide();

      const pythonScripts = ["sell_price_calculator.py", "fence_cost_calculator.py", "investment_calculator.py"];
      for (const script of pythonScripts) {
        const response = await fetch(script);
        if (!response.ok) {
          throw new Error(`Failed to load ${script}`);
        }
        const scriptText = await response.text();
        await pyodide.runPythonAsync(scriptText);
        console.log(`Successfully loaded and executed ${script}`);
      }
    } catch (error) {
      console.error("Error loading Pyodide or Python scripts:", error);
    }
  }

  
  // Wrap the call in an async function
  async function initializePyodide() {
    await loadPyodideAndPythonScripts();
  }

  // Call the async function
  initializePyodide();

  
  // 3. Create Footer / Contact Info Section
  let footer = document.createElement("footer");
  let contactDiv = document.createElement("div");
  contactDiv.className = "contact-info";

  let contactP = document.createElement("p");
  contactP.innerHTML =
    'Contact me at: <a href="mailto:omegagiven9@gmail.com">omegagiven9@gmail.com</a>';
  contactDiv.appendChild(contactP);

  // Add a link to the Github
  let gitlinkP = document.createElement("p");
  gitlinkP.innerHTML =
    'See other projects on Github: <a href="https://github.com/OmegaGiven">GitHub</a>';
  contactDiv.appendChild(gitlinkP);

  // Add a link to the Etsy Store
  let etsyLinkP = document.createElement("p");
  etsyLinkP.innerHTML =
    'Check out my Etsy store: <a href="https://www.etsy.com/shop/OmegaSolutions" target="_blank">My Etsy Store</a>';
  contactDiv.appendChild(etsyLinkP);

  footer.appendChild(contactDiv);
  document.body.appendChild(footer);
  console.log("Footer created and appended");
});
