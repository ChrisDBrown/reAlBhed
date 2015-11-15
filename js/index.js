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

	function translate() {
		var input = vm.input;
		var output = '';
		var pauseTranslation = false;
		var fromAlpha = getFromAlphabet();
		var toAlpha = getToAlphabet();

		for (var i = 0, len = input.length; i < len; i++) {
			if (input[i] == '[') {
				pauseTranslation = true;
			} else if (input[i] == ']') {
				pauseTranslation = false;
			} else if (isLetter(input[i]) && !pauseTranslation) {
				output += toAlpha[fromAlpha.indexOf(input[i])];
			} else {
				output += input[i];
			}
		}

		vm.output = output;
	}

	vm.$watch('input', function() {
		translate();
	});

	vm.$watch('translationType', function(newVal) {
		translate();
	});
})();