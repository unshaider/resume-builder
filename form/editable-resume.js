"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeBuilder = void 0;
var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.resumeData = {
            name: 'Your Name',
            email: 'email@example.com',
            phone: '123-456-7890',
            degree: 'Bachelor of Science',
            university: 'University Name',
            graduationYear: '2024',
            skills: ['Skill 1', 'Skill 2'],
            jobTitle: 'Job Title',
            company: 'Company Name',
            jobDescription: 'Job responsibilities'
        };
        this.generatedResumeDiv = document.getElementById('generated-resume');
        this.initializeResume();
    }
    ResumeBuilder.prototype.initializeResume = function () {
        this.generateResume();
        this.makeEditable();
        this.setupShareFunctionality();
    };
    ResumeBuilder.prototype.generateResume = function () {
        if (!this.generatedResumeDiv)
            return;
        this.generatedResumeDiv.innerHTML = "\n            <section id=\"personal-info\">\n                <h1 data-field=\"name\">".concat(this.resumeData.name, "</h1>\n                <p data-field=\"contact\">").concat(this.resumeData.email, " | ").concat(this.resumeData.phone, "</p>\n            </section>\n\n            <section id=\"education\">\n                <h2>Education</h2>\n                <div>\n                    <h3 data-field=\"degree\">").concat(this.resumeData.degree, "</h3>\n                    <p data-field=\"university-info\">").concat(this.resumeData.university, " | ").concat(this.resumeData.graduationYear, "</p>\n                </div>\n            </section>\n\n            <section id=\"skills\">\n                <h2>Skills</h2>\n                <ul data-field=\"skills\">\n                    ").concat(this.resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n\n            <section id=\"work-experience\">\n                <h2>Work Experience</h2>\n                <div>\n                    <h3 data-field=\"job-title\">").concat(this.resumeData.jobTitle, "</h3>\n                    <p data-field=\"company\">").concat(this.resumeData.company, "</p>\n                    <p data-field=\"job-description\">").concat(this.resumeData.jobDescription, "</p>\n                </div>\n            </section>\n\n            <div id=\"share-section\">\n                <button class=\"btn\" id=\"generate-link\">Generate Shareable Link</button>\n                <button class=\"btn\" id=\"download-pdf\">Download PDF</button>\n                <input type=\"text\" id=\"share-link\" readonly>\n            </div>\n        ");
    };
    ResumeBuilder.prototype.makeEditable = function () {
        var _this = this;
        var _a;
        var editableElements = (_a = this.generatedResumeDiv) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[data-field]');
        editableElements === null || editableElements === void 0 ? void 0 : editableElements.forEach(function (element) {
            element.setAttribute('contenteditable', 'true');
            element.addEventListener('blur', function () { return _this.updateResumeData(element); });
        });
    };
    ResumeBuilder.prototype.updateResumeData = function (element) {
        var _a;
        var field = element.getAttribute('data-field');
        var newValue = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        switch (field) {
            case 'name':
                this.resumeData.name = newValue;
                break;
            case 'contact':
                var _b = newValue.split('|').map(function (s) { return s.trim(); }), email = _b[0], phone = _b[1];
                this.resumeData.email = email;
                this.resumeData.phone = phone;
                break;
            case 'degree':
                this.resumeData.degree = newValue;
                break;
            case 'university-info':
                var _c = newValue.split('|').map(function (s) { return s.trim(); }), university = _c[0], graduationYear = _c[1];
                this.resumeData.university = university;
                this.resumeData.graduationYear = graduationYear;
                break;
            case 'skills':
                this.resumeData.skills = newValue.split('\n').map(function (s) { return s.trim(); }).filter(function (s) { return s; });
                break;
            case 'job-title':
                this.resumeData.jobTitle = newValue;
                break;
            case 'company':
                this.resumeData.company = newValue;
                break;
            case 'job-description':
                this.resumeData.jobDescription = newValue;
                break;
        }
    };
    ResumeBuilder.prototype.setupShareFunctionality = function () {
        var _this = this;
        var generateLinkBtn = document.getElementById('generate-link');
        var downloadPdfBtn = document.getElementById('download-pdf');
        var shareLinkInput = document.getElementById('share-link');
        generateLinkBtn === null || generateLinkBtn === void 0 ? void 0 : generateLinkBtn.addEventListener('click', function () {
            // Generate a unique username-based URL (simplified version)
            var username = _this.resumeData.name.toLowerCase().replace(/\s+/g, '-');
            var shareUrl = "https://".concat(username, ".vercel.app/resume");
            shareLinkInput.value = shareUrl;
        });
        downloadPdfBtn === null || downloadPdfBtn === void 0 ? void 0 : downloadPdfBtn.addEventListener('click', function () {
            // Basic PDF generation (would require a library in a real-world scenario)
            window.print();
        });
    };
    return ResumeBuilder;
}());
exports.ResumeBuilder = ResumeBuilder;
// Initialize the resume builder when the page loads
document.addEventListener('DOMContentLoaded', function () {
    new ResumeBuilder();
});
