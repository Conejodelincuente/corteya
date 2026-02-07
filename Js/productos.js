let productos = [];

async function cargarProductos() {
    try {
        const respuesta = await fetch('./data/productos.json');
        productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al querer cargar los productos', error);
        document.getElementById('lista-productos').innerHTML =
            '<p>Lamentablemente no se han podido cargar los productos. Por favor recargar la página.</p>';
    }
}

function mostrarProductos(arrayProductos) {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

    arrayProductos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card-producto';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
            <button onclick="agregarProductoAlCarrito(${producto.id})">Agregar</button>
        `;
        contenedor.appendChild(card);
    });
}

function agregarProductoAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (!carritoTurnos.productos) {
        carritoTurnos.productos = [];
    }

    carritoTurnos.productos.push(producto);
    console.log("Producto agregado:", producto.nombre);
    actualizarResumen();
}