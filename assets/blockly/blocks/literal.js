Blockly.Blocks['literal'] = {
	init: function() {
		this.appendEndRowInput()
			.appendField("Literál: ")
			.appendField(new Blockly.FieldTextInput("\" \""), "literal");
		this.setOutput(true, "Literal");
		this.setColour(270);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};


javascript.javascriptGenerator.forBlock['literal'] = function(block, generator) {
	return [`${block.getFieldValue('literal')}`, javascript.Order.NONE];
};
