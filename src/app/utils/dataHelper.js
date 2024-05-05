// check if the UUID is valid
export function isValidUUID(uuid) {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

// check if the date is valid
export function checkValidDate(date) {
	return date && Number.isNaN(date.getTime());
}