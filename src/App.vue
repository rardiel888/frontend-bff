<template>
  <div class="container">
    <h1>Lista de Usuarios</h1>

    <!-- Formulario -->
    <form class="formulario" @submit.prevent="agregarUsuario">
      <input v-model="nombre" placeholder="Nombre" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <button type="submit">Agregar</button>
    </form>

    <!-- Lista de usuarios -->
    <ul class="usuarios-lista">
      <li v-for="usuario in usuarios" :key="usuario.id">
        <span class="nombre">{{ usuario.nombre }}</span>
        <span class="email">{{ usuario.email }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Lista de usuarios
const usuarios = ref([])

// Campos del formulario
const nombre = ref('')
const email = ref('')

// URL del backend en Render
const apiUrl = 'https://backend-bff-1.onrender.com'

// Función para cargar los usuarios
const cargarUsuarios = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/usuarios`)
    const data = await res.json()
    usuarios.value = data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Llamar a la función al iniciar la página
onMounted(cargarUsuarios)

// Función para agregar usuario
const agregarUsuario = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.value, email: email.value })
    })
    const nuevoUsuario = await res.json()
    usuarios.value.push(nuevoUsuario) // Agregar a la lista en frontend
    nombre.value = '' // Limpiar campos
    email.value = ''
  } catch (error) {
    console.error('Error al agregar usuario:', error)
  }
}
</script>

<style>
/* Contenedor general centrado */
.container {
  max-width: 500px;
  margin: 50px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 20px;
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Título */
h1 {
  color: #333;
  margin-bottom: 25px;
}

/* Formulario */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.formulario input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.formulario input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74,144,226,0.5);
}

.formulario button {
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.formulario button:hover {
  background-color: #357ab8;
}

/* Lista de usuarios */
.usuarios-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usuarios-lista li {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.nombre {
  font-weight: 600;
}

.email {
  color: #666;
  font-size: 14px;
}
</style>

