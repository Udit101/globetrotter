document.addEventListener('DOMContentLoaded', () => {
    const cluesDiv = document.getElementById('clues');
    const optionsDiv = document.getElementById('options');
    const feedbackDiv = document.getElementById('feedback');
    const nextButton = document.getElementById('nextButton');
    const correctCountSpan = document.getElementById('correctCount');
    const incorrectCountSpan = document.getElementById('incorrectCount');
    const usernameInput = document.getElementById('username');
    const challengeButton = document.getElementById('challengeButton');
    const generateButton = document.getElementById('generateButton');

    let currentDestination = null;
    let correctCount = 0;
    let incorrectCount = 0;

    function fetchDestination() {
        fetch('https://globetrotter-backend.onrender.com') // Replace with your backend URL if different
            .then(response => response.json())
            .then(data => {
                currentDestination = data;
                displayClues(data.clues);
                displayOptions(data.city, data.country);
                feedbackDiv.textContent = ''; // Clear previous feedback
                feedbackDiv.classList.remove('correct', 'incorrect'); // Clear feedback classes
            })
            .catch(error => {
                console.error('Error fetching destination:', error);
                cluesDiv.textContent = 'Failed to load destination.';
            });
    }

    function displayClues(clues) {
        const numCluesToShow = Math.min(2, clues.length);
        const selectedClues = [];
        const availableClues = [...clues];

        for (let i = 0; i < numCluesToShow; i++) {
            const randomIndex = Math.floor(Math.random() * availableClues.length);
            selectedClues.push(availableClues[randomIndex]);
            availableClues.splice(randomIndex, 1);
        }

        cluesDiv.innerHTML = selectedClues.map(clue => `<p>${clue}</p>`).join('');
    }

    function displayOptions(correctCity, correctCountry) {
        const incorrectOptions = [
            'Paris', 'Tokyo', 'New York', 'London', 'Rome',  
            'Berlin', 'Madrid', 'Sydney', 'Toronto', 'Moscow',  
            'Beijing', 'Dubai', 'Singapore', 'Bangkok', 'Seoul',  
            'Los Angeles', 'Chicago', 'San Francisco', 'Hong Kong', 'Mexico City'
          ];
        const filteredIncorrectOptions = incorrectOptions.filter(city => city !== correctCity);
        const shuffledIncorrectOptions = filteredIncorrectOptions.sort(() => Math.random() - 0.5);
        const selectedIncorrectOptions = shuffledIncorrectOptions.slice(0, 3);
    
        // Capitalize the correct city
        const capitalizedCorrectCity = correctCity.charAt(0).toUpperCase() + correctCity.slice(1);
    
        const options = [...selectedIncorrectOptions, capitalizedCorrectCity];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
        optionsDiv.innerHTML = shuffledOptions
            .map(option => {
                // Capitalize each option for display
                const capitalizedOption = option.charAt(0).toUpperCase() + option.slice(1);
                return `<button data-city="${option}">${capitalizedOption}</button>`;  // Store the original city in data-city
            })
            .join('');
    
        optionsDiv.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const selectedCity = button.dataset.city; // Retrieve original city
                checkAnswer(selectedCity, correctCity, correctCountry);
            });
        });
    }

    function checkAnswer(selectedCity, correctCity, correctCountry) {
        feedbackDiv.classList.remove('correct', 'incorrect');

        if (selectedCity === correctCity) {
            feedbackDiv.textContent = `Correct! Fun Fact: ${currentDestination.fun_fact[0]}`;
            feedbackDiv.classList.add('correct');
            correctCount++;
        } else {
            feedbackDiv.textContent = `Incorrect! The correct answer was ${correctCity}, ${correctCountry}. Fun Fact: ${currentDestination.fun_fact[0]}`;
            feedbackDiv.classList.add('incorrect');
            incorrectCount++;
        }

        correctCountSpan.textContent = correctCount;
        incorrectCountSpan.textContent = incorrectCount;

        // Load the next question after a short delay (e.g., 1 second)
        setTimeout(() => {
            fetchDestination(); // Load the next question
        }, 5000); // 5000 milliseconds = 5 second
    }

    nextButton.addEventListener('click', fetchDestination);

    challengeButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            const inviteLink = `https://your-globetrotter-website.com/?invited_by=${username}`; // REPLACE THIS URL
            const message = `Hey, play Globetrotter with me! I'm ${username} and my score is ${correctCount}.  Join me at: ${inviteLink}`;

            const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        } else {
            alert('Please enter a username to challenge a friend.');
        }
    });

    generateButton.addEventListener('click', () => {
        fetch('https://globetrotter-backend.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchDestination();
            })
            .catch(error => {
                console.error('Error generating destinations:', error);
                alert('Failed to generate destinations.');
            });
    });

    fetchDestination();
});