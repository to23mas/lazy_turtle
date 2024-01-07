Blockly.Blocks['prefixedIri'] = {
	init: function() {
		this.appendEndRowInput()
			.appendField("Název prefixu:")
			.appendField(new Blockly.FieldDropdown(this.generateOptions), "options")
			.appendField("    ")
			.appendField("Hodnota prefixu:")
			.appendField(new Blockly.FieldTextInput("default"), "NAME");
		this.setOutput(true, "PrefixedIri");
		this.setColour(290);
		this.setTooltip("");
		this.setHelpUrl("");
	},

	generateOptions: function() {
		var options = [['','']];
		const prefixedElement = document.getElementsByClassName('prefixValue');
		if (prefixedElement.lenght !== 0) {
			const noPrefix = localStorage.getItem('noPrefixes');
			const parsedOptions = [];
			for (let i = 0; i < noPrefix ; i++) {
				const val = localStorage.getItem(`${i}-prefix`);
				parsedOptions.push([val, val]);
			}
			return parsedOptions;
		}

		return options;
	}
};

javascript.javascriptGenerator.forBlock['prefixedIri'] = function(block, generator) {
	var dropdown_options = block.getFieldValue('options');
	var text_name = block.getFieldValue('NAME');

	const code = `${dropdown_options}: ${text_name}`;

	return [code, javascript.Order.NONE];
};
