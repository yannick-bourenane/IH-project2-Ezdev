const roleTeacher = document.getElementById('role_teacher');
const roleStudent = document.getElementById('role_student');
const teacherInputs = document.getElementById('teacher_inputs')
const avatar = document.getElementById('input-file')
const languages = document.querySelectorAll('.language_logo');

avatar.oninput = () => {
    document.querySelector('.avatar').remove();
}


roleTeacher.oninput = () => {
    roleTeacher.toggleAttribute('checked')
    roleStudent.toggleAttribute('checked')
    teacherInputs.classList.add('show');
    teacherInputs.querySelector('input').toggleAttribute('disabled')
}
roleStudent.oninput = () => {
    roleTeacher.toggleAttribute('checked')
    roleStudent.toggleAttribute('checked')
    teacherInputs.classList.remove('show');
    teacherInputs.querySelector('input').toggleAttribute('disabled')
    languages.forEach(input => {
        input.classList.remove('selected')
        input.querySelector('input[type="hidden"]').disabled = true
    })

}
languages.forEach(language => {
    language.onclick = () => {
        language.classList.toggle('selected')
        language.querySelector('input[type="hidden"]').toggleAttribute('disabled')
    }
})