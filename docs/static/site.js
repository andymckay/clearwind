
function setupSubscribe(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let url = 'https://notifications.clearwind.ca/rss/subscribe/2f583c34-3340-4efd-acbb-204caba50e94'
        let formData = new FormData();
        formData.append('email', form.querySelector('input').value);
        let options = {
            method: 'POST',
            mode: 'cors',
            body: formData,
        }
        fetch(url, options).then((response) => {
            if (!response.ok) {
                form.querySelector('button').textContent = 'Something went wrong. Try again?';
            }
            else {
                form.querySelector('button').textContent = 'Done, thank you.';
                form.querySelector('button').classList.add('btn-success');
            }
        })
    });
}

let setup = JSON.stringify({
    "name": "Service Catalog",
    "url": "https://github.com/clearwind-ca/service-catalog",
    "public": true,
    "redirect_url": "https://clearwind.ca"
})

function setupCreate(form) {
    console.log(form)

    form.querySelector("input.manifest").value = setup;
}

window.addEventListener("load", (event) => {
    let subscribe = document.getElementById('subscribe')
    if (subscribe) { setupSubscribe(subscribe) }

    let personal = document.getElementById('create-personal')
    if (personal) { setupCreate(personal) }

    let org = document.getElementById('create-org')
    if (org) { setupCreate(org) }
});