export const init = (workspace) => {

	const appBlock = workspace.newBlock('app');
	//Annotation setup
	const annotationBlock = workspace.newBlock('annotations'); connect(appBlock, 'Anotace', annotationBlock);
	const baseIri = workspace.newBlock('iri');  setValue(baseIri, 'iri', '<http://example.org/> '); connect(annotationBlock, 'Iri', baseIri);
	const annotationPrefix = workspace.newBlock('prefix'); setValue(annotationPrefix, 'Name', 'foaf'); connectStatement(annotationBlock, 'Prefixes', annotationPrefix);
	const prefixIri = workspace.newBlock('iri'); setValue(prefixIri, 'iri', '<http://xmlns.com/foaf/0.1/>'); connect(annotationPrefix, 'Prefix', prefixIri);
	const annotationPrefix2 = workspace.newBlock('prefix'); setValue(annotationPrefix2, 'Name', 'rdf'); connectStatement(annotationBlock, 'Prefixes', annotationPrefix2);
	const prefixIri2 = workspace.newBlock('iri'); setValue(prefixIri2, 'iri', '<http://www.w3.org/1999/02/22-rdf-syntax-ns#>'); connect(annotationPrefix2, 'Prefix', prefixIri2);
	const annotationPrefix3 = workspace.newBlock('prefix'); setValue(annotationPrefix3, 'Name', 'rel'); connectStatement(annotationBlock, 'Prefixes', annotationPrefix3);
	const prefixIri3 = workspace.newBlock('iri'); setValue(prefixIri3, 'iri', '<http://www.perceive.net/schemas/relationship/>'); connect(annotationPrefix3, 'Prefix', prefixIri3);
	//turtle
	const subject = workspace.newBlock('subject'); connectStatement(appBlock, 'Turtles', subject);
	const subjectIri = workspace.newBlock('iri'); setValue(subjectIri, 'iri', '<#green-goblin>'); connect(subject, 'Iri', subjectIri);
	const predicate3 = workspace.newBlock('predicate'); connectStatement(subject, 'Predicate', predicate3);
	const predicate3PrefixedIri = workspace.newBlock('prefixedIri'); setValue(predicate3PrefixedIri, 'options', 'foaf'); setValue(predicate3PrefixedIri, 'NAME', 'name'); connect(predicate3, 'Iri', predicate3PrefixedIri);
	const turtleLiteralObject = workspace.newBlock('object'); connectStatement(predicate3, 'Object', turtleLiteralObject);
	const turtleLiteralObject2 = workspace.newBlock('object'); connectStatement(predicate3, 'Object', turtleLiteralObject2);
	const turtleObject1literalEn = workspace.newBlock('literal'); setValue(turtleObject1literalEn, 'literal', '"Green Goblin"@en'); connect(turtleLiteralObject, 'Iri', turtleObject1literalEn);
	const turtleObject1literalCs = workspace.newBlock('literal'); setValue(turtleObject1literalCs, 'literal', '"Grüner Kobold"@de'); connect(turtleLiteralObject2, 'Iri', turtleObject1literalCs);
	const predicate2 = workspace.newBlock('predicate'); connectStatement(subject, 'Predicate', predicate2);
	const turtleObject2 = workspace.newBlock('object'); connectStatement(predicate2, 'Object', turtleObject2);
	const predicatePrefixedIri = workspace.newBlock('prefixedIri'); setValue(predicatePrefixedIri, 'options', 'foaf'); setValue(predicatePrefixedIri, 'NAME', 'person'); connect(turtleObject2, 'Iri', predicatePrefixedIri);
	const iriRdfType = workspace.newBlock('prefixedIri'); setValue(iriRdfType, 'options', 'rdf'); setValue(iriRdfType, 'NAME', 'type'); connect(predicate2, 'Iri', iriRdfType);
	const predicate = workspace.newBlock('predicate'); connectStatement(subject, 'Predicate', predicate);
	const predicatePrefixedIri2 = workspace.newBlock('prefixedIri'); setValue(predicatePrefixedIri2, 'options', 'rel'); setValue(predicatePrefixedIri2, 'NAME', 'enemyOf'); connect(predicate, 'Iri', predicatePrefixedIri2);

	const turtleObject3 = workspace.newBlock('object'); connectStatement(predicate, 'Object', turtleObject3);
	const turtleObject3Iri = workspace.newBlock('iri'); setValue(turtleObject3Iri, 'iri', '<#spiderman>'); connect(turtleObject3, 'Iri', turtleObject3Iri);
	//blank
	const blank = workspace.newBlock('blank'); connectStatement(appBlock, 'Blanks', blank);
	const blankSubjectIri = workspace.newBlock('iri'); setValue(blankSubjectIri, 'iri', '<#green-goblin>'); connect(blank, 'Subject', blankSubjectIri);
	const blankPredicateIri = workspace.newBlock('prefixedIri'); setValue(blankPredicateIri, 'options', 'rel'); setValue(blankPredicateIri, 'NAME', 'friendOf'); connect(blank, 'Predicate', blankPredicateIri);
	const blankPredicateType = workspace.newBlock('predicate'); connectStatement(blank, 'Blank',  blankPredicateType);
	const blankObject = workspace.newBlock('object'); connectStatement(blankPredicateType, 'Object', blankObject);
	const blankObjectIri = workspace.newBlock('iri'); setValue(blankObjectIri, 'iri', '<#spiderman>'); connect(blankObject, 'Iri', blankObjectIri);
	const blankPredicate = workspace.newBlock('predicate'); connectStatement(blank, 'Blank',  blankPredicate);
	const blankInnerPredicateIri = workspace.newBlock('prefixedIri'); setValue(blankInnerPredicateIri, 'options', 'foaf'); setValue(blankInnerPredicateIri, 'NAME', 'name'); connect(blankPredicate, 'Iri', blankInnerPredicateIri);
	const blankInnerPredicateTypeIri = workspace.newBlock('prefixedIri'); setValue(blankInnerPredicateTypeIri, 'options', 'rel'); setValue(blankInnerPredicateTypeIri, 'NAME', 'enemyOf'); connect(blankPredicateType, 'Iri', blankInnerPredicateTypeIri);
	const blankObject2 = workspace.newBlock('object'); connectStatement(blankPredicate, 'Object', blankObject2);
	const blankObjectLiteral = workspace.newBlock('literal'); setValue(blankObjectLiteral, 'literal', '"Sand Man"'); connect(blankObject2, 'Iri', blankObjectLiteral);

	const blocks = [
		appBlock, annotationBlock, baseIri, annotationPrefix, annotationPrefix2, prefixIri, prefixIri2, subject, subjectIri, predicate, predicate2,
		predicatePrefixedIri, predicatePrefixedIri, turtleLiteralObject, turtleObject2, turtleLiteralObject2, turtleObject3, turtleObject3Iri,
		blank, blankSubjectIri, blankPredicateIri, blankPredicate, blankInnerPredicateIri, blankObject, blankObject2, blankObjectIri, blankObjectLiteral,
		annotationPrefix3, prefixIri3, predicatePrefixedIri2, predicate3, predicate3PrefixedIri, turtleObject1literalEn, turtleObject1literalCs,
		iriRdfType, blankPredicateType, blankInnerPredicateTypeIri,
	];

	initBlocks(blocks);
	workspace.render();
	appBlock.moveBy(50, 50);
}


const connect = (inputBlock, inputType, outputBlock) => {
	inputBlock.getInput(inputType).connection.connect(outputBlock.outputConnection);
}

const connectStatement = (inputBlock, inputType, outputBlock) => {
	inputBlock.getInput(inputType).connection.connect(outputBlock.previousConnection);
}

const initBlocks = (blocks) => {
	blocks.forEach(block => {
		block.initSvg();
	});
}

const setValue = (block, field, value) => {
	block.getField(field).setValue(value);
}

