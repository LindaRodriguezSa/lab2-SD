const slider = document.querySelector('.main-img');

let images = ['img.jpg', 'img.jpg'];
let index = 0;

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
			console.log('Nuea');
			createInstance();
			console.log(images.length);
		},
		email: () => {
			sendEmail();
		},
	},
});

function changeQuote() {
	fetch('/getquote')
		.then((response) => response.text())
		.then((info) => (quoteData.quote = info));
}

function createInstance() {
	images.push('https://skyprep.com/wp-content/uploads/2013/07/Alfred_Quotes1.jpg');
	// quoteData.quote = changeQuote();
}

function sendEmail() {
	fetch('/email');
	alert('Email enviado');
}

var arrowButtons = new Vue({
	el: '#arrow-buttons',
	methods: {
		right: () => {
			nextPicture();
		},
		left: () => {
			previousePicture();
		},
	},
});

function nextPicture() {
	index = index + 1 >= images.length ? 0 : index + 1;
	slider.src = images[index];
}

function previousePicture() {
	index = index - 1 < 0 ? images.length - 1 : index - 1;
	slider.alt = 'Nada de nada';
	slider.src = images[index];
}
