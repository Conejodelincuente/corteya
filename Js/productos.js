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
            `;

    const boton = document.createElement('button');
    boton.textContent = 'Añadir producto';
    boton.addEventListener('click', ()=>{
        agregarProductoAlCarrito(producto);
    });
        card.appendChild(boton);
        contenedor.appendChild(card);
    });
}

