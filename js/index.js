(function main() {
	var engToAl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var alToEng = 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW';

	var vm = new Vue({
		el: '#app',
		data: {
			input: '',
		    output: '',
		    primers: [],
		    translationType: 'altoeng',
		},
		methods: {
			primerClicked: function(i) {
				// change obtained from true to false or vice versa
				vm.primers[i].obtained = !vm.primers[i].obtained;
				translateAll();
			}
		},
		created: function() {
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
	});

	function isLetter(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	}

	function getFromAlphabet() {
		if (vm.translationType == 'engtoal') {
			return engToAl;
		} else {
			return alToEng;
		}
	}

	function getToAlphabet() {
		if (vm.translationType == 'engtoal') {
			return alToEng;
		} else {
			return engToAl;
		}
	}

	function translateAll() {
		var input = vm.input;
		var output = '';
		var pauseTranslation = false;

		for (var i = 0, len = input.length; i < len; i++) {
			// if square bracket we don't want to output
			// just change the translation switch
			if (input[i] == '[') {
				pauseTranslation = true;
			} else if (input[i] == ']') {
				pauseTranslation = false;
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
			return toAlpha[fromAlpha.indexOf(letter)];
		}
	}

	vm.$watch('input', function() {
		translateAll();
	});

	vm.$watch('translationType', function() {
		translateAll();
	});
})();