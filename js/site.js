
//         CARRITO DE COMPRAS      

//Variables
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

// Para la funcionalidad de los botones comprar
Clickbutton.forEach(btn => {
    btn.addEventListener('click',addToCarritoItem)
})

//Funciones para añadir los productos al carrito
 function addToCarritoItem(e){
 const button = e.target
 const item = button.closest('.card')
 const itemTitle = item.querySelector('.card-title').textContent;
 const itemPrice = item.querySelector('.precio').textContent;
 const itemImg = item.querySelector('.card-img-top').src;
 const newItem = {
     title: itemTitle,
     precio: itemPrice,
     img: itemImg,
     cantidad: 1
 }
 addItemCarrito(newItem)
 }

 function addItemCarrito(newItem){
     const InputElemento = tbody.getElementsByClassName('input_elemento')
     for(let i =0; i < carrito.length ; i++){
         if(carrito[i].title.trim() === newItem.title.trim()){
         carrito[i].cantidad ++;
         const inputValue = InputElemento[i]
        inputValue.value++;
         CarritoTotal()
          return null;
         }
     }
     carrito.push(newItem)
     renderCarrito()
 }

 //Funcion para que el porducto se vea reflejado en el carrito
 function renderCarrito(){
    tbody.innerHTML = ''
     carrito.map(item => {
         const tr = document.createElement('tr')
         tr.classList.add('ItemCarrito')
         const Content = `
         <td class="table_productos" ><img src=${item.img} alt=""></td>
         <td> <h5 class="title text-white">${item.title}</h5></td>
         <td class="table_price text-white"><p>${item.precio}</p></td>
         <td class="table_cantidad"> <input type="number" min="1" class="input_elemento" value=${item.cantidad}></td>
         <td> <button class="delete btn btn-danger">X</button></td>
         `;
         tr.innerHTML = Content;
         tbody.append(tr)

         tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
         tr.querySelector(".input_elemento").addEventListener('change', sumaCantidad)
     })
     CarritoTotal()
 }

 //Funcion para que se sume el total a pagar por todos los productos
 function CarritoTotal(){
     let Total = 0;
     const itemCartTotal = document.querySelector('.itemCartTotal')
     carrito.forEach((item) => {
         const precio = Number(item.precio.replace("$", ''))
         Total = Total + precio*item.cantidad
     })
     itemCartTotal.innerHTML = `Total $${Total}`
     addLocalStorage()
 }

 //Funcion para eliminar los productos del carrito
 function removeItemCarrito(e){
 const buttonDelete = e.target
 const tr =  buttonDelete.closest(".ItemCarrito")
 const title = tr.querySelector('.title').textContent;
 for(let i=0; i<carrito.length ; i++){
     if(carrito[i].title.trim() === title.trim()){
         carrito.splice(i, 1)
     }
 }
 tr.remove()
 CarritoTotal()
 }

 //Funcion para que se pueda sumar la cantidad de un mismo producto de forma manual en el carrito
 function sumaCantidad(e){
    const sumaInput = e.target 
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
 }

 //Funcion para que al actualizar la web no se eliminen los producto añadidos al carrito 
 function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
 }

 window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
 }

 //         FILTRO DE LISTADO DE PRODUCTOS SEGUN CATEGORIA

 //Variables
 const btn = document.querySelectorAll('.btnf');
 const storeProducts = document.querySelectorAll(".store-product");

 //Bucle para efectuar el filtro
 for(i = 0; i < btn.length; i++){
    btn[i].addEventListener("click", (e) => {
        e.preventDefault();
        const filter = e.target.dataset.filter;
        storeProducts.forEach((product) => {
            if (filter == "all"){
                product.style.display = "block"
            } else {
                if (product.classList.contains(filter)){
                    product.style.display = "block"
                } else {
                    product.style.display = "none"
                }
            }
        })
    })
 }

 //         DETALLE DE PRODUCTOS

 // Aplicando jquery para que el detalle del producto se vea como un alert al clickeat el boton de detalle

 const btnD1 = document.querySelector('#myBtn')
 btnD1.addEventListener('click', () => {
    Swal.fire({
        title: 'Cajita Musical',
        text: 'Cajita Musical en color negro a manivela con la melodía de la serie Game of Thrones',
        color: 'white',
        imageUrl: '	http://127.0.0.1:5500/img/P-cajita.svg',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD2 = document.querySelector('#myBtn2')
 btnD2.addEventListener('click', () => {
    Swal.fire({
        title: 'Lampara de Dragon',
        text: 'Lampara de dragón hecha en PLA con impresora 3D',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-lampara.svg',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD3 = document.querySelector('#myBtn3')
 btnD3.addEventListener('click', () => {
    Swal.fire({
        title: 'Corbata logo casa Stark',
        text: 'Corbata en color verde que presenta el emblema del lobo huargo de House Stark estampado en el frente',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-corbata.svg',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD4 = document.querySelector('#myBtn4')
 btnD4.addEventListener('click', () => {
    Swal.fire({
        title: 'Pin',
        text: 'Broche de solapa de Game of Thrones con acabado antiguo y baño de oro',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-pin.svg',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD5 = document.querySelector('#myBtn5')
 btnD5.addEventListener('click', () => {
    Swal.fire({
        title: 'Stark Sigilo Gemelos',
        text: 'Gemelo troquelado acabado envejecido con baño de color plateado',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-gemelos.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD6 = document.querySelector('#myBtn6')
 btnD6.addEventListener('click', () => {
    Swal.fire({
        title: 'Vaso de pinta',
        text: 'Vaso de vidrio con la icónica línea de Tyrion en la parte delantera',
        color: 'white',
        imageUrl: '	http://127.0.0.1:5500/img/P-vaso.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD7 = document.querySelector('#myBtn7')
 btnD7.addEventListener('click', () => {
    Swal.fire({
        title: 'Remera Mother of Dragons',
        text: 'Remera en color negro con el logo estampado de Mother of Dragons en rojo, talle unico',
        color: 'white',
        imageUrl: '	http://127.0.0.1:5500/img/P-remera.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD8 = document.querySelector('#myBtn8')
 btnD8.addEventListener('click', () => {
    Swal.fire({
        title: 'Cartas temáticas de Game of Thrones',
        text: 'Barajas de cartas temáticas de Game of Thrones, miden 2,5 x 3,5 y tienen un acabado tipo lino',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-cartas.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD9 = document.querySelector('#myBtn9')
 btnD9.addEventListener('click', () => {
    Swal.fire({
        title: 'Tabla para servir artesanal',
        text: ' Tabla de quesos o para cortar con un borde vivo en el costado de la tabla y una cuerda rústica en el extremo del mango',
        color: 'white',
        imageUrl: '	http://127.0.0.1:5500/img/P-tabla.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });

 const btnD10 = document.querySelector('#myBtn10')
 btnD10.addEventListener('click', () => {
    Swal.fire({
        title: 'Rompecabezas 3D La Fortaleza Roja',
        text: ' Este rompecabezas es una réplica exclusiva de 845 piezas del castillo de King Landing ',
        color: 'white',
        imageUrl: 'http://127.0.0.1:5500/img/P-rompecabezas.webp',
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: '#3D3D3D',
        confirmButtonText: 'Volver',
       })
 });


 //            INSERTANDO API

 // Fetch para insertar api con los datos de una de las casa mas importante de GOT

 const url = 'https://anapioficeandfire.com/api/houses/378';

 fetch(url)
 .then(Response => Response.json())
 .then(data => {
    let element = document.getElementById ('elem')
    element.innerHTML = `
    <table class="table table-bordered border-warning" style="--bs-border-opacity: .3;">
            <thead class="text-center text-white" style="--bs-text-opacity: .5;">
                <tr>
                    <th>Casa</th>
                    <th>Region</th>
                    <th>Escudo de Armas</th>
                    <th>Frase</th>
                    <th>Armas ansestrales</th>
                </tr>
            </thead>
            <tbody class="text-center text-white" style="--bs-text-opacity: .3;">
                <tr>
                    <td><b>${data.name}</b></td>
                    <td><b>${data.region}</b></td>
                    <td>${data.coatOfArms}</td>
                    <td>${data.words}</td>
                    <td>${data.ancestralWeapons}</td>
                </tr>
                
            </tbody>
          </table>
    `
    console.log(data)
 })


 


