(function main() {
	var engToAl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var alToEng = 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW';

	function isLetter(str) {
	  return str.length === 1 && str.match(/[a-z]/i);
	}

	var vm = new Vue({
		el: '#app',
		data: {
			input: '',
		    output: ''
		}
	});

	vm.$watch('input', function(newVal) {
		var newOutput = '';
		for (var i = 0, len = newVal.length; i < len; i++) {
			if (isLetter(newVal[i])) {
				newOutput += alToEng[engToAl.indexOf(newVal[i])];
			} else {
				newOutput += newVal[i];
			}
		}
		this.output = newOutput;
	});
})();