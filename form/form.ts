export interface ResumeData {
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

export const resumeFormElement = document.getElementById("resume-form") as HTMLFormElement;
export const generatedResumeDivElement = document.getElementById("generated-resume");

resumeFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const resumeData: ResumeData = {
    name: (document.getElementById("name-input") as HTMLInputElement).value,
    email: (document.getElementById("email-input") as HTMLInputElement).value,
    phone: (document.getElementById("phone-input") as HTMLInputElement).value,
    degree: (document.getElementById("degree-input") as HTMLInputElement).value,
    university: (
      document.getElementById("university-input") as HTMLInputElement
    ).value,
    graduationYear: (
      document.getElementById("grad-year-input") as HTMLInputElement
    ).value,
    skills: (
      document.getElementById("skills-input") as HTMLTextAreaElement
    ).value
      .split(",")
      .map((skill) => skill.trim()),
    jobTitle: (document.getElementById("job-title-input") as HTMLInputElement)
      .value,
    company: (document.getElementById("company-input") as HTMLInputElement)
      .value,
    jobDescription: (
      document.getElementById("job-desc-input") as HTMLTextAreaElement
    ).value,
  };

  generateResumeHTML(resumeData);
});

function generateResumeHTML(data: ResumeData) {
  if (!generatedResumeDivElement) return;

  generatedResumeDivElement.innerHTML = `
        <section id="personal-info">
            <h1>${data.name}</h1>
            <p>${data.email} | ${data.phone}</p>
        </section>

        <section id="education">
            <h2>Education</h2>
            <div>
                <h3>${data.degree}</h3>
                <p>${data.university} | ${data.graduationYear}</p>
            </div>
        </section>

        <section id="skills">
            <h2>Skills</h2>
            <ul>
                ${data.skills.map((skill) => `<li>${skill}</li>`).join("")}
            </ul>
        </section>

        <section id="work-experience">
            <h2>Work Experience</h2>
            <div>
                <h3>${data.jobTitle}</h3>
                <p>${data.company}</p>
                <p>${data.jobDescription}</p>
            </div>
        </section>
    `;
}
