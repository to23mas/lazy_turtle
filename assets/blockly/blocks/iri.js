Blockly.Blocks['iri'] = {
	init: function() {
		this.appendEndRowInput()
			.appendField("IRI: ")
			.appendField(new Blockly.FieldTextInput("<http:// >"), "iri");
		this.setOutput(true, "Iri");
		this.setColour(230);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['iri'] = function(block, generator) {
	const iri = `${block.getFieldValue('iri')}`;

	return [iri, javascript.Order.NONE];
};
