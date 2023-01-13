window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    const selectTag = document.getElementById('conference');
    if (response.ok) {
        const data = await response.json();
        console.log(data)

        for (let conference of data.conferences) {
            let option = document.createElement('option');

            option.value = conference.id;
            option.innerHTML = conference.name;

            selectTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData((formTag));
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
            console.log(newPresentation);
        }

    });

});
