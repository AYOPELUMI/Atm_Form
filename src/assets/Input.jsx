import {forwardRef} from "react"
export const Input = forwardRef((props, ref) => {
	return (
			<input
				{...props}
				ref={ref}
				style={{
					borderColor: props.isInvalid === true ? 'red' : undefined
				}}
		 	/>
	)
})

