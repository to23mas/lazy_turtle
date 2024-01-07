Blockly.Blocks['prefix'] = {
	init: function() {
		this.appendEndRowInput()
			.appendField("Název prefixu:  ")
			.appendField(new Blockly.FieldTextInput("default"), "Name");
		this.appendValueInput("Prefix")
			.setCheck("Iri")
			.appendField("Iri prefixu: ");
		this.setInputsInline(true);
		this.setPreviousStatement(true, "Prefix");
		this.setNextStatement(true, "Prefix");
		this.setColour(30);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['prefix'] = function(block, generator) {
	var name = block.getFieldValue('Name');
	var iri = generator.valueToCode(block, 'Prefix', javascript.Order.ATOMIC);

	if (iri === '' || name === '')  return '';

	return `${name}-${iri}!`;
};
