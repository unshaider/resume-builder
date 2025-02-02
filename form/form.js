"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedResumeDivElement = exports.resumeFormElement = void 0;
exports.resumeFormElement = document.getElementById("resume-form");
exports.generatedResumeDivElement = document.getElementById("generated-resume");
exports.resumeFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
    var resumeData = {
        name: document.getElementById("name-input").value,
        email: document.getElementById("email-input").value,
        phone: document.getElementById("phone-input").value,
        degree: document.getElementById("degree-input").value,
        university: document.getElementById("university-input").value,
        graduationYear: document.getElementById("grad-year-input").value,
        skills: document.getElementById("skills-input").value
            .split(",")
            .map(function (skill) { return skill.trim(); }),
        jobTitle: document.getElementById("job-title-input")
            .value,
        company: document.getElementById("company-input")
            .value,
        jobDescription: document.getElementById("job-desc-input").value,
    };
    generateResumeHTML(resumeData);
});
function generateResumeHTML(data) {
    if (!exports.generatedResumeDivElement)
        return;
    exports.generatedResumeDivElement.innerHTML = "\n        <section id=\"personal-info\">\n            <h1>".concat(data.name, "</h1>\n            <p>").concat(data.email, " | ").concat(data.phone, "</p>\n        </section>\n\n        <section id=\"education\">\n            <h2>Education</h2>\n            <div>\n                <h3>").concat(data.degree, "</h3>\n                <p>").concat(data.university, " | ").concat(data.graduationYear, "</p>\n            </div>\n        </section>\n\n        <section id=\"skills\">\n            <h2>Skills</h2>\n            <ul>\n                ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n            </ul>\n        </section>\n\n        <section id=\"work-experience\">\n            <h2>Work Experience</h2>\n            <div>\n                <h3>").concat(data.jobTitle, "</h3>\n                <p>").concat(data.company, "</p>\n                <p>").concat(data.jobDescription, "</p>\n            </div>\n        </section>\n    ");
}
