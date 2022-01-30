function getPortfolio() {
  return fetch(
    "https://cdn.contentful.com/spaces/mk4vl3fftmmq/environments/master/entries?access_token=4w2igBAOrE0biXFvBGag39cG4YjR9u1fQvJGbE79dOA&&content_type=portfolio"
  )
    .then((res) => {
      return res.json();
    })
    .then((dataPortfolio) => {
      const portfolioCollections = dataPortfolio.items.map((i) => {
        return {
          tituloPortfolio: i.fields.tituloTrabajo,
          descripcionPortfolio: i.fields.descripcionTrabajo,
          urlPorfolio: i.fields.link,
          imageID: i.fields.imagenTrabajo.sys.id,
          includes: dataPortfolio.includes.Asset,
        };
      });

      portfolioCollections.forEach((x) => {
        let idEncontrado = buscarAsset(x.imageID, x.includes);
        x.image = idEncontrado.fields.file.url;
      });
      return portfolioCollections;
    });
}

function buscarAsset(assetID, includes) {
  const encontrado = includes.find((inc) => {
    return inc.sys.id == assetID;
  });
  return encontrado;
}

function addPortfolio(params) {
  const template = document.querySelector("#portfolio-card-template"); //Lo que clonamos (id)
  const container = document.querySelector(".portfolio__container"); //A donde va (class)

  template.content.querySelector(
    ".portfolio__container__titulo-portfolio"
  ).textContent = params.tituloPortfolio;

  template.content.querySelector(
    ".portfolio__container__descripcion-portfolio"
  ).textContent = params.descripcionPortfolio;

  template.content.querySelector(".imagen-portfolio").src = params.image;

  template.content.querySelector(".portfolio__container__link").href =
    params.urlPorfolio;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function main() {
    getPortfolio().then(function (portfolio) {
      for (const p of portfolio) {
        addPortfolio(p);
      }
    });
    const footer = document.querySelector(".seccion-footer");
    footerComponent(footer);
  }
  
  main();