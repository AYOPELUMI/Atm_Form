import {Input} from "./Input"

export function Form(props){

	const {
		changeName,
		name,
		CardNumberInput,
		expiryMonthValid,
		onSubmit,
		expiryYrValue,
		expiryMthvalue,
		changeExpiryYear,
		changeExpiryMonth,
		cvc,
		changeCvc

	} = props;

	return(
		<form className="validationForm" onSubmit={onSubmit}>
			<label className="validationFormLabel">
				<h4>
				CARDHOLDER NAME
				</h4>
				<Input type="text"  placeholder="e.g AYODEJI PELUMI" className="atmFormInput" maxLength="25" value={name} onChange={changeName} required />
			</label>
			<label className="cardNumberLabel validationFormLabel">
				<h4>
					CARD NUMBER
				</h4>
				<div className="CardNumberDiv">
					{CardNumberInput()}
				</div>
			</label>
			<div className="special">
				<label className="expirydate">
					<h4>
					EXP. DATE(MM/YY)
					</h4>
					<span className='span'>
				 		<Input type="text" placeholder="MM" maxLength="2" className="expiryMonth atmFormInput" value={expiryMthvalue} onChange={changeExpiryMonth}  required/>
				 	</span>
				 		<p>{expiryMonthValid == true ? "not more than 12" : null}</p>
				 	<span className='span'>
			 			<Input type="text"  placeholder="YY" maxLength="2" className="expiryYear atmFormInput" value={expiryYrValue}  onChange={changeExpiryYear} required />
				 	</span>
				</label>
			
				<label className="validationFormLabel">
					<h4>
						CVC
					</h4>
					<Input type="text" placeholder="e.g 123" className="cvcclassName atmFormInput" maxLength="3" value={cvc} onChange={changeCvc} />
				</label>
			</div>
			<button className="submit" type="submit">Confirm</button>
		</form>
	)
}