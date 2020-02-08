// AXIOS SETUP
const service = axios.create({
    baseURL: process.env.SITE_URL + ':' + process.env.PORT
});


// VARIABLES
const button = document.getElementById("btn_new_tag");


// CRUD
function createTag(payload) {
    console.log(payload)
    service.post(`/tag-add`, {
            payload
        })
        .then(apiRes => renderTag(apiRes))
        .catch(apiErr => console.error(apiErr));
}

function deleteStyle(id) {
    service.delete(`${service.baseURL}/tag-delete/${id}`)
        .then(apiRes => deleteTag(apiRes.data))
        .catch(apiErr => console.error(apiErr));
}

// DOM
function resetField() {
    tagInput.value = ""
}

function renderTag(newTag) {
    field.innerHTML += `<div data-type-id="${newTag.data._id}" class="tag-box">
    <div class="tag-box-name">${newTag.data.label}</div>
  </div>`
}

// LISTENERS
button.onclick = () => {
    createTag(tagInput.value);
    resetField();
}