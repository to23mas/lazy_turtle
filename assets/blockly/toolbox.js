export const toolbox = {
	"kind": "categoryToolbox",
	"contents": [
		{
			"kind": "category",
			"name": "Anotace",
			"colour": "30",
			"contents": [
				{
					"kind": "block",
					"type": "prefix"
				},
				{
					"kind": "block",
					"type": "annotations"
				},
			]
		},
		{
			"kind": "category",
			"name": "IRI",
			"categorystyle": "logic_category",
			"contents": [
				{
					"kind": "block",
					"type": "iri"
				},
				{
					"kind": "block",
					"type": "literal"
				},
				{
					"kind": "block",
					"type": "prefixedIri"
				},
			]
		},
		{
			"kind": "category",
			"name": "Turtle",
			"colour": "120",
			"contents": [
				{
					"kind": "block",
					"type": "blank"
				},
				{
					"kind": "block",
					"type": "subject"
				},
				{
					"kind": "block",
					"type": "predicate"
				},
				{
					"kind": "block",
					"type": "object"
				}
			]
		}
	]
}
