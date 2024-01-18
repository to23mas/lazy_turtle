Blockly.Blocks['blank'] = {
	init: function() {
		this.appendStatementInput("Blank")
			.setCheck(["Predicate"])
			.appendField("BLANK NODE");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Blank");
		this.setNextStatement(true, "Blank");
		this.setColour('gray');
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['blank'] = function(block, generator) {
	var subject = generator.valueToCode(block, 'Subject', javascript.Order.ATOMIC);
	var predicate = generator.valueToCode(block, 'Predicate', javascript.Order.ATOMIC);
	var content = generator.statementToCode(block, 'Blank');

	const blank = {blank: {subject: subject.slice(1, -1), predicate: predicate.slice(1, -1), content: content}}

	return JSON.stringify(blank);
};
