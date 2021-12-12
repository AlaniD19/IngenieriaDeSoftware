/* ONLY IF USER LOGIN FOR FIRST TIME IN PLATFORM */
const type_course = document.getElementById("type_course").value;
const guideButton = document.getElementById('guide');
const freeButton = document.getElementById('free');
const infoGuide = document.querySelector('.guide');
const infoFree = document.querySelector('.free');

if (!type_course) {
    document.querySelector("#type_class").classList.add("active");
} else {
    document.querySelector("#type_class").classList.remove("active");
}
/* DISPLAY OF ALERT */
guideButton.addEventListener('mouseover', function() {
    infoGuide.style.display = "block";
});
guideButton.addEventListener('mouseout', function() {
    infoGuide.style.display = "none";
});
freeButton.addEventListener('mouseover', function() {
    infoFree.style.display = "block";
});
freeButton.addEventListener('mouseout', function() {
    infoFree.style.display = "none";
});

/* REGISTER TYPE OF CLASS */
const formClass = document.querySelector("#form_class");
const formBtn = document.querySelector("#form-btn");

guideButton.addEventListener('click', function() {
    document.getElementById("type_course").value = 0;
    formBtn.click();
});
freeButton.addEventListener('click', function() {
    document.getElementById("type_course").value = 1;
    formBtn.click();
});