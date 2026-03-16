//Register User

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    alert('New User registered successfully');
    registerForm.reset();
    window.location.href = 'login.html';
  });
}

//Login User
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
      if (res.status === 200) {
      alert("Login successful")
      window.location.href = "dashboard.html"
    } else {
      alert(data.message)
    }
  })
}

//Update User
async function updateUser() {
  const username = document.getElementById('updateUsername').value;
  const password = document.getElementById('updatePassword').value;
  
  const id = prompt("Enter user ID to update:");
  
await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  alert('User updated successfully');
}

//Delete User
async function deleteUser() {
  const id = prompt("Enter user ID to delete:");
  await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  alert('User deleted successfully');
  window.location.href = 'dashboard.html';
}