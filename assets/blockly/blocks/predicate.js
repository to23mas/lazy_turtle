Blockly.Blocks['predicate'] = {
	init: function() {
		this.appendValueInput("Iri")
			.setCheck(["Iri", "PrefixedIri"])
			.appendField("PREDIKÁT           Iri:");
		this.appendStatementInput("Object")
			.setCheck(["Object", 'Blank'])
			.appendField("Objekty:");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Predicate");
		this.setNextStatement(true, "Predicate");
		this.setColour(30);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['predicate'] = function(block, generator) {
	const predicate_iri = generator.valueToCode(block, 'Iri', javascript.Order.ATOMIC);
	const objects_iri = generator.statementToCode(block, 'Object');

	const objects_and_blanks = objects_iri.replace(/}{/gi, '}!{').split('!').map((item) => {return item.trim()});
	// console.log(objects_and_blanks);

	const predicate = {predicate: predicate_iri.slice(1, -1), objects: objects_and_blanks};

	return JSON.stringify(predicate);
};
