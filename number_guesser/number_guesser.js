let min=1,
	max=10,
	winningNum=randomNum(min,max),
	guessesLeft=3

const game=document.querySelector('#game'),
	  message=document.querySelector('.message'),
	  input=document.querySelector('#guess-input'),
	  guessBtn=document.querySelector('#guess-btn'),
	  minNum=document.querySelector('.min-num'),
	  maxNum=document.querySelector('.max-num')


minNum.textContent=min
maxNum.textContent=max

guessBtn.addEventListener('mousedown',function(e){
	if(e.target.className==='play-again'){
		window.location.reload()
		input.value=''
	}
})

guessBtn.addEventListener('click',function(){
	let guess=parseInt(input.value)

	if(isNaN(guess) || guess < min || guess > max){
		showMsg(`Please enter a number between ${min} and ${max}`,'red')
	}

	if(guess === winningNum){
		gameOver(true,`${winningNum} is correct.You Won!!!`)
	}
	else{
		guessesLeft-=1;
		if(guessesLeft===0){
			gameOver(false,`Game Over.You Lost!!.The correct number was ${winningNum}`)
		}
		else{
			input.value=''
			input.style.borderColor='red'
			showMsg(`${guess} is not correct,${guessesLeft} guesses left`,'red')
		}
	}
})

function gameOver(isWon,msg){

	isWon === true ? color='green':color='red'
	input.style.borderColor=color
	input.disabled=true
	showMsg(msg,color)

	guessBtn.value='Play Again'
	guessBtn.className+='play-again'
}

function showMsg(msg,color){
	message.textContent=msg
	message.style.color=color
}

function randomNum(min,max){
	return Math.floor(Math.random()*(max-min+1)+min)
}









