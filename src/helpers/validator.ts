import { LABELS } from '../constants'

export const validateEmpty = (key: keyof typeof LABELS, value: string) => {
	return value.trim() === '' ? `${LABELS[key]} is required` : ''
}
