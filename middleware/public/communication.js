var quote = new Vue({
  el: "#quote",
  data: {
    quote: "Solo que nada sé",
  },
});

var servernum = new Vue({
  el: "#servernum",
  data: {
    server: "Servidor 1",
  },
});

var buttonsa = new Vue({
  el: "#buttons",
  methods: {
    frase: () => {
      quote.data = {
        quote: "Nueva frase",
      };
      console.log("Aca llamamos el servicio de node para cambiar la frase");
    },
    instancia: () => {
      console.log("/instancia");
    },
    email: () => {
      console.log("/email");
    },
  },
});
