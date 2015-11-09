new Vue({
	el: '#app',
	data: {
		input: '',
	    output: '',
	    newOutput: '',
	    engToAl: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	    alToEng: 'ypltavkrezgmshubxncdijfqowYPLTAVKREZGMSHUBXNCDIJFXOW'
	},
	methods: {
		translate: function() {
			this.newOutput = '';
			for (var i = 0, len = this.input.length; i < len; i++) {
				this.newOutput += this.alToEng[this.engToAl.indexOf(this.input[i])];
			}
			this.output = this.newOutput;
		}
	}
});