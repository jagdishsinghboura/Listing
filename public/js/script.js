(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
           console.log("oiudoygbsnsyg9i8ulih");

            form.classList.add('was-validated')
        }, false)
    })
})()