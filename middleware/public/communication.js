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
			console.log('/email');
		},
	},
});

function changeQuote() {
	fetch('/getquote')
		.then((response) => response.text())
		.then((info) => (quoteData.quote = info));
}

function createInstance() {
	quoteData.quote = changeQuote();
}
