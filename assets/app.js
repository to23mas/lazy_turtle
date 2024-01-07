import './blockly/blocks/exports.js';

import { toolbox } from './blockly/toolbox.js';
import { init } from './utils/initialState.js';

export const workspace = Blockly.inject('blocklyDiv', {
	toolbox: toolbox,
	grid: {
		spacing: 20,
		length: 3,
		colour: '#ccc',
		snap: true
	},
});

init(workspace);

const supportedEvents = new Set([
	Blockly.Events.BLOCK_CHANGE,
	Blockly.Events.BLOCK_CREATE,
	Blockly.Events.BLOCK_DELETE,
	Blockly.Events.BLOCK_MOVE,
]);

const updateCode = (event) => {
	if (workspace.isDragging() || !supportedEvents.has(event.type)) return;

	document.getElementById('bl').innerHTML += Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById('bl').innerHTML = '';
}

workspace.addChangeListener(updateCode);

