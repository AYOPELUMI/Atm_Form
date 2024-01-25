import React, {useState, useRef} from 'react'
import { Card } from "./assets/Card"
import './AtmForm.css'
import {Form} from "./assets/Form"
import {Input} from "./assets/Input"
import toast, { Toaster } from 'react-hot-toast'
const inputPlaceHolder = ['0123','4567','8901','2345']

export function AtmForm() {
	const [name, setName] = useState('');
	const [expiryMthvalue, setExpiryMthValue] = useState('');
	const [expiryYrValue, set_Exp_Yr_Value] = useState('');
	const [cvc, setCvc] = useState('');
	const [cardNumberInputs, setCardNumberInputs] = useState([
		'',
		'',
		'',
		'',
		])
	const [cardNumberInputValid, setCardNumberInputValid] = useState([
		true,
		true,
		true,
		true,
		])
	const cardNumberRef0 = useRef(null)
	const cardNumberRef1 = useRef(null)
	const cardNumberRef2 = useRef(null)
	const cardNumberRef3 = useRef(null)
	let cardNumberRefArray = [cardNumberRef0,cardNumberRef1,cardNumberRef2,cardNumberRef3]
	const [expiryMonthValid, setExpiryMonthValid] = useState(false)
	const [cvcFlip, setCvcFlip] = useState(false)	
		

	const CardNumberInput = () => {
		const CardNumberArray = []
		for (var i = 0; i < 4; i++) {
			const inputProps = {
			 	value: cardNumberInputs[i],
			 	onChange:changeNumber
			 } 
			 
		const CardInputElement = (
			<span className='containerCardNumber' key={i} index={i} >
			<Input type="text" ref={cardNumberRefArray[i]} {...inputProps} index={i}  className='cardNumber atmFormInput' maxLength='4' inputMode="numeric" placeholder={inputPlaceHolder[i]} required />
			</span>
			)
			CardNumberArray.push(CardInputElement);
			}
		return CardNumberArray
	}
	
	const changeName = (event) => {
		if (!(event.target.value.match(/\d+/))) {
			setName(event.target.value)
		}
	}

	const changeNumber = (event) =>{
		let Index = Number(event.target.getAttribute('index'))
		const number = event.target.value
	
		const clone = Array.from(cardNumberInputs)
		const cloneisValid = Array.from(cardNumberInputValid)
		const valueNumber = Number(number)
		const regExp = /^\d+$/

		if (number ==="" || regExp.test(number)) {
				cloneisValid[Index] = true
				setCardNumberInputValid(cloneisValid)
				clone[Index] = number	
				setCardNumberInputs(clone)		

		}

		if (valueNumber.toString().length == '4' && Index!=3){
			cardNumberRefArray[Index+1].current.focus()
		}

		if(number.length == 0 && Index!=0) {
			cardNumberRefArray[Index-1].current.focus()
		}
	}

	const changeExpiryMonth = (event) =>{
		const regExp = /^\d+$/
		const value = event.target.value

		const numberValue = Number(value)

		if (value ==="" || regExp.test(value)) {
			if(numberValue <=12){
				setExpiryMthValue(value)
				setExpiryMonthValid(false)
			}
			else{
				setExpiryMonthValid(true)
			}
		}
	}

	const changeExpiryYear = () => {
		const regExp = /^\d+$/
		const value = event.target.value

		if (value ==="" || regExp.test(value)) {
			set_Exp_Yr_Value(value)
		}
	}

	const changeCvc = (event) =>{
		setCvcFlip(true)
		const regExp = /^\d+$/;
		const value = event.target.value
		if (value ==="" || regExp.test(value)) {
			setCvc(value)
			
		}

	}
	const flipBack = ()=>{
		setCvcFlip(false)
	}
	const onSubmit = () => {
		event.preventDefault()
		toast.success("atm details updated successfully")
	}
	
	return (
		<div className='body'>
			<Toaster />
			<div className="mainContainer">
			<aside className="leftSide">
				<Card 
					cardNumberInputs={cardNumberInputs}
					expiryMthvalue={expiryMthvalue}
					expiryYrValue={expiryYrValue}
					name={name}
					cvc={cvc}
					cvcFlip={cvcFlip}
				/>	
			</aside>	

			<aside className="rightSide">
				<div className="container">
					<Form 
						onSubmit ={onSubmit}
						changeName = {changeName}
						name = {name}
						CardNumberInput = {CardNumberInput}
						cardNumberInputValid ={cardNumberInputValid}
						expiryYrValue = {expiryYrValue}
						expiryMthvalue = {expiryMthvalue}
						changeExpiryYear = {changeExpiryYear}
						changeExpiryMonth = {changeExpiryMonth}
						expiryMonthValid={expiryMonthValid}
						cvc = {cvc}
						changeCvc= {changeCvc}
						onBlur ={flipBack}
					/> 
				</div>
			</aside>
			</div>
		</div>
	)
}