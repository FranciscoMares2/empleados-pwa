let deferredPrompt;
const installBtn = document.getElementById("install-btn");

// Detect if PWA can be installed
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove("hidden");
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installed successfully");
    }
    deferredPrompt = null;
    installBtn.classList.add("hidden");
  }
});

// Add other app.js logic here...
const form = document.getElementById("employee-form");
const table = document.getElementById("employee-table");

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();

  if (name && role) {
    addEmployeeToTable(name, role);
    saveEmployee(name, role);
    form.reset();
    showNotification("Employee Added", `${name} was successfully added.`);
  }
});

// Add employee to the table
function addEmployeeToTable(name, role) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="py-2 px-4">${name}</td>
    <td class="py-2 px-4">${role}</td>
  `;
  table.appendChild(row);
}

// Save employee to localStorage
function saveEmployee(name, role) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push({ name, role });
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Load employees on page load
window.addEventListener("load", () => {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.forEach((employee) => addEmployeeToTable(employee.name, employee.role));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});

// Show notification
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}
