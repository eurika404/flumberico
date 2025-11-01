# App Flow Document for Flumberico

## Onboarding and Sign-Up

When a new visitor first lands on Flumberico, they arrive at the public-facing landing page via flumberico.com or a shared link. The top of the page displays a clear navigation bar with links to sections like About Us, How It Works, Pricing, FAQ, Contact, Privacy Policy, and Terms of Service. The most prominent call-to-action on the hero section is labeled Join Waitlist. When the visitor clicks this button, the browser navigates to the multi-step onboarding page at `/onboarding`. 

On the onboarding page, the user encounters the first step of an interactive form that requests their email address and name. After entering valid information and clicking Next, the user sees the second step of the form, which asks about job preferences such as industry, desired role, and experience level. The form transitions smoothly between steps using subtle animations. On the final step, the user reviews their inputs and submits the form. Upon submission, the app displays a thank-you confirmation screen that informs the user they have been added to the waitlist. This screen also shows a unique referral link that the user can copy and share with friends to move up the waitlist faster.

Because Flumberico is currently a waitlist system rather than a traditional user account system, there is no separate sign-in or sign-out flow, nor is there password recovery. All data collection and user engagement happen through this email-based onboarding form.

## Main Dashboard or Home Page

The main page of Flumberico acts as both the home page and the central hub for information. Visitors see a full-width hero section with an attention-grabbing headline, a brief description of the AI-powered job hunting service, and the Join Waitlist button. As the user scrolls down, they pass through sections that explain the problem Flumberico solves, illustrate the solution with illustrations or animations, and highlight key benefits. Further down, social proof appears in the form of testimonials, success metrics, and statistics.

The header remains visible or reappears when scrolling, giving quick access to other pages. At points throughout the page, secondary calls to action encourage users to refer a friend or explore the Pricing page. The footer at the bottom of the page repeats links to About Us, How It Works, Pricing, FAQ, Contact, Privacy Policy, and Terms of Service, along with social media icons. This layout allows users to move seamlessly from the home page into deeper parts of the site.

## Detailed Feature Flows and Page Transitions

When a user clicks About Us, the site transitions to the About page. This page presents the company story, mission, and team profiles in a simple layout. From here, the user can click the main navigation to return to the home page or move on to other sections.

Clicking How It Works brings the user to a page that outlines the step-by-step process of using Flumberico. Each step is shown with matching illustrations and short explanations. Controls at the bottom of the page allow the user to jump to the Pricing or FAQ page without returning to the home page.

The Pricing link leads to a page that compares monthly and annual plans. An interactive toggle at the top of this page switches between payment frequencies. Each pricing tier is displayed with a list of included features and price. Although no direct payment processing is integrated at this time, the page is set up so that a Get Started button could be wired to the onboarding form in the future.

Selecting FAQ takes the user to an accordion list of frequently asked questions. Tapping or clicking a question expands it to reveal the answer. This page uses simple show-and-hide animations for clarity.

On the Contact page, visitors find a simple contact form asking for name, email, and message, along with an email address and phone number for direct inquiries. Submitting the contact form triggers a confirmation banner at the top of the page and sends the message to the company’s support email.

The Privacy Policy and Terms of Service pages are static text pages that outline legal information. Each is accessible from both the footer and the navigation menu.

All pages share the same global layout for the header and footer, and moving from one page to another uses Next.js’s fast, seamless page transitions.

## Settings and Account Management

Flumberico currently does not provide a personal account dashboard where users can log in and adjust settings. Instead, the onboarding form is the only place users share preferences. Once the form is submitted, the data is stored on the backend to manage the waitlist and referral standings. If a user wishes to update their preferences after signing up, they can revisit the `/onboarding` URL and re-submit their updated information. There is no separate password management, notification configuration, or billing section at this time.

## Error States and Alternate Paths

If a user enters an invalid email address on the onboarding form, inline validation prevents them from moving forward and displays a short error message under the input field. If the network connection fails during form submission, the app shows a banner at the top of the onboarding page explaining that the submission failed and gives the user a retry button. On the Contact page, invalid form fields trigger similar inline messages, and a network error displays a banner with a retry option.

If a visitor attempts to navigate to a non-existent URL, Next.js displays a default 404 page with a friendly message and a link back to the home page. Throughout the site, disabled buttons show a loading spinner when an action is in progress, preventing duplicate submissions.

## Conclusion and Overall App Journey

A new user discovers Flumberico at flumberico.com and explores the landing page to learn about the AI-powered job hunting service. If they decide to join the waitlist, they click the prominent Join Waitlist button and proceed through a smooth, animated, multi-step form to submit their email, name, and job preferences. After receiving a confirmation and referral link, they can share Flumberico with friends. From any page, they can learn more via About Us, How It Works, Pricing, FAQ, or Contact, and they can view the legal terms on the Privacy Policy and Terms of Service pages. Error messages and fallback pages ensure a smooth experience even when something goes wrong. This simple but effective flow guides users from initial discovery all the way to joining the waitlist and becoming active advocates through the referral program.