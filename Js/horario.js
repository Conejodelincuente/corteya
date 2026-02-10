//variables globales

let fechaSeleccionado = null;
let horarioSeleccionado = null;

//Horarios

const horariosDisponibles = [
    "09:00","09:30", "10:00","10:30", "11:00","11:30", "12:00","12:30",
    "16:00", "16:30", "17:00","17:30", "18:00","18:30", "19:00","19:30"
];

//-------------------------------------------------
//funcion de la generación de Día

function generarDias(){
    const contenedorFechas = document.getElementById('selector-fecha');
    contenedorFechas.innerHTML = '';

    const hoy = new Date();  // funcion nativa de JS

    // Sumamos i días a la fecha actual
    for (let i = 0; i < 7; i++) {
        const dia = new Date();
        dia.setDate(hoy.getDate() + i);

    // Formateado de texto del día
        const nombreCompleto = dia.toLocaleDateString('es-ES', { weekday: 'long' });
        const diaParaJSON = nombreCompleto.charAt(0).toUpperCase() + nombreCompleto.slice(1);

        const diaNumero = dia.getDate();


        const btnDia = document.createElement('div');
        btnDia.className = 'dia-calendario';
        btnDia.innerHTML = `
            <span>${diaParaJSON}</span>
            <strong>${diaNumero}</strong>
            `;

        btnDia.addEventListener('click', ()=>{
            seleccionarFecha(dia, diaParaJSON, btnDia)  // pasamos el dia y el texto
        });

        contenedorFechas.appendChild(btnDia);
    }
}
// Función de la selección de Día

    function seleccionarFecha(objetoFecha, diaString, botonFecha){
        document.querySelectorAll('.dia-calendario').forEach(btn => {
            btn.classList.remove('selected');
        });
        botonFecha.classList.add('selected');
        carrito.fecha = objetoFecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
        actualizarResumen();

        // Filtrar peluqueros por servicio
    if (carrito.peluquero) {
        if (carrito.peluquero.diasLaborales.includes(diaString)) {
            mostrarHorarios();
        } else {
            document.getElementById('grid-horarios').innerHTML =
                `<p style="color: #999;">Este peluquero no trabaja los ${diaString}</p>`;
        }
    } else {
        mostrarHorarios();
    }
  }

    //-------------------------------------------------
    //funcion de la seleccion de Hora

    function mostrarHorarios() {
    const contenedorHorarios = document.getElementById('grid-horarios');
    contenedorHorarios.innerHTML = '';

    // creacion del botón

    horariosDisponibles.forEach(hora => {
        const btnHora = document.createElement('div');
        btnHora.className = 'horario-item';
        btnHora.textContent = hora;

        btnHora.addEventListener('click', () => seleccionarHorario(hora, btnHora));
        contenedorHorarios.appendChild(btnHora);
    });
}

function seleccionarHorario(hora, botonHora) {
    document.querySelectorAll('.horario-item').forEach(btn => {
        btn.classList.remove('selected');
    });

    botonHora.classList.add('selected');
    carrito.hora = hora;
    actualizarResumen();
}