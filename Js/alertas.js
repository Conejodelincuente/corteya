document.addEventListener('DOMContentLoaded', () => {
    const btnConfirmar = document.getElementById('btn-confirmar');

    btnConfirmar.addEventListener('click', async () => {
    if (!carrito?.servicio || !carrito?.peluquero || !carrito?.fecha || !carrito?.hora) {
        swal("Falta completar datos", "Elegí servicio, peluquero, fecha y horario.", "warning");
        return;
        }

    const ok = await swal({
        title: `¿Confirmar turno?`,
        text: `${carrito.servicio.nombre} con ${carrito.peluquero.nombre}

            ${carrito.fecha} a las ${carrito.hora}`,
        icon: "info",
        buttons: ["Cancelar", "Confirmar"],
        dangerMode: false
    });

    if (ok) {
        swal("Turno confirmado", "¡Listo! Te esperamos en CorteYa.", "success");

        }
    });
});