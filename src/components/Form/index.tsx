import { useRef, useState } from 'react'
import { User, Mail, CreditCard, ChevronLeft, ChevronRight, Check } from 'lucide-react'

import { validateEmpty } from '../../helpers/validator'
import SimpleButton from '../atoms/button/SimpleButton'
import StepTitle from '../molecules/StepTitle'

const steps = [
	{ title: 'Personal Info', icon: User, fields: ['firstName', 'lastName', 'age'] },
	{ title: 'Contact Details', icon: Mail, fields: ['email', 'phoneNumber', 'address'] },
	{ title: 'Payment', icon: CreditCard, fields: ['cardNumber', 'expiry', 'cvv'] },
]

type FormInputKeys =
	| 'firstName'
	| 'lastName'
	| 'age'
	| 'email'
	| 'phoneNumber'
	| 'address'
	| 'cardNumber'
	| 'expiry'
	| 'cvv'

const StepForm = () => {
	const [current, setCurrent] = useState<number>(0)
	const [inputs, setInputs] = useState<Record<FormInputKeys, string>>({
		firstName: '',
		lastName: '',
		age: '',
		email: '',
		phoneNumber: '',
		address: '',
		cardNumber: '',
		expiry: '',
		cvv: '',
	})

	const [errors, setErrors] = useState<Record<FormInputKeys, string>>({
		firstName: '',
		lastName: '',
		age: '',
		email: '',
		phoneNumber: '',
		address: '',
		cardNumber: '',
		expiry: '',
		cvv: '',
	})

	const formCurrentRef = useRef<Record<number, { data: Record<FormInputKeys, string> }>>({
		0: { data: '' },
		1: { data: '' },
		2: { data: '' },
	})

	const handlePrevious = () => setCurrent(prev => prev - 1)
	const handleNext = () => {
		const hasError = handleFieldByStep(current)
		if (!hasError) {
			saveStep(current)
			setCurrent(prev => prev + 1)
		}
	}

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = event.target.name
		const value = event.target.value
		setInputs(prev => ({ ...prev, [name]: value }))
		const error = validateEmpty(name, value)
		setErrors(prev => ({ ...prev, [name]: error || error }))
	}

	const hasError = () => {
		const isError = Object.values(errors).some(error => error != '')
		return isError
	}

	const getFieldByStep = (step: number) => {
		switch (step) {
			case 0:
				return ['firstName', 'lastName', 'age']
			case 1:
				return ['email', 'phoneNumber', 'address']
			case 2:
				return ['cardNumber', 'expiry', 'cvv']

			default:
				break
		}
	}

	const handleFieldByStep = (step: number) => {
		const fields = getFieldByStep(step)
		let hasError = false
		fields?.forEach(field => {
			const value = inputs[field as FormInputKeys]
			const newError = validateEmpty(field as FormInputKeys, value)

			if (newError.length > 0) {
				hasError = true
			}
			setErrors(prev => ({ ...prev, [field]: newError }))
		})
		return hasError
	}

	const saveStep = (step: number) => {
		const fields = steps[step].fields
		const formStep: Record<string, string> = {}
		fields.forEach(field => {
			formStep[field] = inputs[field as FormInputKeys]
		})
		formCurrentRef.current[step] = {
			data: formStep,
		}
	}

	const handleSubmit = () => {
		saveStep(current)
		console.log('form', formCurrentRef.current)
	}

	const renderFormContent = () => {
		switch (current) {
			case 0:
				return (
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col ">
								<input
									name="firstName"
									value={inputs.firstName}
									onChange={handleChangeInput}
									className="py-3 px-2 border border-gray-300 rounded-lg w-full"
									type="text"
									placeholder="First Name"
								/>
								{errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
							</div>

							<div className="flex flex-col gap-2">
								<input
									name="lastName"
									value={inputs.lastName}
									onChange={handleChangeInput}
									className="py-3 px-2 border border-gray-300 rounded-lg w-full"
									type="text"
									placeholder="Last Name"
								/>
								{errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<input
								name="age"
								value={inputs.age}
								onChange={handleChangeInput}
								className="w-full py-3 px-2 border border-gray-300 rounded-lg"
								type="number"
								placeholder="Age"
							/>
							{errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
						</div>
					</div>
				)
			case 1:
				return (
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-800">Contact Details</h3>
						<div className="flex flex-col gap-2">
							<input
								name="email"
								value={inputs.email}
								onChange={handleChangeInput}
								className="w-full py-3 px-2 border border-gray-300 rounded-lg"
								type="email"
								placeholder="Email Address"
							/>
							{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
						</div>
						<div className="flex flex-col gap-2">
							<input
								name="phoneNumber"
								value={inputs.phoneNumber}
								onChange={handleChangeInput}
								className="w-full py-3 px-2 border border-gray-300 rounded-lg"
								type="text"
								placeholder="Phone Number"
							/>
							{errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
						</div>
						<div className="flex flex-col gap-2">
							<textarea
								name="address"
								value={inputs.address}
								onChange={handleChangeInput}
								className="w-full py-3 px-2 border border-gray-300 rounded-lg"
								placeholder="Address"
							/>
							{errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
						</div>
					</div>
				)
			case 2:
				return (
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
						<div className="flex flex-col gap-2">
							<input
								name="cardNumber"
								value={inputs.cardNumber}
								onChange={handleChangeInput}
								className="w-full py-3 px-2 border border-gray-300 rounded-lg"
								type="text"
								placeholder="Card Number"
							/>
							{errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
						</div>

						<div className="flex flex-row gap-4 mb-5">
							<div className="flex flex-col gap-2">
								<input
									name="expiry"
									value={inputs.expiry}
									onChange={handleChangeInput}
									className="w-full py-3 px-2 border border-gray-300 rounded-lg"
									type="text"
									placeholder="MM/YY"
								/>
								{errors.expiry && <p style={{ color: 'red' }}>{errors.expiry}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="cvv"
									value={inputs.cvv}
									onChange={handleChangeInput}
									className="w-full py-3 px-2 border border-gray-300 rounded-lg"
									type="text"
									placeholder="CVV"
								/>
								{errors.cvv && <p style={{ color: 'red' }}>{errors.cvv}</p>}
							</div>
						</div>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<div className="mx-auto max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
			<h1 className="text-2xl text-center font-bold mb-8">useRef Stepper Form Demo</h1>
			<div className="flex flex-row justify-between mb-8">
				{steps.map((step, index) => {
					const StepIcon = step.icon
					const isActive = current === index
					return (
						<div key={index} className="flex flex-col items-center">
							<StepTitle
								icon={<StepIcon className="w-6 h-6" />}
								isActive={isActive}
								title={<span className={isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}>{step.title}</span>}
							/>
						</div>
					)
				})}
			</div>

			{renderFormContent()}

			<div className="flex flex-row justify-between mt-8">
				<SimpleButton onClick={handlePrevious} disabled={current === 0} variant="disabled">
					<ChevronLeft /> Previous
				</SimpleButton>

				{current === steps.length - 1 ? (
					<SimpleButton
						onClick={handleSubmit}
						className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
					>
						Submit Form <Check className="ml-2" />
					</SimpleButton>
				) : (
					<SimpleButton disabled={hasError()} onClick={handleNext} variant="primary">
						Next <ChevronRight className="ml-2" />
					</SimpleButton>
				)}
			</div>
		</div>
	)
}

export default StepForm
