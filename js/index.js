const container = document.querySelector(".container")
const inputSearch = document.querySelector("input#inputSearch")
const carrito = recuperarCarrito()

const titulo = document.getElementById("Titulo")
const bajadaTitulo = document.getElementById("bajadaTitulo")

titulo.innerText = "Tu mejor viaje"
bajadaTitulo.innerText = "Selecciona tu paquete favorito."

function filtrarDestinos(valor) {
    let resultado = destinos.filter(destino => destino.nombre.toLowerCase().includes(valor.toLowerCase()))
    resultado.length > 0 && console.table(resultado)
    if (resultado.length > 0) {
        cargarProductos(resultado)
    }
}

function retornarcardHTML(destino) {
    return `<div class="div-card">
                <div class="imagen"><img src="${destino.imagen}"</img></div>
                <div class="nombre"><h3>${destino.nombre}</h3>
                <div class="fechaSalida"><h4>Fecha de salida: ${destino.fechaSalida}</h4>
                <div class="duracion"><h4>Duración:${destino.duracion}</h4>
                <div class="precio"><h4>USD ${destino.precio}</h4>
                <div class="botonCard">
                    <button class="btn btn-primary btn-sm" id="${destino.id}" title="Agregar"><img src="img/carrito_card.png"></button>
            </div>`
}

function cargarProductos(array) {
    container.innerHTML = ""
    array.forEach((destino) => {
        container.innerHTML += retornarcardHTML(destino)
    })
        activarClickBotones()
}

inputSearch.addEventListener("search", (e) => {
    filtrarDestinos(e.target.value)
})

function activarClickBotones() {
    const botones = document.querySelectorAll("button.btn.btn-primary.btn-sm")
    for (const boton of botones) {
        boton.addEventListener("click", () => {
            let resultado = destinos.find(destino => destino.id === parseInt(boton.id))
            carrito.push(resultado)
            guardarCarrito()
        })
    }
}

function guardarCarrito() {
    localStorage.setItem("carritoUsuario", JSON.stringify(carrito))
}

function recuperarCarrito() {
    const carritoTemporal = JSON.parse(localStorage.getItem("carritoUsuario")) || []
    return carritoTemporal
}

cargarProductos(destinos)
recuperarCarrito()