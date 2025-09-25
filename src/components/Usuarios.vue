<template>
  <div>
    <h1>Lista de Usuarios</h1>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nombre }} - {{ usuario.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UsuariosList',
  data() {
    return {
      usuarios: []
    }
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      this.usuarios = await response.json();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
}
</script>

