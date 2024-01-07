Blockly.Blocks['triplet'] = {
	init: function() {
		this.appendValueInput("Subjekt")
			.setCheck("String")
			.appendField("Subjekt:");
		this.appendValueInput("Predikate")
			.setCheck("String")
			.appendField("Predikát:");
		this.appendValueInput("Object")
			.setCheck("String")
			.appendField("Objekt:");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(30);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

javascript.javascriptGenerator.forBlock['triplet'] = function(block, generator) {
	var value_subjekt = generator.valueToCode(block, 'Subjekt', javascript.Order.ATOMIC);
	var value_predikate = generator.valueToCode(block, 'Predikate', javascript.Order.ATOMIC);
	var value_object = generator.valueToCode(block, 'Object', javascript.Order.ATOMIC);

	var code = '...\n';
	return code;
};
