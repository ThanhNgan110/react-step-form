const REGEX_PATTERNS = {
	VALID_EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
	VALID_NUMBER_PHONE: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
}

const LABELS = {
	firstName: 'First Name',
	lastName: 'Last Name',
	age: 'Age',
	address: 'Address',
	email: 'Email',
	phoneNumber: 'Phone Number',
	cardNumber: 'Card Number',
	expiry: 'Expiry',
	cvv: 'CVV',
}

export { REGEX_PATTERNS, LABELS }
