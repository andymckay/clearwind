
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
            }
        })
    });

}

window.addEventListener("load", (event) => {
    let subscribe = document.getElementById('subscribe')
    setupSubscribe(subscribe)
});