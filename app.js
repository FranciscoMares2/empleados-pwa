const form = document.getElementById("employee-form");
const table = document.getElementById("employee-table");
const clearBtn = document.getElementById("clear-btn");

// Cargar empleados almacenados al inicio
document.addEventListener("DOMContentLoaded", () => {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.forEach((employee) => addEmployeeToTable(employee));
});

// Manejar el formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const position = document.getElementById("position").value.trim();

  if (name && position) {
    const employee = { name, position };

    // Guardar en localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));

    // Agregar a la tabla
    addEmployeeToTable(employee);

    // Mostrar notificación
    showNotification("Employee Added", `${name} (${position}) was added successfully.`);

    // Limpiar el formulario
    form.reset();
  }
});

// Limpiar los registros
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all records?")) {
    localStorage.removeItem("employees");
    table.innerHTML = "";
    showNotification("Records Cleared", "All employee records have been deleted.");
  }
});

// Agregar empleado a la tabla
function addEmployeeToTable(employee) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="border px-4 py-2">${employee.name}</td>
    <td class="border px-4 py-2">${employee.position}</td>
  `;
  table.appendChild(row);
}

// Mostrar notificación
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}
