var synthes = new SpeechSynthesisUtterance();
synthes.lang = 'ja-US';
synthes.text = document.getElementById('text').innerText;
speechSynthesis.speak(synthes);
