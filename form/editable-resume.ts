interface ResumeData {
    name: string;
    email: string;
    phone: string;
    degree: string;
    university: string;
    graduationYear: string;
    skills: string[];
    jobTitle: string;
    company: string;
    jobDescription: string;
}

export class ResumeBuilder {
    private resumeData: ResumeData;
    private generatedResumeDiv: HTMLElement | null;

    constructor() {
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

    private initializeResume() {
        this.generateResume();
        this.makeEditable();
        this.setupShareFunctionality();
    }

    private generateResume() {
        if (!this.generatedResumeDiv) return;

        this.generatedResumeDiv.innerHTML = `
            <section id="personal-info">
                <h1 data-field="name">${this.resumeData.name}</h1>
                <p data-field="contact">${this.resumeData.email} | ${this.resumeData.phone}</p>
            </section>

            <section id="education">
                <h2>Education</h2>
                <div>
                    <h3 data-field="degree">${this.resumeData.degree}</h3>
                    <p data-field="university-info">${this.resumeData.university} | ${this.resumeData.graduationYear}</p>
                </div>
            </section>

            <section id="skills">
                <h2>Skills</h2>
                <ul data-field="skills">
                    ${this.resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>

            <section id="work-experience">
                <h2>Work Experience</h2>
                <div>
                    <h3 data-field="job-title">${this.resumeData.jobTitle}</h3>
                    <p data-field="company">${this.resumeData.company}</p>
                    <p data-field="job-description">${this.resumeData.jobDescription}</p>
                </div>
            </section>

            <div id="share-section">
                <button class="btn" id="generate-link">Generate Shareable Link</button>
                <button class="btn" id="download-pdf">Download PDF</button>
                <input type="text" id="share-link" readonly>
            </div>
        `;
    }

    private makeEditable() {
        const editableElements = this.generatedResumeDiv?.querySelectorAll('[data-field]');
        
        editableElements?.forEach(element => {
            element.setAttribute('contenteditable', 'true');
            element.addEventListener('blur', () => this.updateResumeData(element));
        });
    }

    private updateResumeData(element: Element) {
        const field = element.getAttribute('data-field');
        const newValue = element.textContent?.trim() || '';

        switch(field) {
            case 'name':
                this.resumeData.name = newValue;
                break;
            case 'contact':
                const [email, phone] = newValue.split('|').map(s => s.trim());
                this.resumeData.email = email;
                this.resumeData.phone = phone;
                break;
            case 'degree':
                this.resumeData.degree = newValue;
                break;
            case 'university-info':
                const [university, graduationYear] = newValue.split('|').map(s => s.trim());
                this.resumeData.university = university;
                this.resumeData.graduationYear = graduationYear;
                break;
            case 'skills':
                this.resumeData.skills = newValue.split('\n').map(s => s.trim()).filter(s => s);
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
    }

    private setupShareFunctionality() {
        const generateLinkBtn = document.getElementById('generate-link');
        const downloadPdfBtn = document.getElementById('download-pdf');
        const shareLinkInput = document.getElementById('share-link') as HTMLInputElement;

        generateLinkBtn?.addEventListener('click', () => {
            // Generate a unique username-based URL (simplified version)
            const username = this.resumeData.name.toLowerCase().replace(/\s+/g, '-');
            const shareUrl = `https://${username}.vercel.app/resume`;
            shareLinkInput.value = shareUrl;
        });

        downloadPdfBtn?.addEventListener('click', () => {
            // Basic PDF generation (would require a library in a real-world scenario)
            window.print();
        });
    }
}

// Initialize the resume builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});
