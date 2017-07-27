'use strict'

class Letter {
	constructor(char) {
		this.char = char;
		this.followers = {};
		this.total = 0;
	}

	getChar() {
		return this.char;
	}

	incFollowers(char) {
		if (this.followers[char] == undefined) {
			this.followers[char] = 1;
		} else {
			this.followers[char]++;
		}
		this.total++;
	}

	randFollowers() {
		let selector = Math.floor(Math.random() * this.total);

		for (var c in this.followers){
			if (selector < this.followers[c])
				return c;
			else
				selector -= this.followers[c];
		}
	}
}

class Generator {
	constructor(dictionaryFile) {
		let dictionary = new XMLHttpRequest();
		let _this = this;
		let output = "";

		this.loaded = false;

		dictionary.open("GET", dictionaryFile, true);
		dictionary.overrideMimeType('text/txt; charset=iso-8859-1');
		dictionary.onreadystatechange = function() {
			if (dictionary.readyState == 4) {
				_this.simpleletters = {};
				_this.doubleletters = {};
				_this.simpletotal = 0;
				output = "\n" + dictionary.responseText;

				for (let i = 1; i < output.length; i++) {
					if (output[i] != '\n') {
						let char = (output[i - 1] != "\n" ? (output[i - 1] + output[i]) : (output[i]));
						if (char.length == 1) {
							if (_this.simpleletters[char] == undefined)
								_this.simpleletters[char] = {
									letter: new Letter(char),
									amount: 0
								};
							_this.simpleletters[char].amount++;
							if (i + 1 < output.length) {
								let next = output[i + 1];
								_this.simpleletters[char].letter.incFollowers(next);
							}
							_this.simpletotal++;
						} else {
							if (_this.doubleletters[char] == undefined)
								_this.doubleletters[char] = new Letter(char)
							if (i + 1 < output.length) {
								let next = output[i + 1];
								_this.doubleletters[char].incFollowers(next);
							}
						}
					}
				}
				console.log("loaded");
				_this.loaded = true;
			}
		} 
		dictionary.send();
	}

	generate() {
		if (this.loaded) {
			let selector = Math.floor(Math.random() * this.simpletotal);
			let word = "";
			let firstLetter;
			let letter;

			for (let c in this.simpleletters){
				if (selector < this.simpleletters[c].amount) {
					firstLetter = this.simpleletters[c].letter;
					break;
				}
				else
					selector -= this.simpleletters[c].amount;
			}

			word += firstLetter.getChar() + firstLetter.randFollowers();
			letter = this.doubleletters[word];
			while (word.slice(-1) != '\n') {
				if (this.doubleletters[word.slice(-2)] == undefined)
					return this.generate();
				letter = this.doubleletters[word.slice(-2)];
				word += letter.randFollowers();
			}
			return word;
		}
		return "Not loaded"
	}
}

let genEN = new Generator("rsrc/dicoEN.txt");
let genFR = new Generator("rsrc/dicoFR.txt")

function generateWord() {
	let resultEN = "english:</br>",
		resultFR = "français:</br>";

	for (let i = 0; i < 10; i++) {
		resultEN += genEN.generate() + "</br>";
		resultFR += genFR.generate() + "</br>";
	}
	document.getElementById('en').innerHTML = resultEN + "</br>";
	document.getElementById('fr').innerHTML = resultFR + "</br>";
}