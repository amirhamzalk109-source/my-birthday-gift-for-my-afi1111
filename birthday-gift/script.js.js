/* 
  Project: Professional Interactive Birthday Gift
  Updated for 8-Digit Passcode: 23122024
*/

// Ambient Background Sparks
(function createBackground() {
  const bg = document.getElementById('bg-ambient');
  if (!bg) return;
  for (let i = 0; i < 6; i++) {
    const m = document.createElement('div');
    m.className = 'candle-mote';
    const msz = Math.random() * 4 + 3;
    m.style.cssText = `width:${msz}px;height:${msz}px;left:${Math.random()*100}%;bottom:${Math.random()*20}%;--md:${Math.random()*4+4}s;`;
    bg.appendChild(m);
  }
})();

// Confetti Function
function launchConfetti() {
  const count = 30;
  const colors = ['#ff6b9d','#ffd700','#ff4db8','#00bcd4','#ff5722'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = Math.random() * 6 + 4;
    c.style.cssText = `left:${Math.random()*100}%;top:-10px;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};--cf-d:${Math.random()*1.2+1.2}s;`;
    frag.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
  document.body.appendChild(frag);
}

const TARGET_PASSCODE = "23122024"; // Updated Passcode
let enteredDigits = "";

function updateDateBoxes() {
  for (let i = 0; i < 8; i++) {
    const box = document.getElementById(`b${i}`);
    if (box) {
      box.textContent = enteredDigits[i] || "";
      box.style.borderColor = (i === enteredDigits.length) ? "#c2185b" : "#fff";
    }
  }
}
updateDateBoxes();

function pressKey(num) {
  if (enteredDigits.length < 8) {
    enteredDigits += num;
    updateDateBoxes();
    if (enteredDigits.length === 8) {
      setTimeout(submitBirthdayDate, 200);
    }
  }
}

function deleteDigit() {
  if (enteredDigits.length > 0) {
    enteredDigits = enteredDigits.slice(0, -1);
    updateDateBoxes();
  }
}

function submitBirthdayDate() {
  if (enteredDigits === TARGET_PASSCODE) {
    launchConfetti();
    document.getElementById('quiz-screen').style.display = 'none';
    const surpriseScreen = document.getElementById('surprise-screen');
    surpriseScreen.classList.remove('hidden-screen');
    surpriseScreen.style.display = 'flex';
  } else {
    document.getElementById('quiz-text').textContent = "Wrong Passcode! Try again 🥺";
    enteredDigits = "";
    updateDateBoxes();
  }
}

function handleChoice(choice) {
  if (choice === 'yes') {
    launchConfetti();
    document.getElementById('surprise-screen').style.display = 'none';
    const giftScreen = document.getElementById('gift-screen');
    giftScreen.classList.remove('hidden-screen');
    giftScreen.style.display = 'flex';
  } else {
    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
      noBtn.style.transform = `translate(${(Math.random() - 0.5) * 120}px, ${(Math.random() - 0.5) * 60}px)`;
    }
  }
}

function openMysteryBox(num) {
  if (num === 1) document.getElementById('memories-modal').classList.remove('hidden');
  if (num === 2) document.getElementById('cake-modal').classList.remove('hidden');
  if (num === 3) document.getElementById('letter-modal').classList.remove('hidden');
}

function closeMemoriesModal() { document.getElementById('memories-modal').classList.add('hidden'); }
function closeCakeModal() { document.getElementById('cake-modal').classList.add('hidden'); }
function closeLetterModal() { document.getElementById('letter-modal').classList.add('hidden'); }

function scrollClothesline(dir) {
  const track = document.getElementById('clothesline-photos-track');
  if (track) track.scrollBy({ left: dir * 180, behavior: 'smooth' });
}

let blownCount = 0;
function blowCandle(num, e) {
  if (e) e.stopPropagation();
  const candle = document.getElementById('candle-' + num);
  if (candle && candle.textContent !== '💨') {
    candle.textContent = '💨';
    blownCount++;
    if (blownCount >= 3) {
      launchConfetti();
      document.getElementById('cake-wish-banner').classList.remove('hidden');
    }
  }
}

function resetCake() {
  blownCount = 0;
  for (let i = 1; i <= 3; i++) {
    const c = document.getElementById('candle-' + i);
    if (c) c.textContent = '🕯️';
  }
  document.getElementById('cake-wish-banner').classList.add('hidden');
}