Blockly.Blocks['subject'] = {
	init: function() {
		this.appendValueInput("Iri")
			.setCheck(["Iri", "PrefixedIri"])
			.appendField("Iri subjektu: ");
		this.appendStatementInput("Predicate")
			.setCheck("Predicate")
			.appendField("Predikáty:");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Subject");
		this.setNextStatement(true, "Subject");
		this.setColour(0);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['subject'] = function(block, generator) {
	const subject_iri = generator.valueToCode(block, 'Iri', javascript.Order.ATOMIC);
	const predicates = generator.statementToCode(block, 'Predicate');

	const parserPredicates = predicates.replace(/}{/gi, '}!{').split('!').map((item) => {return item.trim()});
	const subject = {subject: subject_iri.slice(1, -1), predicates: parserPredicates};

	return JSON.stringify(subject);
};
