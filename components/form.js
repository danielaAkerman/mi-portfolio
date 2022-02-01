function contactComponent(element) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <div class="seccion__contacto">
      <div class="contacto__contenedor-form">
        <h2 class="contacto__title">Escribime</h2>

        <form action="" class="form">
          <div class="contacto__fieldset">
            <label for="nombre" class="label">Nombre</label>
            <input id="nombre" class="input-nombre" type="text" />
          </div>
          <div class="contacto__fieldset">
            <label for="email" class="label">Email</label>
            <input id="email" class="input-email" type="email" />
          </div>
          <div class="contacto__fieldset">
            <label for="mensaje" class="label">Mensaje</label>
            <textarea id="mensaje" class="input-mensaje"></textarea>
          </div>
          <button class="boton">Enviar</button>
        </form>
      </div>
    </div>
    `;
  element.appendChild(componentEl);
}

function postData() {
  const form = document.querySelector(".seccion-contacto")

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const objeto = Object.fromEntries(formData.entries());

      let mensaje = `Nombre: ${objeto.nombre} <br>
      <br>
      Mail: ${objeto.email} <br> 
      <br>
      Mensaje: ${objeto.mensaje} `

      fetch("https://apx-api.vercel.app/api/utils/dwf", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "name": mensaje,
              "to": "danielaakerman14@gmail.com",
              "message": mensaje,
          })
      }).then(() => {
          alert("Gracias por escribirme")
          document.querySelectorAll(".form__input").forEach((input) => {
              input.value = ""
          })
      }).catch(() => {
          alert("Ha ocurrido un error, intentalo nuevamente")
      })
  })


}
postData()