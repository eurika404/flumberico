# 🎯 Flumberico Funnel Logic Revision Prompt

The current funnel doesn't make sense.  
It can already tell users which positions they're suited for **without even knowing their name, LinkedIn URL, or uploaded CV** — this breaks logic and credibility.

## 🧩 Task
Redesign the **user onboarding and matching funnel** so it works logically and makes sense for real users.

## 🧠 Requirements

1. **Fix the funnel logic around user data input:**
   - The system must not suggest job matches before knowing the user's basic info.
   - Collect user data in order:
     1️⃣ Name and Email  
     2️⃣ LinkedIn URL or CV Upload  
     3️⃣ (Optional) Add work experience details manually  

2. **Add a new section: “Add Your Experience”**
   - Let users input their professional experience, roles, or skills.  
   - Example placeholder:  
     > “Tell Flumberico about your past roles or skills (e.g., Marketing Manager, UX Design, Data Analysis).”

3. **Then generate suggestions in: “Your AI-Matched Jobs”**
   - AI should base job suggestions strictly on the uploaded CV or entered experience.  
   - Example output:  
     > “Based on your experience, here are 3 top-matching roles.”  
     - Product Marketing Manager — 92% Match  
     - UX Researcher — 88% Match  
     - Content Strategist — 85% Match  

4. **Ensure flow feels natural and credible:**
   - Users understand how AI generated the matches.
   - No fake or “magic” results before data input.
   - Keep the tone friendly and professional.

## ✅ Goal
A logical, easy-to-follow funnel where:
- Users first provide minimal input (name + CV/experience).
- Then AI generates relevant job matches.
- The result feels believable and trust-building.
