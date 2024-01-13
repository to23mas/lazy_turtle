const blockName = 'annotations';

Blockly.Blocks[blockName] = {
	init: function() {
		this.appendValueInput("Iri")
			.setCheck("Iri")
			.appendField("Base :");
		this.appendStatementInput("Prefixes")
			.setCheck("Prefix")
			.appendField("Prefixy :");
		this.setOutput(true, "annotations");
		this.setColour(0);
		this.setTooltip("anotace");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock[blockName] = function(block, generator) {
	var base = generator.valueToCode(block, 'Iri', javascript.Order.ATOMIC);
	var prefixes = generator.statementToCode(block, 'Prefixes');

	return [JSON.stringify({base: base, prefixes: prefixes}), javascript.Order.NONE];
};
