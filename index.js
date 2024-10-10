const orderedItemTemplate = document.getElementById('ordered-item-template');
const orderItemList = document.getElementById('ordered-items');
const orderTotal = document.getElementById('order-total');
const totalBadge = orderTotal.querySelector('.badge');
const itemCount = document.getElementById('item-count');
const menuItemsParent = document.getElementById('menu-items');
const menuItemTemplate = document.getElementById('menu-item-template');

function formatMoney(amount) {
    return '$' + amount.toFixed(2);
}

function menuItemClicked(ev) {
    let card = ev.target.closest('.card');
    let itemName = card.querySelector('.card-body').textContent;
    let price = card.querySelector('.card-footer').textContent;

    let newItem = orderedItemTemplate.content.cloneNode(true);
    newItem.querySelector('.item-name').textContent = itemName;
    newItem.querySelector('.item-price').textContent = price;
    orderItemList.appendChild(newItem);

    let numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
    let currentTotal = parseFloat(totalBadge.dataset.number);
    let newTotal = currentTotal + numericPrice;
    totalBadge.dataset.number = newTotal;
    totalBadge.textContent = formatMoney(newTotal);

    let currentCount = parseInt(itemCount.textContent.replace(/[^0-9]+/g, ''));
    let newCount = currentCount + 1;
    let plural = 's';
    if (newCount === 1) {
        plural = '';
    }
    itemCount.textContent = `(${newCount} item${plural})`;
}

const menuItemData = [
    {
        itemName: 'Cheese pizza',
        itemPrice: 5,
        imgSrc: 'img/cheese-pizza.webp'
    },
    {
        itemName: 'Pepperoni pizza',
        itemPrice: 6,
        imgSrc: 'img/pepperoni-pizza.jpg'
    },
    {
        itemName: 'Supreme pizza',
        itemPrice: 10,
        imgSrc: 'img/supreme-pizza.jpg'
    },
    {
        itemName: 'Hamburger',
        itemPrice: 6,
        imgSrc: 'img/hamburger.jpg'
    },
    {
        itemName: 'Cheeseburger',
        itemPrice: 7,
        imgSrc: 'img/cheeseburger.jpg'
    },
    {
        itemName: 'Caesar salad',
        itemPrice: 3,
        imgSrc: 'img/caesar-salad.jpg'
    },
    {
        itemName: 'French fries',
        itemPrice: 3.5,
        imgSrc: 'img/french-fries.jpg'
    },
    {
        itemName: 'Cherry pie',
        itemPrice: 1,
        imgSrc: 'img/cherry-pie.jpg'
    },
    {
        itemName: 'Lemonade',
        itemPrice: .99,
        imgSrc: 'img/lemonade.jpg'
    }
]

for (let item of menuItemData) {
    let newItem = menuItemTemplate.content.cloneNode(true);
    newItem.querySelector('img').src = item.imgSrc;
    newItem.querySelector('.card-body').textContent = item.itemName;
    newItem.querySelector('.card-footer').textContent = formatMoney(item.itemPrice);
    newItem.querySelector('.card').addEventListener('click', menuItemClicked);
    menuItemsParent.appendChild(newItem);
}
