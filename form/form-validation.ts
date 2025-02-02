class ResumeGenerator {
    private resumeId: string;
    private resumeData: any;

    constructor(formData: any) {
        this.resumeId = this.generateUniqueId();
        this.resumeData = {
            ...formData,
            skills: formData.skills.split(',').map((skill: string) => skill.trim()),
            id: this.resumeId
        };
    }

    private generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }

    generateResumeHTML(): string {
        return `
            <div id="resume-content" class="resume" contenteditable="true">
                <header>
                    <h1>${this.resumeData.personalInfo.name}</h1>
                    <p>
                        ${this.resumeData.personalInfo.email} | 
                        ${this.resumeData.personalInfo.phone || ''} |
                        ${this.resumeData.personalInfo.linkedin || ''}
                    </p>
                </header>
                
                <section>
                    <h2>Professional Summary</h2>
                    <p>${this.resumeData.personalInfo.summary}</p>
                </section>
                
                <section>
                    <h2>Education</h2>
                    <p>
                        ${this.resumeData.education.degree} - 
                        ${this.resumeData.education.university}, 
                        ${this.resumeData.education.graduationYear}
                    </p>
                </section>
                
                <section>
                    <h2>Skills</h2>
                    <ul>
                        ${this.resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('')}
                    </ul>
                </section>
                
                <section>
                    <h2>Work Experience</h2>
                    <p>
                        ${this.resumeData.workExperience.jobTitle} at 
                        ${this.resumeData.workExperience.company} - 
                        ${this.resumeData.workExperience.duration}
                    </p>
                </section>
            </div>
        `;
    }

    saveResume(): void {
        const resumeDatabase = this.getResumeDatabase();
        resumeDatabase[this.resumeId] = this.resumeData;
        localStorage.setItem('resume_database', JSON.stringify(resumeDatabase));
    }

    downloadResume(): void {
        const element = document.getElementById('resume-content');
        if (!element) return;

        const doc = new Document();
        const printWindow = window.open('', '', 'height=500, width=500');
        
        if (printWindow) {
            printWindow.document.write('<html><head><title>Resume</title>');
            printWindow.document.write(`
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; }
                    h1, h2 { color: #333; }
                    section { margin-bottom: 20px; }
                </style>
            `);
            printWindow.document.write('</head><body>');
            printWindow.document.write(element.innerHTML);
            printWindow.document.write('</body></html>');
            
            printWindow.document.close();
            printWindow.print();
        }
    }

    private getResumeDatabase(): { [key: string]: any } {
        const database = localStorage.getItem('resume_database');
        return database ? JSON.parse(database) : {};
    }

    static findResumeByID(id: string): any {
        const resumeDatabase = JSON.parse(
            localStorage.getItem('resume_database') || '{}'
        );
        return resumeDatabase[id] || null;
    }
}

document.getElementById('resume-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        personalInfo: {
            name: (document.getElementById('name-input') as HTMLInputElement).value,
            email: (document.getElementById('email-input') as HTMLInputElement).value,
            phone: (document.getElementById('phone-input') as HTMLInputElement).value,
            summary: (document.getElementById('Summary') as HTMLTextAreaElement).value,
            linkedin: (document.getElementById('linkedin-input') as HTMLInputElement).value
        },
        education: {
            degree: (document.getElementById('degree-input') as HTMLInputElement).value,
            university: (document.getElementById('university-input') as HTMLInputElement).value,
            graduationYear: (document.getElementById('grad-year-input') as HTMLInputElement).value
        },
        skills: (document.getElementById('skills-input') as HTMLTextAreaElement).value,
        workExperience: {
            jobTitle: (document.getElementById('job-title-input') as HTMLInputElement).value,
            company: (document.getElementById('company-input') as HTMLInputElement).value,
            duration: (document.getElementById('experience') as HTMLInputElement).value
        }
    };

    const resumeGenerator = new ResumeGenerator(formData);
    const generatedResumeHTML = resumeGenerator.generateResumeHTML();
    
    const resumeContainer = document.getElementById('generated-resume');
    if (resumeContainer) {
        resumeContainer.innerHTML = generatedResumeHTML;
    }

    resumeGenerator.saveResume();
    
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Resume';
    downloadButton.onclick = () => resumeGenerator.downloadResume();
    resumeContainer?.appendChild(downloadButton);

    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share Resume Link';
    shareButton.onclick = () => {
        const resumeId = resumeGenerator['resumeId'];
        const shareLink = `${window.location.origin}${window.location.pathname}?resumeId=${resumeId}`;
        navigator.clipboard.writeText(shareLink).then(() => {
            alert('Resume link copied to clipboard!');
        });
    };
    resumeContainer?.appendChild(shareButton);
});

// Check for resume ID in URL on page load
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('resumeId');
    
    if (resumeId) {
        const resumeData = ResumeGenerator.findResumeByID(resumeId);
        if (resumeData) {
            const resumeGenerator = new ResumeGenerator(resumeData);
            const generatedResumeHTML = resumeGenerator.generateResumeHTML();
            
            const resumeContainer = document.getElementById('generated-resume');
            if (resumeContainer) {
                resumeContainer.innerHTML = generatedResumeHTML;
            }
        }
    }
});