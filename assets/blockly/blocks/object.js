Blockly.Blocks['object'] = {
	init: function() {
		this.appendValueInput("Iri")
			.setCheck(["Iri", "PrefixedIri", "Literal"])
			.appendField("OBJEKT           Iri:");
		this.setInputsInline(true);
		this.setPreviousStatement(true, ["Object", 'Blank']);
		this.setNextStatement(true, ["Object", 'Blank']);
		this.setColour(120);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['object'] = function(block, generator) {
	const code =  generator.valueToCode(block, 'Iri', javascript.Order.MEMBER);
	const object = code.slice(1,-1);

	return object;
};
