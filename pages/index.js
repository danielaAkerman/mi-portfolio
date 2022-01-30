// OBTENER BIENVENIDA DESDE CMS
function getBienvenida() {
  return fetch(
    "https://cdn.contentful.com/spaces/mk4vl3fftmmq/environments/master/entries?access_token=4w2igBAOrE0biXFvBGag39cG4YjR9u1fQvJGbE79dOA&&content_type=welcome"
  )
    .then((res) => {
      return res.json();
    })
    .then((dataBienvenida) => {
      const bienvenidaCollections = dataBienvenida.items.map((i) => {
        return {
          hola: i.fields.saludo,
          soyDaniela: i.fields.soyDaniela,
        };
      });

      return bienvenidaCollections;
    });
}

function addBienvenida(params) {
  saludo = document.querySelector(".welcome__hola");
  soy = document.querySelector(".welcome__soy-daniela");

  saludo.textContent = params.hola;

  soy.textContent = params.soyDaniela;
}

// FIN OBTENER BIENVENIDA DESDE CMS

// OBTENER PRESENTACION DESDE CMS
function getPresentacion() {
  return fetch(
    "https://cdn.contentful.com/spaces/mk4vl3fftmmq/environments/master/entries?access_token=4w2igBAOrE0biXFvBGag39cG4YjR9u1fQvJGbE79dOA&&content_type=sobreMi"
  )
    .then((res) => {
      return res.json();
    })
    .then((dataPresentacion) => {
      const presentacionCollections = dataPresentacion.items.map((i) => {
        return {
          tituloPresentacion: i.fields.sobreMi,
          descripcionPresentacion: i.fields.textoAlgoSobreMi,
          imagenPresentacion:
            dataPresentacion.includes.Asset[0].fields.file.url,
        };
      });

      return presentacionCollections;
    });
}

function addPresentacion(params) {
  titulo = document.querySelector(".presentacion__texto__soy-daniela");
  descripcion = document.querySelector(".presentacion__texto__sobre-mi");
  imagen = document.querySelector(".presentacion__img");

  titulo.textContent = params.tituloPresentacion;

  descripcion.textContent = params.descripcionPresentacion;

  imagen.src = params.imagenPresentacion;
}

// FIN OBTENER PRESENTACION DESDE CMS

// OBTENER SERVICIOS DESDE CMS
function getServicios() {
  return fetch(
    "https://cdn.contentful.com/spaces/mk4vl3fftmmq/environments/master/entries?access_token=4w2igBAOrE0biXFvBGag39cG4YjR9u1fQvJGbE79dOA&&content_type=servicios"
  )
    .then((res) => {
      return res.json();
    })
    .then((dataServicios) => {
      const serviciosCollections = dataServicios.items.map((i) => {
        return {
          tituloServicio: i.fields.tituloServicio,
          descripcionServicio: i.fields.descripcionServicio,
          imageID: i.fields.imagenServicio.sys.id,
          includes: dataServicios.includes.Asset,
        };
      });

      serviciosCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = idEncontrado.fields.file.url;
      });
      return serviciosCollections;
    });
}

function buscarAsset(assetID, includes) {
  const encontrado = includes.find((inc) => {
    return inc.sys.id == assetID;
  });
  return encontrado;
}

function addServicios(params) {
  const template = document.querySelector("#servicios-card-template"); //Lo que clonamos (id)
  const container = document.querySelector(".servicios__container"); //A donde va (class)

  template.content.querySelector(".titulo-servicio").textContent =
    params.tituloServicio;

  template.content.querySelector(".descripcion-servicio").textContent =
    params.descripcionServicio;

  template.content.querySelector(".imagen-servicio").src = params.image;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}
// FIN OBTENER SERVICIOS DESDE CMS

function main() {
  getBienvenida().then(function (bienvenida) {
    for (const b of bienvenida) {
      addBienvenida(b);
    }
  });

  getPresentacion().then(function (presentacion) {
    for (const p of presentacion) {
      addPresentacion(p);
    }
  });

  getServicios().then(function (servicios) {
    for (const s of servicios) {
      addServicios(s);
    }
  });
  const footer = document.querySelector(".seccion-footer");
  footerComponent(footer);
}

main();
