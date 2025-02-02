var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var ResumeGenerator = /** @class */ (function () {
    function ResumeGenerator(formData) {
        this.resumeId = this.generateUniqueId();
        this.resumeData = __assign(__assign({}, formData), { skills: formData.skills.split(',').map(function (skill) { return skill.trim(); }), id: this.resumeId });
    }
    ResumeGenerator.prototype.generateUniqueId = function () {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    };
    ResumeGenerator.prototype.generateResumeHTML = function () {
        return "\n            <div id=\"resume-content\" class=\"resume\" contenteditable=\"true\">\n                <header>\n                    <h1>".concat(this.resumeData.personalInfo.name, "</h1>\n                    <p>\n                        ").concat(this.resumeData.personalInfo.email, " | \n                        ").concat(this.resumeData.personalInfo.phone || '', " |\n                        ").concat(this.resumeData.personalInfo.linkedin || '', "\n                    </p>\n                </header>\n                \n                <section>\n                    <h2>Professional Summary</h2>\n                    <p>").concat(this.resumeData.personalInfo.summary, "</p>\n                </section>\n                \n                <section>\n                    <h2>Education</h2>\n                    <p>\n                        ").concat(this.resumeData.education.degree, " - \n                        ").concat(this.resumeData.education.university, ", \n                        ").concat(this.resumeData.education.graduationYear, "\n                    </p>\n                </section>\n                \n                <section>\n                    <h2>Skills</h2>\n                    <ul>\n                        ").concat(this.resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                    </ul>\n                </section>\n                \n                <section>\n                    <h2>Work Experience</h2>\n                    <p>\n                        ").concat(this.resumeData.workExperience.jobTitle, " at \n                        ").concat(this.resumeData.workExperience.company, " - \n                        ").concat(this.resumeData.workExperience.duration, "\n                    </p>\n                </section>\n            </div>\n        ");
    };
    ResumeGenerator.prototype.saveResume = function () {
        var resumeDatabase = this.getResumeDatabase();
        resumeDatabase[this.resumeId] = this.resumeData;
        localStorage.setItem('resume_database', JSON.stringify(resumeDatabase));
    };
    ResumeGenerator.prototype.downloadResume = function () {
        var element = document.getElementById('resume-content');
        if (!element)
            return;
        var doc = new Document();
        var printWindow = window.open('', '', 'height=500, width=500');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Resume</title>');
            printWindow.document.write("\n                <style>\n                    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; }\n                    h1, h2 { color: #333; }\n                    section { margin-bottom: 20px; }\n                </style>\n            ");
            printWindow.document.write('</head><body>');
            printWindow.document.write(element.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    };
    ResumeGenerator.prototype.getResumeDatabase = function () {
        var database = localStorage.getItem('resume_database');
        return database ? JSON.parse(database) : {};
    };
    ResumeGenerator.findResumeByID = function (id) {
        var resumeDatabase = JSON.parse(localStorage.getItem('resume_database') || '{}');
        return resumeDatabase[id] || null;
    };
    return ResumeGenerator;
}());
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = {
        personalInfo: {
            name: document.getElementById('name-input').value,
            email: document.getElementById('email-input').value,
            phone: document.getElementById('phone-input').value,
            summary: document.getElementById('Summary').value,
            linkedin: document.getElementById('linkedin-input').value
        },
        education: {
            degree: document.getElementById('degree-input').value,
            university: document.getElementById('university-input').value,
            graduationYear: document.getElementById('grad-year-input').value
        },
        skills: document.getElementById('skills-input').value,
        workExperience: {
            jobTitle: document.getElementById('job-title-input').value,
            company: document.getElementById('company-input').value,
            duration: document.getElementById('experience').value
        }
    };
    var resumeGenerator = new ResumeGenerator(formData);
    var generatedResumeHTML = resumeGenerator.generateResumeHTML();
    var resumeContainer = document.getElementById('generated-resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generatedResumeHTML;
    }
    resumeGenerator.saveResume();
    var downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Resume';
    downloadButton.onclick = function () { return resumeGenerator.downloadResume(); };
    resumeContainer === null || resumeContainer === void 0 ? void 0 : resumeContainer.appendChild(downloadButton);
    var shareButton = document.createElement('button');
    shareButton.textContent = 'Share Resume Link';
    shareButton.onclick = function () {
        var resumeId = resumeGenerator['resumeId'];
        var shareLink = "".concat(window.location.origin).concat(window.location.pathname, "?resumeId=").concat(resumeId);
        navigator.clipboard.writeText(shareLink).then(function () {
            alert('Resume link copied to clipboard!');
        });
    };
    resumeContainer === null || resumeContainer === void 0 ? void 0 : resumeContainer.appendChild(shareButton);
});
// Check for resume ID in URL on page load
window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeId = urlParams.get('resumeId');
    if (resumeId) {
        var resumeData = ResumeGenerator.findResumeByID(resumeId);
        if (resumeData) {
            var resumeGenerator = new ResumeGenerator(resumeData);
            var generatedResumeHTML = resumeGenerator.generateResumeHTML();
            var resumeContainer = document.getElementById('generated-resume');
            if (resumeContainer) {
                resumeContainer.innerHTML = generatedResumeHTML;
            }
        }
    }
});
