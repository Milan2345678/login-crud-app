// ================= REGISTER USER =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      username: document.getElementById("username")?.value,
      password: document.getElementById("password")?.value,
      email: document.getElementById("email")?.value,
      phone: document.getElementById("phone")?.value,
      address: document.getElementById("address")?.value,
      gender: document.getElementById("gender")?.value,
    };

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return alert(error.message || "Registration failed");
    }

    alert("New user registered successfully");
    registerForm.reset();
    window.location.href = "login.html";
  });
}

// ================= LOGIN USER =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (res.status === 200) {
      alert(`Welcome ${result.username}`);
      window.location.href = "dashboard.html";
    } else {
      alert(result.message || "Login failed");
    }
  });
}

// ================= UPDATE USER =================
async function updateUser() {
  const username = document.getElementById("updateUsername")?.value;
  const password = document.getElementById("updatePassword")?.value;

  const id = prompt("Enter user ID to update:");

  await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  alert("User updated successfully");
}

// ================= DELETE USER =================
async function deleteUser() {
  const id = prompt("Enter user ID to delete:");

  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  alert("User deleted successfully");
  window.location.href = "dashboard.html";
}
