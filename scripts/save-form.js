const checkbox = `<div class="form-item form__item form__item--checkbox form__item--save-form"> <input
        data-drupal-selector="edit-save-form" aria-describedby="edit-save-form--description" type="checkbox"
        id="edit-save-form" name="save-form" value="1" class="form-checkbox form__checkbox"> <label for="edit-save-form"
        class="form__option"> Зберегти форму </label>
</div>`;

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

const saveFormFn = (e) => {
    const checkboxId = 'edit-save-form';
    const saveFornCheckbox = document.getElementById(checkboxId);
    console.log(saveFornCheckbox, saveFornCheckbox.value);
    if (!saveFornCheckbox || !saveFornCheckbox.value) {
        return;
    }

    const form = e.target;
    const formData = new FormData(form);
    localStorage.setItem(form.id, JSON.stringify({ ...Object.fromEntries(formData), [checkboxId]: true, }));
}

const disconnectionFormId = 'disconnection-detailed-search-form';
const form = document.getElementById(disconnectionFormId);
if (form) {
    const inputFieldsWrapperClass = 'fields_wrapper';
    const inputFielsWrapper = form.getElementsByClassName(inputFieldsWrapperClass)[0];

    if (inputFielsWrapper) {
        inputFielsWrapper.appendChild(createElementFromHTML(checkbox));

        const formData = JSON.parse(localStorage.getItem(form.id)) || [];
        Array.from(form.querySelectorAll('input')).forEach((input, id) => {
            const data = formData[id];
            if (data) {
                input.value = data;
                // var event = document.createEvent("HTMLEvents");
                // event.initEvent("input", true, true);
                // input.dispatchEvent(event);
            }
           
        });

        form.onsubmit = saveFormFn;
        form.requestSubmit();
    } else {
        console.warn('No input fiels wrapper found');
    }
} else {
    console.warn('No form found, nothing to save');
}






