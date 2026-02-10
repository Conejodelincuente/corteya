// carga de funciones principales


document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    cargarPeluqueros();
    generarDias();
    mostrarHorarios()
    cargarProductos()


    const btnLimpiar = document.getElementById('btn-limpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarCarrito);
    }
});
