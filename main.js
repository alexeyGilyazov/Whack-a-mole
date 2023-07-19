const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
let lasHole
let timeUp = false
let score = 0
const startBtn = document.getElementById('startBtn')
const endBtn = document.querySelector('#endBtn')
let scoreListUl = document.querySelector('.score-list')
const playerNameInput = document.getElementById('playerName')
const form = document.getElementById('form')
const warning = document.querySelector('.warning')
let playersData = []


const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min)

const randomHole = (holes) => {
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx]
    if (hole === lasHole) {
        console.log('ah nah same hole');
        return randomHole(holes)
    }
    lasHole = hole
    return hole
}

const peep = () => {
    const time = randomTime(200, 1000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) peep()
    }, time)
}



const startGame = () => {
    scoreListUl.style.display = 'none'
    score = 0
    scoreBoard.textContent = 0
    timeUp = false
    peep()
    setTimeout(() => timeUp = true, 10000)
}

const bonk = e => {
    if (!e.isTrusted) return false
    score++
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))
const createPlayer = (name, score, date) => ({ name, score, date })
const sortResult = arr => arr.sort((a, b) => a.score - b.score)
const saveToLocalStorage = (playersData) => localStorage.setItem('playersData', JSON.stringify(playersData));


const checkInput = () => {
    startBtn.setAttribute('disabled', true)
    endBtn.setAttribute('disabled', true)
    playerNameInput.addEventListener('input', e => {
        e.preventDefault()
        if (e.target.value.length > 5) {
            startBtn.removeAttribute('disabled')
            warning.style.opacity = '0'
        } else {
            startBtn.setAttribute('disabled', true)
            warning.style.opacity = '1'
        }
    })
}

startBtn.addEventListener('click', function () {
    startBtn.style.transform = `rotate(110deg)`
    setTimeout(function () {
        startBtn.style.transform = `rotate(0deg)`
    }, 4500)
    startGame()
    checkInput()
    endBtn.removeAttribute('disabled')
})

endBtn.addEventListener('click', function () {
    scoreListUl.style.display = 'block'
    const totalScore = scoreBoard.textContent
    let namePlayer = playerNameInput.value

    const itemScore = document.createElement('li')
    itemScore.classList.add('new-score')
    let today = new Date()
    let now = today.toLocaleString()

    itemScore.textContent = `Score ${totalScore}  ${namePlayer}  ${now}`
    scoreListUl.appendChild(itemScore)
    if (parseInt(totalScore) > 9) {
        itemScore.classList.add('star')
    }
    sortResult(playersData)
    let newPlayer = createPlayer(namePlayer, totalScore, now)
    playersData.push(newPlayer)
    saveToLocalStorage(playersData)
    playerNameInput.value = ''
    scoreBoard.textContent = 0
    checkInput()
})


const button = document.querySelector('.btn-game');

button.addEventListener('mouseenter', () => {
    button.classList.add('show-image');
});

button.addEventListener('mouseleave', () => {
    button.classList.remove('show-image');
});

checkInput()


