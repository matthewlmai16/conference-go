
function createCard (name, location, description, pictureUrl, start, end) {
    return `
        <div class="col">
            <div class="card shadow p-3 bg-body-tertiary rounded">
                <div class="col">
                    <img src="${pictureUrl}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                        <p class="card-text">${description}</p>
                        <div class="card-footer">${start} - ${end}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const location = details.conference.location.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = new Date(details.conference.starts);
                    const start = startDate.toLocaleDateString();
                    const endDate = new Date(details.conference.ends);
                    const end = endDate.toLocaleDateString();
                    const html = createCard(name, location, description, pictureUrl, start, end);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;

                }
            }
        }
        else {
            throw new Error('Response is not ok');
        }
    }
    catch(error) {
        console.error('Error', error)
    }

});
