//variables generales

let servicios = [];

async function cargarServicios() {
    try {
        const response = await fetch('./data/servicios.json');
        servicios = await response.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        document.getElementById('lista-servicios').innerHTML =
        '<p>Error al cargar los servicios. Por favor, recarga la página.</p>';
    }
}

// funcion de pintado de tarjetas
function mostrarServicios(arrayServicios) {
    const contenedor = document.getElementById('lista-servicios');
    contenedor.innerHTML = '';
    arrayServicios.forEach(servicio => {
        const card = document.createElement('div');
        // verificacion de seleccion
        const estaSeleccionado =carrito.servicio && carrito.servicio.id === servicio.id;
        card.className = `card-servicio ${estaSeleccionado ? 'selected' : ''}`; // si coincide el id se añade 'selected'

        card.dataset.id = servicio.id;
        card.innerHTML = `
            <div class="card-servicio-header">
                <h4 class="card-servicio-titulo">${servicio.nombre}</h4>
                <span class="card-servicio-precio">$${servicio.precio}</span>
            </div>
            <p class="card-servicio-descripcion">${servicio.descripcion}</p>
            <div class="card-servicio-duracion">
                <span>⏱️</span>
                <span>${servicio.duracion}</span>
            </div>
        `;

        // Evento de click para seleccionar
        card.addEventListener('click', () => seleccionarServicio(servicio, card));
        contenedor.appendChild(card);
    });
}

// Funciones de selección

function seleccionarServicio(servicio, cardElement) {
    document.querySelectorAll('.card-servicio').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    // actualizar el carrito
    carrito.servicio = servicio;
    actualizarResumen();

    // Filtrar peluqueros por servicio
    const peluquerosFiltrados = peluqueros.filter(p =>
        p.serviciosHabilitados.includes(servicio.id)
    );
    mostrarPeluqueros(peluquerosFiltrados);
}
