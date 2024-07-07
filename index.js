const template = document.querySelector('template');
const orderItemList = document.getElementById('ordered-items');
const orderTotal = document.getElementById('order-total');
const totalBadge = orderTotal.querySelector('.badge');
const itemCount = document.getElementById('item-count');

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
    });
});
