class MyForm extends HTMLElement {
  constructor() {
    super();
    this.formTemplate = document.querySelector('.template__form');
    this.formContent = this.formTemplate.content.cloneNode(true);

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(this.formContent);
  }

  connectedCallback() {
    
  }
}

customElements.define("my-form", MyForm);
