
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
    console.log(carrito)
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