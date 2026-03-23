// ================= UTILITY FUNCTIONS =================
function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem("token");
}

function getAuthHeader() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

function isTokenExpired() {
  return !getToken();
}

function checkAuth() {
  if (isTokenExpired()) {
    window.location.href = "login.html";
  }
}

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

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message || "Registration failed");
      }

      alert("✅ Registered successfully! Redirecting to login...");
      registerForm.reset();
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } catch (error) {
      alert("❌ Registration error: " + error.message);
    }
  });
}

// ================= LOGIN USER =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (res.status === 200) {
        setToken(result.token);
        alert(`✅ Welcome ${username}!`);
        window.location.href = "dashboard.html";
      } else {
        alert("❌ " + (result.message || "Login failed"));
      }
    } catch (error) {
      alert("❌ Login error: " + error.message);
    }
  });
}

// ================= LOAD DASHBOARD DATA =================
async function loadDashboard() {
  checkAuth();

  try {
    // Fetch current user info from token
    const token = getToken();
    const decoded = jwt_decode(token); // Note: need to add jwt-decode library

    // Fetch all users if admin
    if (decoded.role === "admin") {
      loadAllUsers();
      document.getElementById("adminSection").style.display = "block";
    } else {
      document.getElementById("adminSection").style.display = "none";
    }

    // Display user info
    document.getElementById("userInfo").innerHTML = `
      <strong>Username:</strong> ${decoded.id} (${decoded.role})<br>
      <strong>Role:</strong> ${decoded.role}
    `;
  } catch (error) {
    console.error("Error loading dashboard:", error);
    alert("Failed to load dashboard");
  }
}

// ================= LOAD ALL USERS (ADMIN ONLY) =================
async function loadAllUsers() {
  try {
    const res = await fetch("/api/users/", {
      method: "GET",
      headers: getAuthHeader(),
    });

    const users = await res.json();

    if (!Array.isArray(users)) {
      console.error("Users data is not an array:", users);
      return;
    }

    let html = "<table border='1' style='width:100%; margin-top:10px;'>";
    html +=
      "<tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Action</th></tr>";

    users.forEach((user) => {
      html += `<tr>
        <td>${user._id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button onclick="deleteUserById('${user._id}', '${user.username}')">Delete</button></td>
      </tr>`;
    });

    html += "</table>";
    document.getElementById("usersList").innerHTML = html;
  } catch (error) {
    console.error("Error loading users:", error);
    alert("❌ Failed to load users: " + error.message);
  }
}

// ================= UPDATE USER =================
async function updateUser() {
  try {
    const username = document.getElementById("newUsername")?.value;
    const password = document.getElementById("newPassword")?.value;

    if (!username && !password) {
      alert("❌ Enter at least one field to update");
      return;
    }

    const id = prompt("Enter user ID to update:");
    if (!id) return;

    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(updateData),
    });

    const result = await res.json();

    if (!res.ok) {
      alert("❌ " + (result.message || "Update failed"));
      return;
    }

    alert("✅ User updated successfully");
    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
  } catch (error) {
    alert("❌ Update error: " + error.message);
  }
}

// ================= DELETE USER =================
async function deleteUserById(userId, username) {
  if (!confirm(`Are you sure you want to delete ${username}?`)) {
    return;
  }

  try {
    const res = await fetch(`/api/users/delete-user/${userId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    const result = await res.json();

    if (!res.ok) {
      alert("❌ " + (result.message || "Delete failed"));
      return;
    }

    alert("✅ User deleted successfully");
    loadAllUsers(); // Reload user list
  } catch (error) {
    alert("❌ Delete error: " + error.message);
  }
}

// ================= DELETE OWN ACCOUNT =================
async function deleteOwnAccount() {
  if (
    !confirm(
      "⚠️ Are you sure you want to delete your account? This is irreversible.",
    )
  ) {
    return;
  }

  try {
    const token = getToken();
    const decoded = jwt_decode(token);
    const userId = decoded.id;

    const res = await fetch(`/api/users/delete-user/${userId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    const result = await res.json();

    if (!res.ok) {
      alert("❌ " + (result.message || "Delete failed"));
      return;
    }

    alert("✅ Account deleted");
    logout();
  } catch (error) {
    alert("❌ Delete error: " + error.message);
  }
}

// ================= LOGOUT =================
function logout() {
  removeToken();
  alert("✅ Logged out");
  window.location.href = "login.html";
}
