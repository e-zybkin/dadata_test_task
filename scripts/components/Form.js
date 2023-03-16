class MyForm extends HTMLElement {
  constructor() {
    super();
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const button = document.createElement("button");

    label.textContent = "Введите ваше имя:";
    input.type = "text";
    input.name = "name";
    button.type = "submit";
    button.textContent = "Отправить";

    form.classList.add("my-form");
    label.classList.add("my-label");
    input.classList.add("my-input");
    button.classList.add("my-button");

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    this.appendChild(form);
  }

  connectedCallback() {
    this.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(formData.get("name"));
    });
  }
}

customElements.define("my-form", MyForm);
