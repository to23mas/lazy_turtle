export const toBase = (str, base) => {
	if (str.startsWith('<http')) {
		return str;
	}
	if (base !== '') {
		str = str.replaceAll('<', '');
		str = str.replaceAll('>', '');

		return str;
	}

	return str;
}

export const withBase = (str, base) => {
	if (str.startsWith('<http') || str.startsWith('"') || str === '' || str.includes(': ')) {
		return str;
	}
	if (base !== '') {

		str = str.replaceAll('<', '');
		str = str.replaceAll('>', '');

		return base.slice(1,-3) + str + '>';
	}

	return str;
}
