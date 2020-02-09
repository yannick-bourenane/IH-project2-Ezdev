const roleTeacher = document.getElementById('role_teacher');
const roleStudent = document.getElementById('role_student');
const teacherInputs = document.getElementById('teacher_inputs')
const languages = document.querySelectorAll('.language_logo');

roleTeacher.oninput = () => {
    teacherInputs.classList.add('show');
    teacherInputs.querySelector('input').toggleAttribute('disabled')
}
roleStudent.oninput = () => {
    teacherInputs.classList.remove('show');
    teacherInputs.querySelector('input').toggleAttribute('disabled')
    languages.forEach(input => {
        input.querySelector('i').classList.remove('selected')
        input.querySelector('input[type="hidden"]').disabled = true
    })

}
languages.forEach(language => {
    language.onclick = () => {
        language.querySelector('i').classList.toggle('selected')
        language.querySelector('input[type="hidden"]').toggleAttribute('disabled')
    }
})