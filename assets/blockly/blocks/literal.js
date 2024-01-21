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
	const literal = '{literal:'+ block.getFieldValue('literal')+'}';

	return [literal, javascript.Order.NONE];
};
