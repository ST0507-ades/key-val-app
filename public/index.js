// To ensure that the DOM tree is completely loaded.
window.addEventListener('DOMContentLoaded', function () {
    // Q: What is happening here?
    const getKeyInput = document.querySelector('#get-key');
    const getValueSpan = document.querySelector('#get-value');
    const getForm = document.querySelector('#get');

    const setKeyInput = document.querySelector('#set-key');
    const setValueInput = document.querySelector('#set-value');
    const setForm = document.querySelector('#set');

    getForm.onsubmit = function (e) {
        // To prevent default behaviour.
        e.preventDefault(); // Q: What is a form's default behaviour?

        // get the key input value
        const key = getKeyInput.value;

        // Request data from Server
        getValueSpan.textContent = 'loading...';
        fetch(`/api/get?key=${key}`)
            .then(function (response) {
                // Upon receiving a response, convert body to JSON
                return response.json();
            })
            .then(function (json) {
                // Process JSON
                if (json.error) {
                    getValueSpan.textContent = '';
                    return alert(json.error);
                }
                getValueSpan.textContent = json.value;
            });

        return false;
    };

    setForm.onsubmit = function (e) {
        // To prevent default behaviour.
        e.preventDefault();

        // get the key input value
        const key = setKeyInput.value;
        const value = setValueInput.value;

        // Q: What is this for?
        setForm.querySelector('fieldset').disabled = true;
        fetch(`/api/set`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: key,
                value: value,
            }),
        })
            .then(function (response) {
                if (response.status === 201) {
                    return alert('Success!');
                }

                // Look at the backend code, we get a body only if
                // there is an error.
                response.json().then(function (json) {
                    return alert(json.error);
                });
            })
            .finally(function () {
                setForm.querySelector('fieldset').disabled = false;
            });
    };
});
