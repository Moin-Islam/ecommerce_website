const totalHtml = document.querySelector(".total");
const finalTotal = document.querySelector(".totalSecond");
let expense=0;

let items = JSON.parse(localStorage.getItem('cartItems'));
console.log(items);

if(items.length == 0) {
    console.log("no Item in cart");
    totalHtml.innerHTML = "0";
    finalTotal.innerHTML = "0";
}else if (items.length == 1){
   expense = items[0].expense;
   totalHtml.innerHTML = expense;
    finalTotal.innerHTML = expense;
} else {
    items.forEach((item) => {
        expense += item.expense;
        console.log(expense);   
    });
    totalHtml.innerHTML = expense;
    finalTotal.innerHTML = expense;
}

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
            <td>${item.size}</td>
            <td><input type="number" value="${item.quantity}"></td>
            <td>${item.expense}</td>
        </tr>
        `;
    });
    cartItems.innerHTML = output;
}

/*const debouncedChangeHandler = debounce((e) =>{
    e.preventDefault();
    console.log(e.target.value);
    const price = e.target.closest('tr').querySelector('td:nth-child(3)').innerHTML;
    const subTotalElement = e.target.closest('tr').querySelector('td:last-child');
    const subTotal =e.target.value * price;
    subTotalElement.innerHTML = subTotal;
}, 500);*/

cartItems.addEventListener("change", (e) => {
    if(e.target.tagName == 'INPUT' && e.target.type === 'number') {

        const price = e.target.closest('tr').querySelector('td:nth-child(3)').innerHTML;
        const subTotalElement = e.target.closest('tr').querySelector('td:last-child');
        var subTotalCells = document.querySelectorAll('td:nth-child(6)');
        var cellValues = [];
        console.log(subTotalCells);
        const subTotal =e.target.value * price;
        subTotalElement.innerHTML = subTotal;

        subTotalCells.forEach(function(singleCell) {
            cellValues.push(Number(singleCell.innerText));
        })
        cellValues.shift();
        //console.log(cellValues);
        const intTotal = cellValues.map(str => {
            return Number(str);
        })
        //console.log(intTotal);
        let total = 0;
        intTotal.forEach(num => {
            total += num;
        });

        updateCartTotal(total);

        //console.log(subTotal, total);
    }
});

cartItems.addEventListener("click", (e) => {
    if(e.target.classList.contains('fa-regular')) {
        const id = e.target.parentElement.parentElement.parentElement.dataset.id;
        removeItemLocalStorage(id);
        e.target.parentElement.parentElement.parentElement.remove();
        location.reload();
    }
})

function updateCartTotal(cartTotal) {
    
    totalHtml.innerHTML = "$" +cartTotal;
    finalTotal.innerHTML = "$" +cartTotal;
    console.log(cartTotal);
}

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






