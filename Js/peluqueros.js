// VAriables generales peluqueros

let peluqueros=[]

async function cargarPeluqueros() {
    try{
        const response = await fetch('./data/peluqueros.json');
        peluqueros = await response.json();
        mostrarPeluqueros(peluqueros);
    }
    catch(error){
        console.error(`Error al cargar el peluquero:`, error);
        document.getElementById('lista-peluqueros').innerHTML='<p> No se pudieron cargar los peluqueros';
    }
}
// funcion de pintado de tarjetas
function mostrarPeluqueros(arrayPeluqueros){
    const contenedor = document.getElementById('lista-peluqueros');
    contenedor.innerHTML = '';
    arrayPeluqueros.forEach(peluqueros =>{
    const card = document.createElement('div');
    // verificacion de seleccion
    const esSeleccionado = carrito.peluquero && carrito.peluquero.id === peluquero.id;
    card.className = `card-peluquero ${esSeleccionado ? 'selected' : ''}`;  // si coincide el id se añade 'selected'
    card.dataset.id = peluqueros.id;
    card.innerHTML = `
        <img class="card-peluquero-img" src="${peluqueros.foto}" alt="foto del peluquero">
            <h4>${peluqueros.nombre}</h4>
            <p>Especialista en ${peluqueros.especialidad}</p>
            <div class="card-peluquero-calificacion">
                <span>⭐</span>
                <span>${peluqueros.calificacion}</span>
            </div>
    `;
    card.addEventListener('click', ()=> seleccionarPeluquero(peluqueros, card));
    contenedor.appendChild(card);
    });
}

function seleccionarPeluquero(peluquero, cardElement){
    document.querySelectorAll('.card-peluquero').forEach(card =>{
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    carrito.peluquero = peluquero;
    actualizarResumen();

    // Filtrar servicios que hace el peluquero
    const serviciosFiltrados = servicios.filter(s =>
        peluquero.serviciosHabilitados.includes(s.id)
    );
    mostrarServicios(serviciosFiltrados);
}
