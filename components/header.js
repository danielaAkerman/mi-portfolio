function headerComponent(element) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
  <div class="seccion__header">
    <a href="./index.html" class="header__logo">
      <img src="./img/favicon.png" alt="" class="header__logo__img" />
    </a>
    <div class="header__burger-menu menu">
      <img src="./img/menu.png" alt="" class="header__burger-menu__img" />
    </div>
<!-- COMIENZA MENU DESPLEGABLE -->
    <div class="header__menu-ventana">
      <button class="cerrar-ventana">X</button>
      <div class="ventana__contenido">
        <a href="./portfolio.html" class="header__menu-portfolio">Portfolio</a>
        <a href="./servicios.html" class="header__menu-servicios">Servicios</a>
        <a href="./contacto.html" class="header__menu-contacto">Contacto</a>
      </div>
    </div>
<!-- FIN MENU DESPLEGABLE -->
    <nav class="menu-navegacion">
      <a href="./portfolio.html" class="header__portfolio">Portfolio</a>
      <a href="./servicios.html" class="header__servicios">Servicios</a>
      <a href="./contacto.html" class="header__contacto">Contacto</a>
    </nav>
    </div>
    `;

  element.appendChild(componentEl);

  //DESPLEGAR MENU HEADER
  const botonMenu = document.querySelector(".header__burger-menu");
  const ventana = document.querySelector(".header__menu-ventana");
  botonMenu.addEventListener("click", () => {
    ventana.style.display = "flex";
  });

  const cerrarVentana = document.querySelector(".cerrar-ventana");
  cerrarVentana.addEventListener("click", () => {
    ventana.style.display = "none";
  });
  //FIN MENU HEADER
}
