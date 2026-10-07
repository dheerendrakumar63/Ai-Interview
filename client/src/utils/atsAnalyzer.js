/**
 * ATS Resume Analyzer Engine
 * Modular weighted scoring algorithm comparing resume content against job descriptions.
 */

// Skill Dictionary for extraction
const TECH_SKILLS = [
  "react", "react.js", "next.js", "vue", "angular", "node.js", "express", "express.js",
  "javascript", "typescript", "html", "html5", "css", "css3", "tailwind", "bootstrap",
  "mongodb", "postgresql", "mysql", "sql", "redis", "firebase", "graphql", "rest api",
  "python", "java", "c++", "c#", "go", "golang", "php", "ruby", "django", "flask",
  "aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "jenkins", "git", "github",
  "jira", "agile", "scrum", "microservices", "unit testing", "jest", "cypress", "webpack",
  "system design", "data structures", "algorithms", "redux", "ui/ux", "figma"
];

const GENERAL_KEYWORDS = [
  "bachelor", "master", "degree", "computer science", "engineering", "software engineer",
  "full stack", "frontend", "backend", "developer", "lead", "senior", "junior", "experience",
  "years", "team", "project", "management", "architecture", "optimization", "performance",
  "security", "scalable", "responsive", "collaboration", "communication", "problem solving"
];

export function analyzeAtsMatch(resumeText = "", jobDescription = "", jobTitle = "") {
  const normResume = (resumeText || "").toLowerCase();
  const normJd = (jobDescription || "").toLowerCase();
  const normTitle = (jobTitle || "").toLowerCase();

  // 1. Extract Skills from JD & Resume
  const jdSkills = TECH_SKILLS.filter(skill => normJd.includes(skill));
  const resumeSkills = TECH_SKILLS.filter(skill => normResume.includes(skill));

  // If JD is empty/short, fall back to checking general skills in resume
  const targetSkills = jdSkills.length > 0 ? jdSkills : ["javascript", "react", "node.js", "express", "mongodb", "html", "css", "git"];

  const matchedSkillsRaw = targetSkills.filter(skill => normResume.includes(skill));
  const missingKeywordsRaw = targetSkills.filter(skill => !normResume.includes(skill));

  // Capitalize tags for display
  const formatTag = (str) =>
    str
      .split(/[\s.-]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const matchedSkills = [...new Set(matchedSkillsRaw)].map(formatTag);
  const missingKeywords = [...new Set(missingKeywordsRaw)].map(formatTag);

  // 2. Score Components
  // A. Skills Match (30%)
  const skillsMatch = targetSkills.length > 0
    ? Math.min(100, Math.round((matchedSkillsRaw.length / targetSkills.length) * 100))
    : 75;

  // B. Keywords Match (25%)
  const jdKeywords = GENERAL_KEYWORDS.filter(k => normJd.includes(k));
  const targetKeywords = jdKeywords.length > 0 ? jdKeywords : ["experience", "developer", "project", "degree", "team"];
  const matchedKeywords = targetKeywords.filter(k => normResume.includes(k));
  const keywordsMatch = targetKeywords.length > 0
    ? Math.min(100, Math.round((matchedKeywords.length / targetKeywords.length) * 100))
    : 70;

  // C. Experience Match (15%)
  const hasExpTerms = /years|experience|worked|built|developed|managed/i.test(normResume);
  const expMatch = hasExpTerms ? (normResume.length > 400 ? 90 : 70) : 40;

  // D. Education Match (10%)
  const hasEduTerms = /bachelor|master|b\.tech|btech|degree|university|college|computer science/i.test(normResume);
  const eduMatch = hasEduTerms ? 90 : 50;

  // E. Job Title / Relevance Match (10%)
  const titleMatch = normTitle
    ? (normResume.includes(normTitle) ? 100 : 60)
    : (normResume.includes("developer") || normResume.includes("engineer") ? 85 : 65);

  // F. Responsibilities Match (10%)
  const hasActionVerbs = /implemented|architected|created|designed|optimized|led|maintained/i.test(normResume);
  const respMatch = hasActionVerbs ? 88 : 55;

  // 3. Calculate Weighted Overall ATS Score
  const rawScore = Math.round(
    0.30 * skillsMatch +
    0.25 * keywordsMatch +
    0.15 * expMatch +
    0.10 * eduMatch +
    0.10 * titleMatch +
    0.10 * respMatch
  );

  const overallScore = Math.min(98, Math.max(25, rawScore));

  // Determine Match Category
  let category = "Low Match";
  let categoryColor = "#ef4444";
  if (overallScore >= 80) {
    category = "Excellent Match";
    categoryColor = "#22c55e";
  } else if (overallScore >= 60) {
    category = "Good Match";
    categoryColor = "#3b82f6";
  } else if (overallScore >= 40) {
    category = "Moderate Match";
    categoryColor = "#f97316";
  }

  // 4. Generate Strengths
  const strengths = [];
  if (matchedSkills.length >= 3) {
    strengths.push(`Strong alignment with key core skills (${matchedSkills.slice(0, 4).join(", ")})`);
  } else {
    strengths.push("Clear technical background and project experience mentioned");
  }
  if (hasEduTerms) {
    strengths.push("Relevant education & academic background highlighted");
  }
  if (hasActionVerbs) {
    strengths.push("Uses strong action verbs to describe responsibilities and projects");
  }
  if (normResume.length > 500) {
    strengths.push("Comprehensive content with detailed experience sections");
  }

  // 5. Generate Actionable Improvement Suggestions
  const suggestions = [];
  if (missingKeywords.length > 0) {
    suggestions.push(`Add missing technical keywords where applicable: ${missingKeywords.slice(0, 4).join(", ")}`);
  }
  if (!hasEduTerms) {
    suggestions.push("Specify degree and educational background (e.g. Bachelor's in Computer Science)");
  }
  suggestions.push("Include quantifiable metrics and achievements (e.g., 'Improved performance by 30%')");
  suggestions.push("Optimize your professional summary with target job title keywords");
  if (!hasActionVerbs) {
    suggestions.push("Start bullet points with strong action verbs like 'Designed', 'Architected', 'Deployed'");
  }

  return {
    overallScore,
    category,
    categoryColor,
    breakdown: {
      skillsMatch,
      keywordsMatch,
      experienceMatch: expMatch,
      educationMatch: eduMatch,
    },
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ["JavaScript", "React", "HTML/CSS"],
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : ["Docker", "AWS", "CI/CD"],
    totalFound: matchedSkills.length + matchedKeywords.length,
    totalMissing: missingKeywords.length,
    strengths,
    suggestions,
    jobTitle: jobTitle || "Full Stack Developer",
  };
}
