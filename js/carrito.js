let carrito = {
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

    if (carrito.servicio) {
        contenidoHtml += `
            <div style="text-align: left; color: var(--color-text);">
                <p><strong>Servicio:</strong> ${carrito.servicio.nombre}</p>
                <p><strong>Precio:</strong> $${carrito.servicio.precio}</p>
                <p><strong>Duración:</strong> ${carrito.servicio.duracion}</p>
            </div>
        `;
    if (carrito.peluquero){
        contenidoHtml += `
            <p><strong>Peluquero:</strong> ${carrito.peluquero.nombre}</p>
            `;
    }
    if (carrito.fecha){
        contenidoHtml += `
            <p><strong>Fecha:</strong> ${carrito.fecha}</p>
            `;
    }
    if (carrito.hora){
        contenidoHtml += `
            <p><strong>Hora:</strong> ${carrito.hora}</p>
            `;
    }
    if (carrito.productos.length > 0) {
            contenidoHtml += `<p><strong>Productos:</strong></p><ul>`;
            carrito.productos.forEach(prod => {
            contenidoHtml += `<li class="producto-item">${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad} <button class="btn-remover-producto" data-id="${prod.id}"> x </button></li>`;
            });
            contenidoHtml += `</ul>`;
        }

    contenidoHtml += `</div>`;
    resumen.innerHTML = contenidoHtml;


    //logica del botón

    if (carrito.servicio && carrito.peluquero && carrito.fecha && carrito.hora) {
            boton.disabled = false;
            boton.textContent = 'Confirmar Reserva';
            boton.style.backgroundColor = 'var(--color-primary)';
            boton.style.color = 'white';
        } else {
            boton.textContent = 'Completa todos los datos';
            }
    } else {
        resumen.innerHTML = '<p style="color: var(--color-disable);">Selecciona un servicio para comenzar</p>';
        boton.disabled = true;
        boton.textContent = 'Completa todos los datos';
    }
}

function agregarProductoAlCarrito(producto) {
    const existe = carrito.productos.find(p => p.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.productos.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarResumen();

}



function limpiarCarrito(sinAlerta = false) {
    carrito = {
        servicio: null,
        peluquero: null,
        fecha: null,
        hora: null,
        productos: []
    };
    // limpiar clases visuales seleccionadas

    const seleccionados = document.querySelectorAll('.selected');
    seleccionados.forEach(el => el.classList.remove('selected'));

    actualizarResumen();

    if(!sinAlerta){
        swal("Carrito limpio!", "... elige tu servicio y tu peluquero.");
    }
}

//elimninar producto del carrito

document.addEventListener('DOMContentLoaded', () => {
    const resumen = document.getElementById('detalle-resumen');

    resumen.addEventListener('click', (eliminarprod) => {
        if (eliminarprod.target.classList.contains('btn-remover-producto')) {
            const id = Number(eliminarprod.target.dataset.id);
            eliminarProducto(id);
        }
    });
});


function eliminarProducto(id) {
    carrito.productos = carrito.productos.filter(prod => prod.id !== id);
    actualizarResumen();
}

