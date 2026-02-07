let carritoTurnos = {
    servicio: null,
    peluquero: null,
    fecha: null,
    hora: null,
    productos: []
};



function actualizarResumen() {
    const resumen = document.getElementById('detalle-resumen');
    const boton = document.getElementById('btn-confirmar');

    //logica del texto
    let contenidoHtml = '';

    if (carritoTurnos.servicio) {
        contenidoHtml += `
            <div style="text-align: left; color: var(--color-text);">
                <p><strong>Servicio:</strong> ${carritoTurnos.servicio.nombre}</p>
                <p><strong>Precio:</strong> $${carritoTurnos.servicio.precio}</p>
                <p><strong>Duración:</strong> ${carritoTurnos.servicio.duracion}</p>
            </div>
        `;
    if (carritoTurnos.peluquero){
        contenidoHtml += `
        <p><strong>Peluquero:</strong> ${carritoTurnos.peluquero.nombre}</p>
        `;
    }
    contenidoHtml += `</div>`;
    resumen.innerHTML = contenidoHtml;

    //logica del botón
    if (carritoTurnos.servicio && carritoTurnos.peluquero && carritoTurnos.fecha && carritoTurnos.hora) { // añadir fecha y hora
            boton.disabled = false;
            boton.textContent = 'Confirmar Reserva';
            boton.style.backgroundColor = 'var(--color-primary)';
            boton.style.color = 'white';
        } else {
            boton.textContent = 'Completa todos los datos';
            }
    } else {
        resumen.innerHTML = '<p style="color: var(--color-disable);">Selecciona un servicio para comenzar</p>';
    }
}