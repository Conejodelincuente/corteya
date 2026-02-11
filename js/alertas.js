document.addEventListener('DOMContentLoaded', () => {
    const btnConfirmar = document.getElementById('btn-confirmar');

    btnConfirmar.addEventListener('click', async () => {
    if (!carrito?.servicio || !carrito?.peluquero || !carrito?.fecha || !carrito?.hora) {
        swal("Falta completar datos", "Elegí servicio, peluquero, fecha y horario.", "warning");
        return;
        }
//implementacion de sweetAlert
    const ok = await swal({
        title: `¿Confirmar turno?`,
        text: `${carrito.servicio.nombre} con ${carrito.peluquero.nombre}

            ${carrito.fecha} a las ${carrito.hora}`,
        icon: "info",
        buttons: ["Cancelar", "Confirmar"],
        dangerMode: false
    });

    if (ok) {
        guardarTurno();
        swal("Turno confirmado", "¡Listo! Te esperamos en CorteYa.", "success");
        limpiarCarrito(true);
        }
    });
});

//guardado de turnos en el localStorage

function guardarTurno(){
    const turnoGuardado ={
        id: Date.now(),
        servicio: carrito.servicio,
        peluquero: carrito.peluquero,
        fecha: carrito.fecha,
        hora: carrito.hora,
        productos: carrito.productos
    };
    const historial = JSON.parse(localStorage.getItem('turnos'))||[];
    historial.push(turnoGuardado);

    localStorage.setItem('turnos',JSON.stringify(historial));
}