const template = document.querySelector('template');
const orderItemList = document.querySelector('.list-group');
const orderTotal = document.getElementById('order-total');
const totalBadge = orderTotal.querySelector('.badge');

function formatMoney(amount) {
    return '$' + amount.toFixed(2);
}

document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', ev => {
        let card = ev.target.closest('.card');
        let itemName = card.querySelector('.card-body').textContent;
        let price = card.querySelector('.card-footer').textContent;

        let newItem = template.content.cloneNode(true);
        newItem.querySelector('.item-name').textContent = itemName;
        newItem.querySelector('.item-price').textContent = price;
        orderItemList.insertBefore(newItem, orderTotal);

        let numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
        let currentTotal = parseFloat(totalBadge.dataset.number);
        let newTotal = currentTotal + numericPrice;
        totalBadge.setAttribute('data-number', newTotal);
        totalBadge.textContent = formatMoney(newTotal);
    });
});
