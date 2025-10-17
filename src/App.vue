<template>
  <div id="app" class="container">
    <h1>Lista de Usuarios</h1>

    <!-- Formulario -->
    <form class="formulario" @submit.prevent="agregarUsuario">
      <input v-model="nombre" placeholder="Nombre completo" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <button type="submit">Agregar usuario</button>
    </form>

    <!-- Lista de usuarios -->
    <ul class="lista-usuarios">
      <li v-for="usuario in usuarios" :key="usuario.id">
        <span>{{ usuario.nombre }}</span>
        <span class="email">{{ usuario.email }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Datos reactivos
const usuarios = ref([])
const nombre = ref('')
const email = ref('')

// URL de tu backend en Render
const apiUrl = 'https://backend-bff-1.onrender.com'

// Cargar usuarios al iniciar
const cargarUsuarios = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/usuarios`)
    usuarios.value = await res.json()
  } catch (err) {
    console.error('Error cargando usuarios:', err)
  }
}

onMounted(cargarUsuarios)

// Agregar usuario
const agregarUsuario = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.value, email: email.value })
    })
    const nuevo = await res.json()
    usuarios.value.push(nuevo)
    nombre.value = ''
    email.value = ''
  } catch (err) {
    console.error('Error agregando usuario:', err)
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  padding: 2rem;
  background: #f7f9fc;
  min-height: 100vh;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.formulario {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
}

input:focus {
  border-color: #3498db;
}

button {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #2980b9;
}

.lista-usuarios {
  list-style: none;
  padding: 0;
}

.lista-usuarios li {
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  margin: 0.5rem auto;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.email {
  color: #555;
  font-size: 0.9rem;
}
</style>