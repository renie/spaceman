const switchWordInputType = () => {
	const word = document.querySelector('#word')
	const type = word.type

	if (type !== 'text')
		word.type = 'text'
	else
		word.type = 'password'
}

const showWord = document.querySelector('#showWord')
showWord.addEventListener('click', switchWordInputType)