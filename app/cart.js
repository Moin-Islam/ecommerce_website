

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
            <td>${item.price}</td>
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
        var firstCells = document.querySelectorAll('td:nth-child(5)');
        var cellValues = [];

        const subTotal =e.target.value * price;
        subTotalElement.innerHTML = subTotal;

        firstCells.forEach(function(singleCell) {
            cellValues.push(singleCell.innerText);
        })
        cellValues.shift();
        const intTotal = cellValues.map(str => {
            return Number(str);
        })
        console.log(intTotal);
        let total = 0;
        intTotal.forEach(num => {
            total += num;
        });

        updateCartTotal(total);

        console.log(subTotal, total);
    }
});

cartItems.addEventListener("click", (e) => {
    if(e.target.classList.contains('fa-regular')) {
        const id = e.target.parentElement.parentElement.parentElement.dataset.id;
        removeItemLocalStorage(id);
        e.target.parentElement.parentElement.parentElement.remove();
    }
})

function updateCartTotal(cartTotal) {
    const totalHtml = document.querySelector(".total");
    const finalTotal = document.querySelector(".totalSecond");
    totalHtml.innerHTML = "$" +cartTotal;
    finalTotal.innerHTML = "$" +cartTotal;
    console.log(totalHtml, finalTotal);
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






