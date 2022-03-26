const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
const clear = document.querySelector('.clear');

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, 
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
};

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      clear.style.display = "flex"
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
};

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip this unles it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
};
///select all&clear all functions in one event listener and function
function selectAll(e) {
  populateList(items, itemsList);
  const el = e.target;
  const allCheck = items.every((item) => item.done === true);
  if (el.classList.contains("clearCheck")) {
    console.log(el);
        if (allCheck && el.checked); {
          items.forEach((item) => (item.done = false));
        } if (!allCheck && !el.checked) {
          items.forEach((item) => (item.done = true));
        } if (allCheck && !el.checked) {
          items.forEach((item) => (item.done = true));
        }
        el.checked = !el.checked;
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
  } else if (e.target.classList.contains("clear-all")) {
    console.log(el);
    if (allCheck) {
      items = [];
      localStorage.removeItem("items");
      clear.style.display = "none";
      populateList(items, itemsList);
    }
  }
};

populateList(items, itemsList)
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clear.addEventListener("click", selectAll);
