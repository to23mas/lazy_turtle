import { codeToString } from './toString.js';
import { toBase } from './toBase.js';

export const buildBase = (iri) => {
	document.getElementById('base') === null ? addDivToTurtle('base') : clearDiv('base');
	document.getElementById('base').innerHTML += `<strong>@base</strong> ${toPrintable(codeToString(iri))} <strong>.</strong>`;
}

const buildError = (message) => {
	document.getElementById('prefixE') === null ? addDivToError('prefixE') : clearDiv('PrefixE');
	document.getElementById('prefixE').innerHTML = '';
	document.getElementById('prefixE').innerHTML += message;
}

export const buildPrefixes = (prefixes) => {
	document.getElementById('prefixes') === null ? addDivToTurtle('prefixes') : clearDiv('prefixes');
	const map = new Map();
	const splittedPrefixes = prefixes.split('!').slice(0, -1);
	let error = '';
	splittedPrefixes.forEach(prefix => {
		const prefixArr = prefix.split('-');

		if (map.has(prefixArr[0].trim())) {
			error = 'Opakující se název prefixu:<strong> ' + prefixArr[0].trim() + '</strong>';
		}

		map.set(prefixArr[0].trim(), toPrintable(codeToString(prefixArr[1])));
	});

	error !== '' ? buildError(error) : clearDiv('prefixE');

	localStorage.setItem('prefix', 'ahoj');

	let i = 0;
	for (let [k, v] of map) {
		localStorage.setItem(`${i}-prefix`, `${k}`); i ++;
		document.getElementById('prefixes').innerHTML += `<strong>@prefix</strong> <span class="prefixValue">${k}</span>:  ${v} <strong>.</strong><br>`;
	}
	localStorage.setItem('noPrefixes', `${i}`);
}

export const buildBlank = (blanks, base) => {
	document.getElementById('blanks') === null ? addTable('blanks') : clearDiv('blanks');
	let tableContent = '';

	for (let i = 0; i < blanks.length; i++) {
		const blank = JSON.parse(blanks[i]);
		tableContent += `<tr><td class="subject">${toPrintable(toBase(blank['subject']))}</td>`; // 1. col
		const pred = (blank['predicate'] === 'rdf: Type') ? 'a' : toBase(blank['predicate']);
		tableContent += `<td class="predicate">${toPrintable(pred)}</td>`; // 2. col

		const blankContent = blank['content'].replace(/}{/gi, '}!{').split('!');
		for (let  j = 0;  j < blankContent.length;  j++) {
			const content = JSON.parse(blankContent[j]);

			if (j !== 0) {
				tableContent += `<tr><td></td><td></td>`; // 1. and 2. col
			}

			if (j === 0) {
				tableContent += `<td>[</td>`; // 3. col
			} else {
				tableContent += `<td></td>`; // 3. col
			}

			const innerPred = (content['predicate'] === 'rdf: Type') ? 'a' : toBase(content['predicate']);
			tableContent += `<td class="predicate">${toPrintable(innerPred)}</td>`; // 4. col

			const objects = content['objects'];
			for (let k = 0; k < objects.length; k++) {
				if (k !== 0) {
					tableContent += `<tr> <td></td> <td></td> <td></td> <td></td>`; // 1., 2., 3. and 4, col
				}
				tableContent += `<td class="object">${toPrintable(toBase(objects[k]))}</td>`; // 5. col
				if (k + 1 === objects.length) {
					tableContent += `<td>${ j+1 === blankContent.length ? '] .' : ';'}</td>`; // 6. col
				} else {
					tableContent += `<td>,</td>`; // 6. col
				}
				tableContent += '</tr>';
			}
		}
	}
	addToTab(tableContent, 'blanks');
}

export const buildTurtle = (turtles, base) => {
	document.getElementById('tab') === null ? addTable() : clearDiv('tab');
	let sub = ''

	for (let k = 0; k < turtles.length; k++) {
		const parsedTurtle = JSON.parse(turtles[k]);
		const subject = parsedTurtle['subject'];

		sub += `<tr><td class="subject">${toPrintable(toBase(subject, base))}</td>`;

		const iMax = parsedTurtle['predicates'].length;
		for (let i = 0; i < iMax; i++) {
			const parsedPredicate = JSON.parse(parsedTurtle['predicates'][i]);

			const pred = (parsedPredicate['predicate'] === 'rdf: Type') ? 'a' : toBase(parsedPredicate['predicate']);
			if (i === 0) {
				sub += `<td class="predicate">${toPrintable(pred)}</td>`;
			} else {
				sub += `<tr> <td></td> <td class="predicate">${toPrintable(pred)}</td>`;
			}

			const jMax = parsedPredicate['objects'].length;
			for (let j = 0; j < jMax; j++) {
				const objects = parsedPredicate['objects'];

				if (j === 0) {
					sub += `<td class="object">${toPrintable(toBase(objects[j]))}</td>`;
				} else {
					sub += `<tr> <td></td> <td></td> <td class="object">${toPrintable(toBase(objects[j]))}</td>`;
				}
				sub += `<td>${getEnding(i ,j, iMax, jMax)}</td>`;
				sub += '</tr>'; 
			}
		}
	}

	addToTab(sub);
}

const getEnding = (i ,j, iMax, jMax) => {
	if (j === (jMax - 1) && i === (iMax - 1)) {
		return '.';
	} else if (j === (jMax - 1)) {
		return ';';
	}
	return ',';
}

const addToTab = (sub, id = 'tab') => {
	document.getElementById(id).innerHTML += sub;
}

export const clearPrefixes = () => {
	document.getElementById('turtle').innerHTML = '';
}

const toPrintable = (str) => {
	if (typeof str === 'string') {
		str = str.replaceAll('<', '&lt');

		return str.replaceAll('>', '&gt');
	}
	return '';
}

const addTable = (id = 'tab') => {
	document.getElementById('turtle').innerHTML += `<table id="${id}"></table>`;
}

const addDivToTurtle = (divName) => {
	document.getElementById('turtle').innerHTML += `<div id="${divName}"></div>`;
}

const addDivToError = (divName) => {
	document.getElementById('error').innerHTML += `<div id="${divName}"></div>`;
}

const removeDiv = (divName) => {
	document.getElementById(divName).remove();
}

export const clearDiv = (divName) => {
	try {
		document.getElementById(divName).innerHTML = '';
	} catch {}
} 
