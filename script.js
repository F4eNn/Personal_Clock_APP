// Greeting move Up and Show info
const greetingBox = document.querySelector('.greeting')
const showMoreBtn = document.querySelector('.show-more')
const arrowShowMoreBtn = document.querySelector('.show-more i')
const textShowMoreBtn = document.querySelector('.show-more__text')
const hiddenInfo = document.querySelector('.info-container')
const body = document.querySelector('body')
// Quote API and elements
const URL_QUOTE = 'https://api.quotable.io'
const LENGTH_QUOTE = '/random?maxLength=150'
const quote = document.querySelector('#quote-text')
const authorQuoute = document.querySelector('#author-quote')
const refreshButton = document.querySelector('.fa-rotate')
const containerQuote = document.querySelector('.quote-container')
// Geolocation API and elements
const URL_GEOLOCATION = 'https://ipgeolocation.abstractapi.com/v1/'
const country = document.querySelector('#country')
const timezone = document.querySelector('#timezone')
// WorldTime API
const URL_WORLD_TIME = 'https://worldtimeapi.org/api/ip'
const clock = document.querySelector('.greeting__clock')
const currentYear = document.querySelector('#yearDay')
const currentDayOfWeek = document.querySelector('#weekDay')
const currentWeekNumber = document.querySelector('#weekNumber')
// Data for Media Hero-bg
const heroImg = document.querySelector('.hero-bg')
// other stuffs
const greetingIcon = document.querySelector('#greeting-icon')
const greetingText = document.querySelector('#greeting-text')
const restOfSentence = document.querySelector('#rest-of-sentence')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
// ANIMATION FOR POPUPS
const popup = document.querySelector('.popup')
const popupBtn = document.querySelector('.popup-button')
const nameFromInput = document.querySelector('#input-popup')


