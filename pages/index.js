import Api from "../scripts/components/Api.js";

const myForm = document.getElementById('myForm');
const input = myForm.shadowRoot.querySelector('.container__input');
const dropdown = myForm.shadowRoot.querySelector('.container__dropdown');

const api = new Api({
  address: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party',
  token: 'f5dd144f0f9c2196d8b357ca872686b0c5ceb116'
});

input.addEventListener('input', () => {
  const inputValue = input.value;

  api.getAllMatch(inputValue)
  .then(result => {
    dropdown.innerHTML = '';

    result.suggestions.forEach(item => {
      const option = document.createElement('option');
      option.text = item.value;
      dropdown.appendChild(option)
    });

    dropdown.classList.add('container__dropdown_opened')
  })
  .catch(error => {console.log(error)})
})
