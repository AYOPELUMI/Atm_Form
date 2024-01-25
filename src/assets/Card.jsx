{/*<Card a={'aaaa'} b="b" c="c" d={'d'} />*/}

export function Card(props) {
		// props -> { a: 'aaaa', b: 'b', c: 'c'}
 
		const {
			cardNumberInputs,
			expiryMthvalue,
			expiryYrValue,
			name,
			cvc,
			cvcFlip
		} = props;

		const DisplayCardNumber= () => {
		const displayArray =[]
		let DisplayNumber = null
		for (var i = 0; i < 4; i++) {
			const  displayElement = <p className='CardNumber' index={i} key= {i}>
			{cardNumberInputs[i]}
			</p>
			displayArray.push(displayElement);		
		}
		return displayArray
	}
	return (
		<div className ="containerAtm">
			<div className="atmContainer" style={{
						transform: cvcFlip == true  && cvc? "rotateY(-180deg)" : undefined
					}}>
					<div className="atmFrontSide atm">
						<div>
							<div className="icon"></div>
							<div className="invertesIcon"></div>
						</div>
						<div className="cardnumber">
							{DisplayCardNumber()}	
						</div>
						<div className="HolderDetails">
							<div className="cardholderName">
							{name.toLocaleUpperCase() }
							</div>
							<div className="expiryDate">
								<p className="expMonth">{expiryMthvalue}</p>
								<p>/</p>
								<p className="expYear">{expiryYrValue}</p>
							</div>
						</div>
					</div>
					<div className="atmBackside atm">
						<div className="blackStrip">
						</div>
						<div className="greyShading">
						{cvc}
						</div>
					</div>
		</div>
		</div>
	)
}
