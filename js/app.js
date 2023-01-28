(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', verificaForm)

    function verificaForm(e){
        e.preventDefault();
        const inputs = document.querySelectorAll('.input');
        const inputsRadio = document.querySelector('input[name="tipo"]:checked');
        let pass = true;
        
        inputs.forEach(e => {
            const input = e.id.split('').map((a,i) => i === 0 ? a.toUpperCase() : a).join('');
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
            const regexTel =  /^\d{11}$/; 

            limpiarHTML(e.parentElement.parentElement);
            if(e.value.trim() === ''){
                mostrarAlerta(`${input} no puede estar vacio`, 'error', e.parentElement.parentElement)
                pass = false;
            }else if(e.id === 'email' && !regex.test(e.value)){
                mostrarAlerta(`Ingrese un email valido`, 'error', e.parentElement.parentElement)
                pass = false;
            }else if(e.id === 'telefono' && regexTel.test(e.value)){
                mostrarAlerta(`Ingrese un telefono valido`, 'error', e.parentElement.parentElement)
                pass = false;
            }
        })
        
        if(!inputsRadio){
            const radio = document.querySelector('input[name="tipo"]');
            limpiarHTML(radio.parentElement.parentElement);
            mostrarAlerta(`Seleccione un rol`, 'error', radio.parentElement.parentElement)
            pass = false;
        }

        if(pass){
            const submit = formulario.querySelector('#submit');
            submit.value = 'Enviando...'
            setTimeout(() => {
                submit.value = 'Enviar Formulario'
                mostrarAlerta(`El mensaje se envio con exito`, '', formulario);
            }, 3000);
        }
    }

    function mostrarAlerta(mensaje, tipo, selector){
        const parrafoMensaje = document.createElement('P');
        parrafoMensaje.classList.add('mensaje');
        parrafoMensaje.textContent = mensaje;
        parrafoMensaje.style.fontWeight = 'bold';
        parrafoMensaje.style.textAlign = 'center';
        if(tipo === 'error'){
            parrafoMensaje.style.color = 'Red';
        }else{
            parrafoMensaje.style.color = 'Green';
        }

        selector.appendChild(parrafoMensaje);
        setTimeout(() => {
            parrafoMensaje.remove();
        }, 3000);
    }

    function limpiarHTML(selector){
        const mensajeRepetido = selector.querySelector('.mensaje');
        if(mensajeRepetido){
            mensajeRepetido.remove();
        }
    }
})();