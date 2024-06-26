export const convertToPetAge = (dateOfBirth) => {
	const birthDate = new Date(dateOfBirth);
	const today = new Date();

	let years = today.getFullYear() - birthDate.getFullYear();
	let months = today.getMonth() - birthDate.getMonth();

	if (months < 0) {
		years--;
		months += 12;
	}

	return `${years} năm ${months} tháng`;
};
