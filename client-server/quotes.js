const quotes = [
	'No hay que ir para atrás ni para darse impulso (Lao Tsé)',
	'No hay caminos para la paz; la paz es el camino (Mahatma Gandhi)',
	'Haz el amor y no la guerra (John Lennon)',
	'Para trabajar basta estar convencido de una cosa: que trabajar es menos aburrido que divertirse (Charles Baudelaire)',
	'Lo peor que hacen los malos es obligarnos a dudar de los buenos (Jacinto Benavente)',
	'Las guerras seguirán mientras el color de la piel siga siendo más importante que el de los ojos (Bob Marley)',
	'Aprende a vivir y sabrás morir bien (Confucio)',
	'Cada día sabemos más y entendemos menos (Albert Einstein)',
	'El mundo no está en peligro por las malas personas sino por aquellas que permiten la maldad (Albert Einstein)',
	'La medida del amor es amar sin medida (San Agustín)',
	'No hay nada que un hombre no sea capaz de hacer cuando una mujer le mira (Casanova)',
	'Dar el ejemplo no es la principal manera de influir sobre los demás; es la única manera. (Albert Einstein)',
	'El dinero no puede comprar la vida (Bob Marley)',
	'Si es bueno vivir, todavía es mejor soñar, y lo mejor de todo, despertar (Antonio Machado)',
	'La mayor declaración de amor es la que no se hace; el hombre que siente mucho, habla poco (Platón)',
	'Si das pescado a un hombre hambriento lo nutres durante una jornada. Si le enseñas a pescar, le nutrirás toda su vida (Lao Tsé)',
	'Vale más actuar exponiéndose a arrepentirse de ello, que arrepentirse de no haber hecho nada (Giovanni Boccaccio)',
	'Ningún hombre es lo bastante bueno para gobernar a otros sin su consentimiento. (Abraham Lincoln)',
	'Todo lo que se come sin necesidad se roba al estómago de los pobres (Mahatma Gandhi)',
	'Vivir sola es como estar en una fiesta donde nadie te hace caso (Marilyn Monroe)',
	'El cuerpo humano es el carruaje; el yo, el hombre que lo conduce; el pensamiento son las riendas, y los sentimientos, los caballos (Platón)',
	'Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida (Arthur Schnitzler)',
	'No estoy tan enamorado de mis propias opiniones que ignore lo que los demás puedan pensar acerca de ellas (Copérnico)',
	'La más estricta justicia no creo que sea siempre la mejor política (Abraham Lincoln)',
	'El sabio no dice nunca todo lo que piensa, pero siempre piensa todo lo que dice (Aristóteles)',
	'Hay dos cosas que son infinitas: el universo y la estupidez humana; de la primera no estoy muy seguro (Albert Einstein)',
	'El nacimiento y la muerte no son dos estados distintos, sino dos aspectos del mismo estado (Mahatma Gandhi)',
	'Lo que importa verdaderamente en la vida no son los objetivos que nos marcamos, sino los caminos que seguimos para lograrlo (Peter Bamm)',
	'El mundo es bello, pero tiene un defecto llamado hombre (Friedrich Nietzsche)',
	'La pereza viaja tan despacio que la pobreza no tarda en alcanzarla (Benjamin Franklin)',
];

/**
 * Obtiene una frase aleatoriamente del vector
 */
function getRandomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = {
	getRandomQuote,
};
