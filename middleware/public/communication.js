let index = 0;
let servidores;

let quoteData = {
	quote: 'Solo sé que nada sé',
};


let serverData = {
	server: 'Servidor 1',
};

var compQuote = new Vue({
	el: '#quote',
	data: quoteData,
});

var servernum = new Vue({
	el: '#servernum',
	data: serverData,
});

var buttonsa = new Vue({
	el: '#buttons',
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
  let newsrc = document.getElementById('image-url').value;
	if (newsrc == '') {
		newsrc =
			'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=770&q=80';
	}

	imagecomponent.images[index].src = newsrc;

  imagecomponent.image = imagecomponent.images[index];
  
    fetch("http://192.168.0.11:3000/getQuote")
    .then((response) => response.text())
    .then((info) => (quoteData.quote = info));
  fetch("/getServer")
    .then((response) => response.text())
    .then((info) => (serverData.server = info));
}

function createInstance() {
  fetch("/getInstance")
  imagecomponent.images.push({
    index: imagecomponent.images.length + 1,
    src:
      "https://i.picsum.photos/id/430/536/354.jpg?hmac=uxrNCXgJuycp2JMZ9jpZb5ThTsZIplRTSPuc4ybMyws",
  });
}

function sendEmail() {
  fetch("/email");
  alert("email enviado")
}

var imagecomponent = new Vue({
	el: '#image-change',
	data() {
		return {
			image: null,
			images: [
				{
					id: 0,
					src: 'https://blog.hubspot.com/hubfs/famous-quotes.jpg',
				},
				{
					id: 1,
					src: 'https://www.planetware.com/wpimages/2019/09/top-places-to-visit-in-the-world-machu-picchu-peru.jpg',
				},
				{
					id: 2,
					src: 'https://cdn.tinybuddha.com/wp-content/uploads/2018/09/Woman-on-a-bench.png',
				},
			],
		};
	},
	mounted() {
		this.switchImage();
	},
	methods: {
		switchImage() {
			this.image = this.images[index];
			index = (index + 1) % this.images.length;
		},
	},
});
