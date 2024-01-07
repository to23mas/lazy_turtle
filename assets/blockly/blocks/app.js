import { buildTurtle, buildBlank, buildBase, buildPrefixes, clearDiv } from '../../utils/turtle.js';
import { runGraph } from '../../graph/graph.js';

Blockly.Blocks['app'] = {
	init: function() {
		this.appendValueInput("Anotace")
			.setCheck("annotations")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Prefixy a Base: ");
		this.appendStatementInput("Turtles")
			.setCheck("Subject")
			.appendField("Turtle:");
		this.appendStatementInput("Blanks")
			.setCheck("Blank")
			.appendField("Blank nodes:");
		this.setInputsInline(false);
		this.setColour('gray');
		this.setTooltip("Application block");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['app'] = function(block, generator) {
	const annotations = generator.valueToCode(block, 'Anotace', javascript.Order.ATOMIC);
	const turtles = generator.statementToCode(block, 'Turtles');
	const blanks = generator.statementToCode(block, 'Blanks');

	const base = JSON.parse(annotations.slice(1, -1))['base'];
	const prefixes = JSON.parse(annotations.slice(1, -1))['prefixes'];

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
	}

	if (blanks !== '') {
		buildBlank(
			blanks.split('!').slice(0, -1),
			base,
		);
	}

	runGraph(
		turtles.replace(/}{/gi, '}!{').split('!').map((item) => {return item.trim()}),
		blanks.split('!').slice(0, -1),
		base,
	);

	return '';
};
