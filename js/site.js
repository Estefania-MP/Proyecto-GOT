// Variables

const listaDeProductos = [
    {nombre: "Lampara de Dragon", precio: 12800},
    {nombre: "Cajita Musical", precio: 9700},
    {nombre: "Corbata", precio: 7500},
    {nombre: "Pin GOT", precio: 2500},
    {nombre: "Taza GOT", precio: 2000},
    {nombre: "Mazo de Cartas GOT", precio:900},
];

let carrito = [];


let seleccionProductos = prompt("Indicanos con si o no si queres saber cuales son nuestros productos!")


// Bucles interactivos y funciones flecha:

while (seleccionProductos != "si" && seleccionProductos != "no"){
    alert("Por favor, ingresar si o no")
    seleccionProductos = prompt ("Deseas comprar algo? Responder con si o no")
}


if(seleccionProductos == "si"){
    alert("Te mostramos nuestra lista de productos")
    let todosLosProductos = listaDeProductos.map((producto) => producto.nombre + " " + "$" + producto.precio);

    alert(todosLosProductos.join(" - "))
}
else if(seleccionProductos == "no"){
    alert("Gracias por visitar nuetro sitio, hasta pronto!")
}

while (seleccionProductos != "no"){
    let producto = prompt("Agrega un producto al carrito")
    let precio = 0

    if (producto == "Lampara de Dragon" || producto == "Cajita Musical" || producto == "Corbata" || producto == "Pin GOT" || producto == "Taza GOT" || producto == "Mazo de Cartas GOT"){
        switch(producto){
            case "Lampara de Dragon":
                precio = 12800
                break; 
            case "Cajita Musical":
                precio = 9700
                break;
            case "Corbata":
                precio = 7500
                break;
            case "Pin GOT":
                precio = 2500
                break;
            case "Taza GOT":
                precio = 2000
                break;
            case "Mazo de Cartas GOT":
                precio = 900
                break;
            default:
                break;
        }
     let unidades = parseInt(prompt("Cuantas unidades vas a comprar?")) 
     
     carrito.push({producto, unidades, precio})
     console.log(carrito);
    } else {
        alert("El producto que indicas no esta en nuestro stock")
    }

    seleccionProductos = prompt("Añadiras otro producto al carrito?")
    while(seleccionProductos === "no"){
        alert("Perfecto! A continuacion te informamos el detalle de tu compra")
        carrito.forEach((carritoFinal) => {
            console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar: ${carritoFinal.unidades * carritoFinal.precio}`);
            alert("Compraste: " + carritoFinal.unidades + " " + carritoFinal.producto + " valor $" + carritoFinal.unidades * carritoFinal.precio);
            
        })
    break;
    }
}

const total = carrito.reduce ((acc, el) => acc + el.precio * el.unidades, 0)
console.log(`El total a pagar por la compra es: ${total}`)
alert("El total a pagar es $" + total + "  ¡Gracias por la compra!");

