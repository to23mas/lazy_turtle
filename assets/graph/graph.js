import { withBase } from '../utils/toBase.js'

export const runGraph = (turtles, blanks, base) => {
	const nodeLabels = new Map;
	const edges = [];

	// building from normal turtle triplets
	if (turtles[0] !== '') {
		for (let i = 0; i < turtles.length; i++) {
			const turtle = JSON.parse(turtles[i]);
			nodeLabels.set(turtle['subject'], turtle['subject']); // adding subjects

			const predicates = turtle['predicates'];
			for (let j = 0; j < predicates.length; j++) {
				const predicate = JSON.parse(predicates[j]);

				const objects = predicate['objects'];
				for (let k = 0; k < objects.length; k++) {
					const object = objects[k];
					nodeLabels.set(object, object); // adding objects

				edges.push({ // adding edges
						from: turtle['subject'],
						to: object,
						label: withBase(predicate['predicate'], base),
						arrows: 'to',
						length: 200
					});
				}
			}
	}}
	// building from blank nodes
		for (let i = 0; i < blanks.length; i++) {
			const blank = JSON.parse(blanks[i]);
			nodeLabels.set(blank['subject'], blank['subject']); // adding subjects

			const blankContent = blank['content'].replace(/}{/gi, '}!{').split('!');
			for (let j = 0; j < blankContent.length; j++) {
				const content = JSON.parse(blankContent[j]);
				const innerPredicate = content['predicate'];
				const blankNodeId = `${i}`;

				edges.push({ // adding edges between blank and normal
					from: blank['subject'],
					to: blankNodeId,
					label: withBase(blank['predicate'], base),
					arrows: 'to',
					length: 200
				});

				nodeLabels.set(blankNodeId, ''); // adding blank node itself

				const objects = content['objects'];
				for (let k = 0; k < objects.length; k++) {
					const object = objects[k];
					nodeLabels.set(object, object); // adding objects
					edges.push({ // adding edges between blank its content
						from: blankNodeId,
						to: object,
						label: withBase(innerPredicate, base),
						arrows: 'to',
						length: 200
					});
				}
			}
		}

	const graphNodes = [];
	for (let [k, v] of nodeLabels) {
		if (v.startsWith('"')) {
			graphNodes.push({ id: k, label: withBase(v, base), shape: 'box' });
		} else {
			graphNodes.push({ id: k, label: withBase(v, base) });
		}
	}

	const uniqueEdges = new Map();
	edges.forEach(element => {
		uniqueEdges.set(`${element['from']}-${element['to']}`, element);
	});

	const finalEdges = [];
	for (let [k, v] of uniqueEdges) {
		if ( v['label'] === 'rdf: Type') {
			v['label'] = 'a';
		}
		finalEdges.push( v );
	}

	if (checkError(finalEdges, graphNodes)) {
		document.getElementById('graph').innerHTML = '';
		document.getElementById('graph').innerHTML = '<div class="error"><li>Nemůžeš použít predikát na pozici objektu a subjektu. (obráceně to platí taky)</li></div>'

	} else {
		document.getElementById('graph').innerHTML = '';
		new vis.Network(
			document.getElementById('graph'),
			{ nodes: graphNodes, edges: finalEdges },
			{},
		);
	}
}

const checkError = (edges, nodes) => {
	const edgeLabels = [];
	edges.forEach(edge => {
		edgeLabels.push(edge['label']);
	});

	const nodesLabels = [];
	nodes.forEach(node => {
		nodesLabels.push(node['label']);
	});

	for (let i = 0; i < nodesLabels.length; i++) {
		const element = nodesLabels[i];
		if (edgeLabels.includes(element)) {
			return true;
		}
	}

	return false;
}
