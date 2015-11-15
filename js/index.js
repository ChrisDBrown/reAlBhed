(function main() {
	var engToAl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var alToEng = 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW';

	var vm = new Vue({
		el: '#app',
		data: {
			input: '',
		    output: '',
		    primers: [],
		    showPrimers: true,
		    translationType: 'altoeng',
		},
		methods: {
			primerClicked: function(i) {
				// change obtained from true to false or vice versa
				vm.primers[i].obtained = !vm.primers[i].obtained;
				localStorage.setItem('primers', JSON.stringify(vm.primers));
				translateAll();
			}
		},
		created: function() {
			var localPrimers = localStorage.getItem('primers');
			if (localPrimers !== null) {
				this.primers = JSON.parse(localPrimers);
			} else {
				// avoiding an external ajax suite for just one call
				var request = new XMLHttpRequest();
				request.open('GET', '/js/primers.json', true);

				request.onload = function() {
			  		if (request.status >= 200 && request.status < 400) {
				    	vm.primers = JSON.parse(request.responseText);
					}
				};

				request.send();
			}
		}
	});

	function isLetter(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	}

	function getToAlphabet() {
		if (vm.translationType == 'altoeng') {
			return engToAl;
		} else {
			return alToEng;
		}
	}

	function getFromAlphabet() {
		if (vm.translationType == 'altoeng') {
			return alToEng;
		} else {
			return engToAl;
		}
	}

	function hasPrimer(letter) {
		var index = engToAl.indexOf(letter.toLowerCase());

		return vm.primers[index].obtained;
	}

	function translateAll() {
		var input = vm.input;
		var output = '';
		var pauseTranslation = false;

		for (var i = 0, len = input.length; i < len; i++) {
			// if square bracket we don't want to output
			// just change the translation switch
			if (input[i] == '[') {
				if (!pauseTranslation) {
					pauseTranslation = true;
					output += '<span class="pause">';
				}
			} else if (input[i] == ']') {
				if (pauseTranslation) {
					pauseTranslation = false;
					output += '</span>';
				}
			} else {
				output += translateLetter(input[i], pauseTranslation);
			}
		}

		vm.output = output;
	}

	function translateLetter(letter, pauseTranslation) {
		var fromAlpha = getFromAlphabet();
		var toAlpha = getToAlphabet();

		if (pauseTranslation || !isLetter(letter)) {
			return letter;
		} else {
			if (vm.translationType == 'altoeng' && hasPrimer(letter)) {
				return '<span class="obtained">' + letter + '</span>';
			}
			return toAlpha[fromAlpha.indexOf(letter)];
		}
	}

	vm.$watch('input', function() {
		translateAll();
	});

	vm.$watch('translationType', function(newVal) {
		if (newVal == 'engtoal') {
			vm.showPrimers = false;
		} else {
			vm.showPrimers = true;
		}
		translateAll();
	});
})();