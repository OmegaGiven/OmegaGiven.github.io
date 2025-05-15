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

  // Add parent "Calculators" tab
  const parentTab = { id: "calculators-tab", name: "Calculators" };
  let parentNavItem = document.createElement("li");
  let parentNavLink = document.createElement("a");
  parentNavLink.href = `#${parentTab.id}`;
  parentNavLink.innerText = parentTab.name;
  parentNavItem.appendChild(parentNavLink);
  navList.appendChild(parentNavItem);
  console.log("Parent tab added to the navigation");

  // Create container for calculators
  let calculatorsBox = document.createElement("div");
  calculatorsBox.className = "calc-container";
  calculatorsBox.id = parentTab.id;
  document.body.appendChild(calculatorsBox);
  console.log("Calculators container created and appended");

  // Parent Tab Logic
  parentNavLink.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Parent tab clicked");

    // Hide all other main tabs
    document.querySelectorAll(".calc-box").forEach(tab => {
      tab.style.display = "none";
    });
    console.log("All other tabs hidden");

    // Show the calculators container
    calculatorsBox.style.display = "block";
    console.log("Calculators container displayed");
  });

  // Initially hide all calculators and parent tabs
  calculatorsBox.style.display = "none";
  console.log("Calculators container initially hidden");

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
  await loadPyodideAndPythonScripts();

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
    'Contact me at: <a href="https://github.com/OmegaGiven">GitHub</a>';
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
