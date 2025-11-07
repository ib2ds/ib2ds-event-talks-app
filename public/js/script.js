document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('categorySearch');
    const speakerSearchInput = document.getElementById('speakerSearch');
    const clearCategorySearch = document.getElementById('clearCategorySearch');
    const clearSpeakerSearch = document.getElementById('clearSpeakerSearch');
    let allTalks = [];

    const eventStartTime = 10 * 60; // 10:00 AM in minutes from midnight
    const lunchBreakDuration = 60; // 1 hour lunch break
    const transitionDuration = 10; // 10 minutes transition

    async function fetchTalks() {
        try {
            const response = await fetch('/api/talks');
            allTalks = await response.json();
            renderSchedule(allTalks);
        } catch (error) {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        }
    }

    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
    }

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        let currentTime = eventStartTime;

        talksToRender.forEach((talk, index) => {
            const talkStartTime = currentTime;
            const talkEndTime = currentTime + talk.duration;

            const talkElement = document.createElement('div');
            talkElement.classList.add('talk-slot');
            talkElement.innerHTML = `
                <div class="time-slot">${formatTime(talkStartTime)} - ${formatTime(talkEndTime)}</div>
                <div class="talk-details">
                    <h2>${talk.title}</h2>
                    <p class="speakers">${talk.speakers.join(', ')}</p>
                    <p>${talk.description}</p>
                    <p>${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}</p>
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            currentTime = talkEndTime;

            // Add transition time after each talk, except the last one
            if (index < talksToRender.length - 1) {
                currentTime += transitionDuration;
            }

            // Insert lunch break after the 3rd talk (index 2)
            if (index === 2) {
                const lunchStartTime = currentTime;
                const lunchEndTime = currentTime + lunchBreakDuration;
                const lunchBreakElement = document.createElement('div');
                lunchBreakElement.classList.add('break-slot');
                lunchBreakElement.innerHTML = `
                    <div class="time-slot">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
                    <div>Lunch Break</div>
                `;
                scheduleContainer.appendChild(lunchBreakElement);
                currentTime = lunchEndTime;
                currentTime += transitionDuration; // Transition after lunch break
            }
        });
    }

    function filterAndRenderTalks() {
        const categorySearchTerm = categorySearchInput.value.toLowerCase();
        const speakerSearchTerm = speakerSearchInput.value.toLowerCase();

        clearCategorySearch.style.display = categorySearchTerm ? 'block' : 'none';
        clearSpeakerSearch.style.display = speakerSearchTerm ? 'block' : 'none';

        const filteredTalks = allTalks.filter(talk => {
            const matchesCategory = talk.category.some(cat => cat.toLowerCase().includes(categorySearchTerm));
            const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));
            return matchesCategory && matchesSpeaker;
        });
        renderSchedule(filteredTalks);
    }

    categorySearchInput.addEventListener('keyup', filterAndRenderTalks);
    speakerSearchInput.addEventListener('keyup', filterAndRenderTalks);

    clearCategorySearch.addEventListener('click', () => {
        categorySearchInput.value = '';
        filterAndRenderTalks();
    });

    clearSpeakerSearch.addEventListener('click', () => {
        speakerSearchInput.value = '';
        filterAndRenderTalks();
    });

    fetchTalks();
});
