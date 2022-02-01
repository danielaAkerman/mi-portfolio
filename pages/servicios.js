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
  

function main() {
    getServicios().then(function (servicios) {
      for (const s of servicios) {
        addServicios(s);
      }
    });

    const header = document.querySelector(".seccion-header");
    headerComponent(header);
    
    const footer = document.querySelector(".seccion-footer");
    footerComponent(footer);
  }
  
  main();