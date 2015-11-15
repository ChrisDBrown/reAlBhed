(function main() {
	var engToAl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var alToEng = 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW';

	var vm = new Vue({
		el: '#app',
		data: {
			input: '',
		    output: '',
		    translationType: 'engtoal'
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

		if (pauseTranslation) {
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