
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../src/App.vue'

describe('App.vue', () => {


  it('renderiza el título correctamente', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Lista de Usuarios')
  })

 
  it('agrega un usuario al formulario', async () => {
    const wrapper = mount(App)


    const inputNombre = wrapper.find('[data-test="input-nombre"]')
    const inputEmail = wrapper.find('[data-test="input-email"]')


    await inputNombre.setValue('Juan')
    await inputEmail.setValue('juan@mail.com')


    await wrapper.find('form').trigger('submit.prevent')


    await nextTick()


    expect(wrapper.text()).toContain('Juan')
    expect(wrapper.text()).toContain('juan@mail.com')
  })
})


