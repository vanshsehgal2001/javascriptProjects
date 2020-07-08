document.getElementById('loan-form').addEventListener('submit',function(e){

	document.getElementById('results').style.display='none'
	document.getElementById('loading').style.display='block'

	setTimeout(calculate,2000)
	e.preventDefault()
})


function calculate(){

	const amount=document.getElementById('amount')
	const interest=document.getElementById('interest')
	const years=document.getElementById('years')

	const monthly_payment=document.getElementById('monthly-payment')
	const total_payment=document.getElementById('total-payment')
	const total_interest=document.getElementById('total-interest')

	const principal=parseFloat(amount.value)
	const calc_interest=parseFloat(interest.value)/100/12
	const calc_payments=parseFloat(years.value)*12

	const x=Math.pow(1+calc_interest,calc_payments)
	const monthly=(principal*x*calc_interest)/(x-1)

	if(isFinite(monthly)){
		monthly_payment.value=monthly.toFixed(2)
		total_payment.value=(monthly*calc_payments).toFixed(2)
		total_interest.value=((monthly*calc_payments)-principal).toFixed(2)

		document.getElementById('results').style.display='block'
		document.getElementById('loading').style.display='none'


		setTimeout(resetValues,5000)
	}	
	else{
		showError('Please check your numbers')
	}	

}
function resetValues(){
	document.getElementById('loan-form').reset()

}

function showError(error){
	document.getElementById('results').style.display='none'
	document.getElementById('loading').style.display='none'

	const err=document.createElement('div')

	const card=document.querySelector('.card')
	const heading=document.querySelector('.heading')

	err.className='alert alert-danger'
	err.appendChild(document.createTextNode(error))

	card.insertBefore(err,heading)

	setTimeout(clearErr,2000)

}

function clearErr(){
	document.querySelector('.alert').remove()
}













