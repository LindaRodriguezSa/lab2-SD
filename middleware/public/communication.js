let index = 0;

let serverData = {
  server: 0,
};

var servernum = new Vue({
  el: "#servernum",
  data: serverData,
});

var buttonsa = new Vue({
  el: "#buttons",
  methods: {
    frase: () => {
      changeQuote();
    },
    instancia: () => {
      createInstance();
    },
    email: () => {
      sendEmail();
    },
  },
});

/**
 * Realiza una petición al servidor para cambiar la frase
 * @request get
 */
function changeQuote() {
  // valida que elthis usuario ingrese un link de una imagen, si no es asi, pone una default
  let newsrc = document.getElementById("image-url").value;
  if (newsrc == "") {
    newsrc = "https://images.financialexpress.com/2020/04/sky660.jpg";
  }

  imagecomponent.images[index].src = newsrc;

  fetch("/getquote")
    .then((response) => response.text())
    .then((comingQuote) => {
      imagecomponent.images[index].quote = comingQuote;
    })
    .catch((error) => console.log(error));
}

function createInstance() {
  fetch("/getInstance");

  imagecomponent.images.push({
    id: imagecomponent.images.length,
    src:
      "http://c.files.bbci.co.uk/169C7/production/_112151629_gettyimages-1142576725.jpg",
    quote: "Frase auxiliar (aux)",
  });

  alert("Creando instancia ...");
}

function sendEmail() {
  fetch("/email");
}

function getserverinfo() {
  // servidores.serversList.push({
  //   ip: "1233.34.344",
  //   status: "ok",
  // });
  fetch("/getserverinformation")
    .then((response) => response.json())
    .then((obj) => (servidores.serversList = obj))
    .catch((error) => console.log(error));
}

var servidores = new Vue({
  el: "#servidoresinfo",
  data() {
    return {
      serversList: [],
    };
  },
});

var imagecomponent = new Vue({
  el: "#image-change",
  data() {
    return {
      image: null,
      images: [
        {
          id: 0,
          src: "https://blog.hubspot.com/hubfs/famous-quotes.jpg",
          quote:
            '"El sabio no dice nunca todo lo que piensa, pero siempre piensa todo lo que dice" (Aristóteles)',
        },
        {
          id: 1,
          src:
            "https://www.wellandgood.com/wp-content/uploads/2016/06/Stocksy-Waterfall-Alexander-Grabchilev-1.jpg",
          quote:
            '"La más estricta justicia no creo que sea siempre la mejor política" (Abraham Lincoln)',
        },
        {
          id: 2,
          src:
            "https://cdn.tinybuddha.com/wp-content/uploads/2018/09/Woman-on-a-bench.png",
          quote: '"Cada día sabemos más y entendemos menos" (Albert Einstein)',
        },
      ],
    };
  },
  mounted() {
    loadImagesOnCarousel();
    getserverinfo();
  },
  updated() {
    let indicatorsElement = document.querySelector(".indicators");
    indicatorsElement.remove();
    loadImagesOnCarousel();
  },
});

function loadImagesOnCarousel() {
  const instance = document.querySelectorAll(".carousel");
  M.Carousel.init(instance, {
    duration: 150,
    dist: -80,
    shift: 5,
    padding: 20,
    numVisible: 3,
    indicators: true,
    noWrap: false,
    // On cycle to permite conocer cuando se mueve el carrusel
    onCycleTo: (data) => {
      // data.getAttribute me trae el atributo data-id que tiene el elemento
      // div con clase .carousel-item, donde almaceno el id actual del carrusel
      let currentImgID = parseInt(data.getAttribute("data-id"));
      // finalmente actualizo el index en el que voy
      // tanto en logica como en ui
      index = currentImgID;
      serverData.server = currentImgID + 1;
    },
  });
}
//monitoreo

const tarjeta = (btnAbrirTable = document.querySelector("#btn-abrir-table")),
  tablaMonitoreo = document.querySelector("#tarjeta");

// * Boton de abrir targeta monitoreo
btnAbrirTable.addEventListener("click", () => {
  btnAbrirTable.classList.toggle("active");
  tablaMonitoreo.classList.toggle("active");
});
