import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      )
    }

    // Convert file to text
    let fileText = ''

    if (file.type === 'application/pdf') {
      // For PDF files, you would typically use a PDF parsing library
      // For now, we'll simulate the text extraction
      fileText = await extractTextFromPDF(file)
    } else {
      // For Word documents, you would use a DOCX parsing library
      fileText = await extractTextFromDocx(file)
    }

    if (!fileText || fileText.length < 100) {
      return NextResponse.json(
        { error: 'Could not extract sufficient text from the document. Please ensure the document contains readable text.' },
        { status: 400 }
      )
    }

    // Use OpenAI to parse the CV
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume parser. Extract structured information from the CV text provided.

          Return a JSON object with the following structure:
          {
            "skills": ["skill1", "skill2", "skill3"],
            "experience": [
              {
                "title": "Job Title",
                "company": "Company Name",
                "duration": "2020-2023",
                "description": "Brief description of responsibilities and achievements"
              }
            ],
            "education": [
              {
                "degree": "Degree Name",
                "institution": "University Name",
                "year": "2020"
              }
            ],
            "summary": "Brief professional summary"
          }

          Focus on technical skills, software proficiency, and relevant experience.
          Extract at least 5-10 key skills and all work experience.
          Ensure the response is valid JSON.`
        },
        {
          role: "user",
          content: `Parse this CV text and extract structured information:\n\n${fileText}`
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })

    const parsedData = JSON.parse(completion.choices[0].message.content || '{}')

    // Validate and clean the parsed data
    const cleanedData = {
      skills: Array.isArray(parsedData.skills) ? parsedData.skills.filter(Boolean).slice(0, 20) : [],
      experience: Array.isArray(parsedData.experience)
        ? parsedData.experience.filter(exp => exp.title && exp.company).slice(0, 10)
        : [],
      education: Array.isArray(parsedData.education) ? parsedData.education.filter(Boolean) : [],
      summary: parsedData.summary || ''
    }

    return NextResponse.json({
      success: true,
      data: cleanedData
    })

  } catch (error) {
    console.error('Error parsing CV:', error)
    return NextResponse.json(
      { error: 'Failed to parse CV. Please try again or use manual input.' },
      { status: 500 }
    )
  }
}

// Helper functions for file processing
async function extractTextFromPDF(file: File): Promise<string> {
  // In a real implementation, you would use a library like pdf-parse or pdfjs-dist
  // For now, we'll return a placeholder text
  return `
    John Doe
    Software Engineer

    SUMMARY
    Experienced software engineer with 5+ years of experience in full-stack development.

    SKILLS
    JavaScript, React, Node.js, Python, AWS, Docker, Git, TypeScript, MongoDB, PostgreSQL

    EXPERIENCE
    Senior Software Engineer | Tech Corp | 2021-Present
    - Developed and maintained web applications using React and Node.js
    - Led a team of 3 developers
    - Improved application performance by 40%

    Software Engineer | Startup Inc | 2019-2021
    - Built RESTful APIs and responsive user interfaces
    - Worked in an agile development environment
    - Collaborated with cross-functional teams

    EDUCATION
    Bachelor of Science in Computer Science
    University of Technology | 2015-2019
  `
}

async function extractTextFromDocx(file: File): Promise<string> {
  // In a real implementation, you would use a library like mammoth.js
  // For now, we'll return a placeholder text
  return `
    Jane Smith
    Product Manager

    Professional Summary
    Product manager with 4 years of experience in tech product development.

    Core Skills
    Product Management, Agile, Scrum, User Research, Data Analysis, SQL, JIRA, Figma, Analytics

    Work Experience
    Product Manager | ProductTech | 2020-Present
    - Led product development for SaaS platform
    - Conducted user research and market analysis
    - Worked with engineering teams to deliver features

    Associate Product Manager | StartupHub | 2018-2020
    - Assisted in product roadmap planning
    - Gathered and analyzed user feedback
    - Created product requirements documents

    Education
    MBA in Technology Management
    Business University | 2016-2018
  `
}