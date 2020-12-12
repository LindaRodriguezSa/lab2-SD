let index = 0;

let quoteData = {
  quote: "Solo sé que nada sé",
};

let serverData = {
  server: "Servidor 1",
};

var compQuote = new Vue({
  el: "#quote",
  data: quoteData,
});

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

function changeQuote() {
  fetch("/getquote")
    .then((response) => response.text())
    .then((info) => (quoteData.quote = info));
}

function createInstance() {
  imagecomponent.images.push({
    index: imagecomponent.images.length + 1,
    src:
      "https://i.picsum.photos/id/430/536/354.jpg?hmac=uxrNCXgJuycp2JMZ9jpZb5ThTsZIplRTSPuc4ybMyws",
  });
}

function sendEmail() {
  fetch("/email");
  alert("Email enviado");
}

var imagecomponent = new Vue({
  el: "#image-change",
  data() {
    return {
      index: 0,
      image: null,
      images: [
        {
          id: 1,
          src: "https://blog.hubspot.com/hubfs/famous-quotes.jpg",
          alt: "Natural Grove Green Trees Path",
        },
        {
          id: 2,
          src:
            "https://www.planetware.com/wpimages/2019/09/top-places-to-visit-in-the-world-machu-picchu-peru.jpg",
          alt: "stockafbeelding cascades in nationaal park plitvice",
        },
        {
          id: 3,
          src:
            "https://cdn.tinybuddha.com/wp-content/uploads/2018/09/Woman-on-a-bench.png",
          alt: "natural view of waterfall",
        },
      ],
    };
  },
  mounted() {
    this.switchImage();
  },
  methods: {
    switchImage() {
      this.image = this.images[this.index];
      this.index = (this.index + 1) % this.images.length;
    },
  },
});
