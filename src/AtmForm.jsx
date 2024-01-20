import React, {useState, useRef} from 'react'
import { Card } from "./assets/Card"
import './AtmForm.css'
import {Form} from "./assets/Form"
import {Input} from "./assets/Input"

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
	const [expiryMonthValid, setExpiryMonthValid] = useState(true)
	
	const CardNumberInput = () => {
		const CardNumberArray = []
		for (var i = 0; i < 4; i++) {
				 const inputProps = {
			 	 value: cardNumberInputs[i],
			 	 onChange:changeNumber
			 } 
			 
		const CardInputElement = (
			<span className='containerCardNumber' key={i} index={i} >
			<Input type="text" ref={cardNumberRefArray[i]} {...inputProps} index={i}  className='cardNumber atmFormInput' maxLength='4' inputMode="numeric" placeholder={inputPlaceHolder[i]} />
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
		console.log({number})
		const clone = Array.from(cardNumberInputs)
		const cloneisValid = Array.from(cardNumberInputValid)
		// clone[Index] = number
		console.log({clone})

		const valueNumber = Number(number)
		console.log({valueNumber})
		if (number.length > 0 && valueNumber){
			console.log("hello")
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
		console.log(number.length)
		if (valueNumber.length == '4' && Index!=3){
			console.log("i am here")
			cardNumberRefArray[Index+1].current.focus()
			// cardArray[Index +1].ref
			console.log(cardNumberRefArray[Index+1].current)
			// cardNumberRefs.current[Index].current.focus()
		}
	}


const changeExpiryMonth = (event) =>{
	const value = event.target.value
	const numberValue = Number(value)

	if (numberValue || value == 0){
		if(numberValue <=12 && !isNaN(value) ){
			setExpiryMthValue(numberValue)
			setExpiryMonthValid(false)
		}
		else{
			setExpiryMonthValid(true)
		}
	}
	if(value=="" && value.length ==0){
		setExpiryMthValue("")
		setExpiryMonthValid(false)
	}
}

const changeExpiryYear = () => {
	const value = event.target.value
	const valueNumber = Number(value)

	if ((value.length > 0 && valueNumber ) || value == 0){
		set_Exp_Yr_Value(valueNumber)
	}
	if(value=="" && value.length ==0){
		set_Exp_Yr_Value("")
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
const handleCvcBlur =() => {
	setFlipToBack(false)
}
	
	return (
		<div className='body'>
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
						changeName = {changeName}
						name = {name}
						CardNumberInput = {CardNumberInput}
						cardNumberInputValid ={cardNumberInputValid}
						expiryYrValue = {expiryYrValue}
						expiryMthvalue = {expiryMthvalue}
						changeExpiryYear = {changeExpiryYear}
						changeExpiryMonth = {changeExpiryMonth}
						expiryMonthValid={expiryMonthValid}
						handleCvcBlur ={handleCvcBlur}
						cvc = {cvc}
						changeCvc= {changeCvc}
					/> 
				</div>
			</aside>
			</div>
		</div>
	)
}