///////////////////////////			WORLD TIME API
async function showCurrentDays() {
	const res = await fetch(URL_WORLD_TIME)
	const data = await res.json()
	// data from server
	const weekDay = data.day_of_week
	const year = data.day_of_year
	const weekNumber = data.week_number
	currentYear.innerHTML = year
	currentDayOfWeek.innerHTML = weekDay
	currentWeekNumber.innerHTML = weekNumber
}
showCurrentDays()
///////////////////////////	 		GEOLOCATION API
async function geolocation() {
	try {
		const response = await fetch(URL_GEOLOCATION + API_KEY_GEOLOCATION)
		const data = await response.json()
		// Data from server
		const myTimezone = data.timezone.name
		const myCity = data.city
		const countryCode = data.country_code

		country.innerHTML = `In ${myCity}, ${countryCode}`
		timezone.innerHTML = myTimezone
	} catch {
		console.error('lack of data / too much requests')
	}
}
geolocation()
///////////////////////////	 		QUOTES API
async function generateQuotes() {
	try {
		const response = await fetch(URL_QUOTE + LENGTH_QUOTE)
		const data = await response.json()
		// Data from server
		quote.textContent = data.content
		authorQuoute.textContent = '~' + data.author
	} catch {
		console.error('lack of data / too much requests')
	}
}
generateQuotes()
///////////////////////////	 ADD RELEVANT ICON SUN/MOON
const addIcon = () => {
	if (hours.innerHTML < 05 || hours.innerHTML >= 18) {
		greetingIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
		hiddenInfo.style.backgroundColor = '#1d1d1d'
		hiddenInfo.style.color = '#ffff'
	} else {
		greetingIcon.innerHTML = `<img src="img/sun.svg">`
		hiddenInfo.style.backgroundColor = '#c6c6c6'
		hiddenInfo.style.color = '#000'
	}
}
///////////////////////////	ADD RELEVANT GREETING
const generateGreetingText = () => {
	if (hours.innerHTML >= 05 && hours.innerHTML < 12) {
		greetingText.textContent = `Good morning ${nameFromInput.value}!`
	} else if (hours.innerHTML >= 12 && hours.innerHTML < 18) {
		greetingText.textContent = `Good afternoon ${nameFromInput.value}!`
	} else {
		greetingText.textContent = `Good evening ${nameFromInput.value}!`
	}
}
generateGreetingText()
addIcon()
/////////////////////////			CLOCK
function showCurrentTime() {
	const date = new Date()
	hours.innerHTML = date.getHours()
	minutes.innerHTML = date.getMinutes()
	if (hours.innerHTML < 10) {
		hours.innerHTML = `0${date.getHours()}`
	} else {
		hours.innerHTML = date.getHours()
	}
	if (minutes.innerHTML < 10) {
		minutes.innerHTML = `0${date.getMinutes()}`
	} else {
		minutes.innerHTML = date.getMinutes()
	}
	generateGreetingText()
	addIcon()
}
showCurrentTime()
setInterval(showCurrentTime, 1000)
///////////////////////////	  ANIMATION SHIFT OF GREETINNG AND SHOW INFORMATION
const showMoreInformation = () => {
	containerQuote.classList.toggle('hide-quote')
	greetingBox.classList.toggle('move-greeting')
	arrowShowMoreBtn.classList.toggle('rotate-arrow')

	if (textShowMoreBtn.textContent == 'More') {
		textShowMoreBtn.textContent = 'Less'
		hiddenInfo.style.transform = 'translateY(0)'
	} else {
		textShowMoreBtn.textContent = 'More'
		hiddenInfo.style.transform = ''
	}
}
///////////////////////////	 CHECK CURRENT MEDIA + DAYTIME AND ADD RELEVANT IMG
function checkResolution() {
	const smallImg = window.matchMedia('(max-width: 576px')
	const mediumHeroImg = window.matchMedia('(min-width: 577px) and (max-width: 992px')
	const bigHeroImg = window.matchMedia('(min-width:993px)')

	const mediaArr = [smallImg, mediumHeroImg, bigHeroImg]

	for (let i = 0; i < mediaArr.length; i++) {
		mediaArr[i] // single media
	}
	const getCurrentMedia = () => {
		if (mediaArr[0].matches) {
			// SECOND IF
			if (hours.innerHTML < 05 || hours.innerHTML >= 18) {
				heroImg.style.backgroundImage = "url('../img/nighttime-mobile.jpg')"
				restOfSentence.innerHTML = ''
			} else {
				heroImg.style.backgroundImage = "url('../img/daytime-mobile.jpg')"
				restOfSentence.innerHTML = ''
			}
		} else if (mediaArr[1].matches) {
			// SECOND IF
			if (hours.innerHTML < 05 || hours.innerHTML >= 18) {
				heroImg.style.backgroundImage = "url('../img/nighttime-tablet.jpg')"
				restOfSentence.innerHTML = "It's currently"
			} else {
				heroImg.style.backgroundImage = "url('../img/daytime-tablet.jpg')"
				restOfSentence.innerHTML = "It's currently"
			}
		} else if (mediaArr[2].matches) {
			// SECOND IF
			if (hours.innerHTML < 05 || hours.innerHTML >= 18) {
				heroImg.style.backgroundImage = "url('../img/nighttime-desktop.jpg')"
				restOfSentence.innerHTML = "It's currently"
			} else {
				heroImg.style.backgroundImage = "url('../img/daytime-desktop.jpg')"
				restOfSentence.innerHTML = "It's currently"
			}
		}
	}
	getCurrentMedia()
}
checkResolution()

//ENTRY POPUPS

const animateGetStarted = () => {
	//input name
	nameFromInput.defaultValue = 'User'

	const tl = gsap.timeline({ defaults: { duration: 2 } })
	tl.fromTo('.popup__container', { width: 100 + '%' }, { width: 0, opacity: 0 })
	tl.fromTo('.popup-items', { opacity: 1 }, { opacity: 0, duration: 1.5 }, '<')
	tl.to('.popup-title', { fontSize: 0, duration: 0.4 }, '<')
	tl.to('label', { fontSize: 0, duration: 0.4 }, '<')
	tl.to('input', { height: 0 }, '<')
	setInterval(function () {
		popup.style.display = 'none'
	}, 1800)
	animateWelcome(nameFromInput)
}
// SAY HI POPUP
const animateWelcome = name => {
	const tl = gsap.timeline({ delay: 2 })
	tl.to('#loading', { duration: 3, text: `Hello ${name.value}!` })
	tl.to('#loading', { x: -200 + '%', duration: 2 })
	tl.to('#loading', { opacity: 0, duration: 0.9 }, '<')
	gsap.to('.show-name-popup', { width: 0, duration: 2, delay: 5.7 })
}
// ALL LISTENERS
window.addEventListener('resize', checkResolution)
showMoreBtn.addEventListener('click', showMoreInformation)
refreshButton.addEventListener('click', generateQuotes)
popupBtn.addEventListener('click', animateGetStarted)
