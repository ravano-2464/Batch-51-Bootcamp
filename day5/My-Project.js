const data = [];

function submitData(event) {
    event.preventDefault();

    const title = getValueById('inputMyProject');
    const startDate = getValueById('startDate');
    const endDate = getValueById('endDate');
    const content = getValueById('inputContent');

    const technologies = [];
    const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        technologies.push(checkbox.nextSibling.textContent.trim());
    });

    const imageFile = document.getElementById('inputImage').files[0];

    if (!isValidInput(title, startDate, endDate, content, technologies, imageFile)) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const image = e.target.result;

        const project = {
            title,
            startDate,
            endDate,
            content,
            technologies,
            image,
        };

        data.push(project);
        renderProjects();
    };

    reader.readAsDataURL(imageFile);

    resetFormFields();
}

function getValueById(id) {
    return document.getElementById(id).value.trim();
}

function isValidInput(title, startDate, endDate, content, technologies, imageFile) {
    if (!title || !startDate || !endDate || !content || technologies.length === 0 || !imageFile) {
        showAlert('Please fill in all fields and select at least one technology.');
        return false;
    }

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedImageTypes.includes(imageFile.type)) {
        showAlert('Please upload a valid image file (JPEG, PNG, or GIF).');
        return false;
    }

    return true;
}

function showAlert(message) {
    alert(message);
}

function resetFormFields() {
    const formFields = ['inputMyProject', 'startDate', 'endDate', 'inputContent', 'inputImage'];
    formFields.forEach((field) => {
        document.getElementById(field).value = '';
    });

    const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
}

function renderProjects() {
    const contents = document.getElementById('contents');
    contents.innerHTML = '';

    data.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>Start Date: ${project.startDate}</p>
            <p>End Date: ${project.endDate}</p>
            <p>Description: ${project.content}</p>
            <p>Technologies: ${project.technologies.join(', ')}</p>
            <img src="${project.image}" alt="${project.title}" />
        `;

        contents.appendChild(projectCard);
    });
}