import Swal from 'sweetalert2'
import '@sweetalert2/theme-borderless/borderless.css';

const minix = function(data){
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: data.tiempo,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: data.icon,
        title: data.mensaje
    })
}


const atexto = function(data){
    Swal.fire(
        data.titulo,
        data.cuerpo,
        data.icono
      )
}


const texto = async function(data, callback){
    const { value: respuesta } = await Swal.fire({
        title: 'Ingresa nuevo valor',
        input: 'text',
        inputValue: data.valor,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor escribe algo!'
          }
        }
      })
      
      if (respuesta) {
        // Swal.fire(`Your IP address is ${respuesta}`)
        callback(respuesta)
      }
}


const pregunta = function(data, callback){
    
    Swal.fire({
        title: data.titulo,
        text: data.texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: data.afirmacion
      }).then((result) => {
        if (result.value) {
            callback(true);
        }
      })
}


export { 
    minix,
    atexto,
    pregunta,
    texto
 } 
