import Api from "../scripts/components/Api.js";

const myForm = document.querySelector('#myForm').shadowRoot;
const input = myForm.querySelector('.container__input');
const shortName = myForm.querySelector('#name_short');
const fullName = myForm.querySelector('#name_full');
const inn = myForm.querySelector('#inn_kpp');
const address = myForm.querySelector('#address');

const api = new Api({
  address: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
  token: 'f5dd144f0f9c2196d8b357ca872686b0c5ceb116'
});

input.addEventListener('input', onInputChange);

async function onInputChange() {
  removeDropDown();

  const inputValue = input.value;

  if(inputValue.length === 0) {
    return;
  }

  if(shortName.value.length > 0) {
    clearFields();
  }

  const newArr = [];

  await api.getAllMatch(inputValue)
  .then(result => {
    result.suggestions.forEach(item => {
      newArr.push(item)
    })
  })
  .catch(error => {console.log(error)})

  createDropDown(newArr);
}

function createDropDown(arr) {
  const listEl = document.createElement("ul");
  listEl.className = "container__list";

  arr.forEach(item => {
    const listItem = document.createElement("li");
    const listButton = document.createElement("button");
    listButton.innerHTML = item.value;
    listButton.value = item.value;
    listButton.addEventListener('click', onDropDownButtonCLick);

    listItem.appendChild(listButton);

    listEl.appendChild(listItem);
  });

  myForm.querySelector('.container').appendChild(listEl);
}

function removeDropDown() {
  const listEl = myForm.querySelector(".container__list");
  if (listEl) {
    listEl.remove();
  };
}

function onDropDownButtonCLick(event) {
  event.preventDefault();
  const buttonEl = event.target;

  api.getAllMatch(buttonEl.value)
  .then(result => {
    const data = result.suggestions[0].data;

    shortName.value = data.name.short_with_opf;
    fullName.value = data.name.full_with_opf;
    inn.value = data.inn + ' / ' + data.kpp;
    address.value = data.address.value;
  })
  .catch(error => {console.log(error)})

  input.value = buttonEl.value;

  removeDropDown();
}

function clearFields() {
  shortName.value = '';
  fullName.value = '';
  inn.value = '';
  address.value = '';
  removeDropDown();
}
