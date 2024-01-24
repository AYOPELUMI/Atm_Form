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
	
		if (number.length > 0 && valueNumber){
			if (!isNaN(number)) {
				cloneisValid[Index] = true
				setCardNumberInputValid(cloneisValid)
				clone[Index] = valueNumber	
				setCardNumberInputs(clone)		
			}

		}
		else{
			setCardNumberInputs(clone)
			cloneisValid[Index] = false
			setCardNumberInputValid(cloneisValid)
		}
		if (valueNumber.toString().length == '4' && Index!=3){
			cardNumberRefArray[Index+1].current.focus()
		}
	}


const changeExpiryMonth = (event) =>{
	const value = event.target.value

	const numberValue = Number(value)

	if((value=="" || value ==" ") && (value.length == 1 || value.length == 0)){
		setExpiryMthValue("")
		setExpiryMonthValid(false)
	}
	else if (numberValue || value == 0){
		if(numberValue <=12 && !isNaN(value) ){
			setExpiryMthValue(numberValue)
			setExpiryMonthValid(false)
		}
		else{
			setExpiryMonthValid(true)
		}
	}
}

const changeExpiryYear = () => {
	const value = event.target.value
	const valueNumber = Number(value)

	if((value=="" || value==" ") && (value.length ==0 || value.length == 1)){
		set_Exp_Yr_Value("")
	}
	else if ((value.length > 0 && valueNumber ) || value == 0){
		set_Exp_Yr_Value(valueNumber)
	}
}

const changeCvc = (event) =>{
	const value = event.target.value
	const valueNumber = Number(value)
	if (value.length > 0 && !isNaN(value) && valueNumber) {
		 setCvc(valueNumber)
	}
	if(value=="" && value.length ==0){
		setCvc("")
	}
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
					/> 
				</div>
			</aside>
			</div>
		</div>
	)
}