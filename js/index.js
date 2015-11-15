(function main() {
	var engToAl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var alToEng = 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW';

	var vm = new Vue({
		el: '#app',
		data: {
			input: '',
		    output: ''
		}
	});

	function isLetter(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	}

	function getFromAlphabet() {
		return engToAl;
	}

	function getToAlphabet() {
		return alToEng;
	}

	vm.$watch('input', function(newVal) {
		var newOutput = '';
		var pauseTranslation = false;
		var fromAlpha = getFromAlphabet();
		var toAlpha = getToAlphabet();
		for (var i = 0, len = newVal.length; i < len; i++) {
			if (newVal[i] == '[') {
				pauseTranslation = true;
			} else if (newVal[i] == ']') {
				pauseTranslation = false;
			} else if (isLetter(newVal[i]) && !pauseTranslation) {
				newOutput += toAlpha[fromAlpha.indexOf(newVal[i])];
			} else {
				newOutput += newVal[i];
			}
		}
		this.output = newOutput;
	});
})();