import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { linkedInUrl } = await req.json()

    if (!linkedInUrl) {
      return NextResponse.json(
        { error: 'LinkedIn URL is required' },
        { status: 400 }
      )
    }

    // Validate LinkedIn URL format
    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i
    if (!linkedInRegex.test(linkedInUrl)) {
      return NextResponse.json(
        { error: 'Invalid LinkedIn profile URL format' },
        { status: 400 }
      )
    }

    // In a real implementation, you would use a LinkedIn scraping service or API
    // For now, we'll simulate the LinkedIn data extraction
    const linkedInData = await simulateLinkedInDataExtraction(linkedInUrl)

    // Use OpenAI to process and structure the LinkedIn data
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert at parsing LinkedIn profile data. Extract and structure the information provided.

          Return a JSON object with the following structure:
          {
            "name": "Full Name",
            "headline": "Professional headline",
            "summary": "Professional summary",
            "skills": ["skill1", "skill2", "skill3"],
            "experience": [
              {
                "title": "Job Title",
                "company": "Company Name",
                "duration": "2020-Present",
                "description": "Brief description of role and achievements"
              }
            ],
            "education": [
              {
                "degree": "Degree Name",
                "institution": "University Name",
                "year": "2020"
              }
            ]
          }

          Focus on professional skills and relevant experience.
          Extract at least 5-10 key skills and all work experience.
          Ensure the response is valid JSON.`
        },
        {
          role: "user",
          content: `Parse this LinkedIn profile data and extract structured information:\n\n${JSON.stringify(linkedInData, null, 2)}`
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    })

    const parsedData = JSON.parse(completion.choices[0].message.content || '{}')

    // Validate and clean the parsed data
    const cleanedData = {
      name: parsedData.name || 'Unknown',
      headline: parsedData.headline || '',
      summary: parsedData.summary || '',
      skills: Array.isArray(parsedData.skills) ? parsedData.skills.filter(Boolean).slice(0, 20) : [],
      experience: Array.isArray(parsedData.experience)
        ? parsedData.experience.filter(exp => exp.title && exp.company).slice(0, 10)
        : [],
      education: Array.isArray(parsedData.education) ? parsedData.education.filter(Boolean) : []
    }

    return NextResponse.json({
      success: true,
      data: cleanedData
    })

  } catch (error) {
    console.error('Error importing LinkedIn profile:', error)
    return NextResponse.json(
      { error: 'Failed to import LinkedIn profile. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}

// Helper function to simulate LinkedIn data extraction
async function simulateLinkedInDataExtraction(linkedInUrl: string): Promise<any> {
  // In a real implementation, you would:
  // 1. Use a web scraping service like ScraperAPI, Bright Data, or similar
  // 2. Or use LinkedIn's official API if you have access
  // 3. Handle authentication, rate limiting, and anti-scraping measures

  // For demo purposes, we'll return mock data based on the URL
  const username = linkededInUrl.match(/\/in\/([^\/]+)/)?.[1] || 'user'

  return {
    name: `${username.charAt(0).toUpperCase() + username.slice(1)} Smith`,
    headline: "Senior Software Engineer at Tech Company",
    summary: "Passionate software engineer with expertise in full-stack development, cloud architecture, and team leadership. I love building scalable applications and mentoring junior developers.",
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS",
      "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "GraphQL",
      "Microservices", "Agile", "Team Leadership", "System Design"
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Company",
        duration: "2021-Present",
        description: "Leading development of microservices architecture, mentoring team members, and improving system performance by 60%."
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        duration: "2019-2021",
        description: "Developed full-stack applications using React and Node.js, implemented CI/CD pipelines, and collaborated with cross-functional teams."
      },
      {
        title: "Junior Developer",
        company: "WebAgency",
        duration: "2017-2019",
        description: "Built responsive websites, maintained client applications, and participated in agile development processes."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "State University",
        year: "2017"
      }
    ]
  }
}