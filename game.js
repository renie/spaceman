const showWordBtn = document.querySelector('#showWordBtn')
const startGameBtn = document.querySelector('#startGameBtn')
const alphabetContainer = document.querySelector('.alphabet')
const guessedLettersContainer = document.querySelector('.guessedLetters')
const spaceshipPats = [...document.querySelectorAll('path, circle, line')]
const endGame = document.querySelector('.endGame')

let word;

const switchWordInputType = () => {
	const word = document.querySelector('#word')
	const type = word.type

	if (type !== 'text')
		word.type = 'text'
	else
		word.type = 'password'
}

const clearString = string =>
	string.toUpperCase().replace(/[^A-Z]/g, '')

const createWordSquares = () => {
	const list = document.createElement('ul')
	word.forEach(letter => list.appendChild(document.createElement('li')))
	
	guessedLettersContainer.appendChild(list)
}

const startGame = () => {
	word = [...clearString(document.querySelector('#word').value)]
	
	document.querySelector('#newWordScreen').classList.remove('show')
	document.querySelector('#gameScreen').classList.add('show')

	createWordSquares()
}

const isButton = element =>
	element.nodeName.toUpperCase() === 'BUTTON'

const letterPositionsInWord = guessedLetter =>
	word
		.map((letter, index) => guessedLetter === letter ? index : null)
		.filter(item => item !== null)

const showNextSpaceshipPart = () => {
	for (let i = 0; i < spaceshipPats.length; i++) {
		const item = spaceshipPats[i]
		
		if (!item.classList.length) {
			item.classList.add('show')
			break
		}
	}
}

const isSpaceshipComplete = () =>
	spaceshipPats.every(part => part.classList.contains('show'))

const isWordComplete = () =>
	[...guessedLettersContainer.querySelectorAll('li')].every(letter => letter.textContent.trim() !== '')

const blurGame = () => 
	document.querySelector('.screen.show').classList.add('blur')

const showMessage = message => {
	endGame.classList.add('show')
	endGame.querySelector('.message').innerHTML = message
}


const checkEnd = () => {
	if (isSpaceshipComplete()) {
		blurGame()
		showMessage('You lose <br /> =C')
	} else if (isWordComplete()) {
		blurGame()
		showMessage('You win <br /> =D')
	}
}

const guessLetter = ({target}) => {
	if (!isButton(target)) return false

	const chosenLetter = target.textContent.toUpperCase()
	const positions = letterPositionsInWord(chosenLetter)
	let newClass = 'used '

	if(positions.length) {
		newClass += 'right'
		const boxes = [...guessedLettersContainer.querySelectorAll('li')]
		positions.forEach(position => boxes[position].textContent = chosenLetter)
	} else {
		newClass += 'wrong'
		showNextSpaceshipPart()
	}

	target.className = newClass
	target.disabled = true

	checkEnd() 
}

const restart = () =>
	window.location.reload()

showWordBtn.addEventListener('click', switchWordInputType)
startGameBtn.addEventListener('click', startGame)
alphabetContainer.addEventListener('click', guessLetter)
endGame.addEventListener('click', restart)