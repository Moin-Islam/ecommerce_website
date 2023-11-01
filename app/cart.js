
import debounce from 'lodash.debounce';

let items = JSON.parse(localStorage.getItem('cartItems'));
console.log(items);


const cartItems = document.querySelector(".cartItems");


let output = "";

renderTable(items);

function renderTable (items) {
    items.forEach((item)=>{
        output += `
        <tr data-id = ${item.id} id="${item.id}">
        <td><a href="#"><i class="fa-regular fa-circle-xmark"></i></a></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><input type="number" value="1"></td>
        <td>$118.19</td>
    </tr>
        `;
    });
    cartItems.innerHTML = output;
}

const debouncedChangeHandler = debounce((e) =>{
    e.preventDefault();
    console.log(e.target.value);
    const price = e.target.closest('tr').querySelector('td:nth-child(3)').innerHTML;
    const subTotalElement = e.target.closest('tr').querySelector('td:last-child');
    const subTotal =e.target.value * price;
    subTotalElement.innerHTML = subTotal;
}, 500);

cartItems.addEventListener("change", debouncedChangeHandler);

cartItems.addEventListener("click", (e) => {
    console.log("remove button clicked");
    console.log(e.target.parentElement.parentElement.parentElement);
    const id = e.target.parentElement.parentElement.parentElement.dataset.id;
    removeItemLocalStorage(id);
    e.target.parentElement.parentElement.parentElement.remove();
})

function removeItemLocalStorage(id) {
    let items = JSON.parse(localStorage.getItem('cartItems'));
    const index = items.findIndex((item) => item.id == id);
    console.log(index);
    items.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(items));
}

/*function totalPrice(price) {
    const quantity = document.querySelector(".cartItems input");
    const subTotalElement = document.querySelector(".cartItems td:last-child");

    quantity.addEventListener("change",(e)=>{

    } );
    const subTotal = price * quantity;
    console.log(subTotal, subTotalElement);
}*/






