Blockly.Blocks['blank'] = {
	init: function() {
		this.appendValueInput("Subject")
			.setCheck(["Iri", "PrefixedIri"])
			.appendField("Subjekt: ");
		this.appendValueInput("Predicate")
			.setCheck(["Iri", "PrefixedIri"])
			.appendField("Predikát: ");
		this.appendStatementInput("Blank")
			.setCheck(["Predicate"])
			.appendField("Vnitřní predikáty: ");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Blank");
		this.setNextStatement(true, "Blank");
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['blank'] = function(block, generator) {
	var subject = generator.valueToCode(block, 'Subject', javascript.Order.ATOMIC);
	var predicate = generator.valueToCode(block, 'Predicate', javascript.Order.ATOMIC);
	var content = generator.statementToCode(block, 'Blank');

	const blank = {subject: subject.slice(1, -1), predicate: predicate.slice(1, -1), content: content}

	return JSON.stringify(blank) + '!';
};
