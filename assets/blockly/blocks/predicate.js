Blockly.Blocks['predicate'] = {
	init: function() {
		this.appendValueInput("Iri")
			.setCheck(["Iri", "PrefixedIri"])
			.appendField("Iri predikátu: ");
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

	const object_iris = objects_iri.split('!').slice(0, -1).map((item) => {return item.trim()});
	const predicate = {predicate: predicate_iri.slice(1, -1), objects: object_iris};

	return JSON.stringify(predicate);
};
