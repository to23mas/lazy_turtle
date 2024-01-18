import { buildTurtle, buildBlank, buildBase, buildPrefixes, clearDiv } from '../../utils/turtle.js';
import { runGraph } from '../../graph/graph.js';

Blockly.Blocks['app'] = {
	init: function() {
		this.appendValueInput("Anotace")
			.setCheck("annotations")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Prefixy a Base: ");
		this.appendStatementInput("Turtles")
			.setCheck(["Subject", "Blank"])
			.appendField("Turtle:");
		this.setInputsInline(false);
		this.setColour('#444444');
		this.setTooltip("Application block");
		this.setHelpUrl("");
		this.setDeletable(false);
	}
};

javascript.javascriptGenerator.forBlock['app'] = function(block, generator) {
	const annotations = generator.valueToCode(block, 'Anotace', javascript.Order.ATOMIC);
	const turtles = generator.statementToCode(block, 'Turtles');
	const blanks = generator.statementToCode(block, 'Blanks');

	let base = '';
	let prefixes = '';
	try {
		base = JSON.parse(annotations.slice(1, -1))['base'];
	} catch {
		base = '';
	}

	try {
		prefixes = JSON.parse(annotations.slice(1, -1))['prefixes'];
	} catch {
		prefixes = '';
	}

	base === '' ? clearDiv('base') : buildBase(base);
	if (prefixes === '') {
		clearDiv('prefixes');
	} else {
		buildPrefixes(prefixes);
	}

	if (turtles !== '') {
		buildTurtle(
			turtles.replace(/}{/gi, '}!{').split('!').map((item) => {return item.trim()}),
			base,
		);
	} else {
		document.getElementById('tab').innerHTML = '';
	}

	if (blanks !== '') {
		buildBlank(
			blanks.split('!').slice(0, -1),
			base,
		);
	} else {
		document.getElementById('blanks').innerHTML = '';
	}

	if (turtles === '' && blanks === '') {
		document.getElementById('graph').innerHTML = '';
	}  else {
		runGraph(
			turtles.replace(/}{/gi, '}!{').split('!').map((item) => {return item.trim()}),
			blanks.split('!').slice(0, -1),
			base,
		);
	}



	return '';
};
