class List extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: "open" });

    this.divHeader = document.createElement("div");
    this.divContent = document.createElement("div");
    this.showImage = false;

    shadow.appendChild(this.divHeader);
    shadow.appendChild(this.divContent);
  }

  connectedCallback() {
    this.divHeader.innerHTML = `<strong>${this.getAttribute(
      "data-title"
    )}</strong>`;

    let url = this.getAttribute("data-url");
    let field = this.getAttribute("data-field");
    if (this.getAttribute("showImage")) {
      this.showImage = this.getAttribute("showImage");
    }

    this.divContent.innerHTML = "";

    fetch(url)
      .then((response) => response.json())
      .then((userList) =>
        userList.forEach((user) => {
          if (this.showImage === "true") {
            this.divContent.innerHTML += `<img src="${user[field]}"></img>`
          } else {
            this.divContent.innerHTML += `<div>${user[field]}</div>`;
          }
        })
      );
  }
}

customElements.define("app-list", List);
