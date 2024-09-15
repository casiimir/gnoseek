# Gnoseek: AI-Powered Next Level Learning

## Inspiration

As a software engineer and former instructor for various coding bootcamps, I've always been passionate about education and knowledge acquisition. The challenges I faced in teaching and the constant need for efficient research tools in the tech industry inspired me to create Gnoseek. I wanted to build a tool that could revolutionize how we learn, research, and share knowledge.

## Try it out

[gnoseek.vercel.app](https://gnoseek.vercel.app)

### Video Demo + Presentation

[Youtube](https://www.youtube.com/watch?v=AtnAkDAjDfI)

## What it does

Gnoseek is an AI-powered knowledge explorer that:

- Generates comprehensive reports on any topic
- Formats code snippets beautifully
- Provides keywords, flashcards, study flowcharts, and examples
- Saves research in a personalized area
- Exports results to PDF
- Offers support for 28 different languages
- Displays trends and latest research, along with related results
- Allows combined searches across various sub-topics
- Provides a predefined list of topics, but also allows search on any topic or subject
- For programming-related searches, shows code snippets and real-world use cases
- Features a fully responsive UI/UX, perfectly adaptable for Mobile/Tablet/Desktop
- Includes a detailed 'About' page with all relevant information

## How we built it

Gnoseek was built during an intense 7-day sprint, leveraging the power of modern web development tools and AI. The tech stack includes:

- **NextJS v14**
- **TypeScript**
- **Convex**
- **Clerk** for authentication
- **LangChain**
- **OpenAI**
- **TailwindCSS**

Convex played a crucial role in our development process. Its real-time backend capabilities allowed us to focus on building features rather than worrying about infrastructure. Thanks to the power of Convex, we were able to build this app in a remarkably short time, from development to production. This efficiency means we're well-positioned to quickly add new features in the future!

## Challenges we ran into

- **AI Integration**: Implementing AI features that were both powerful and user-friendly was a significant challenge.
- **Real-time Collaboration**: Ensuring seamless real-time updates for collaborative features using Convex required careful planning.
- **Data Security**: Implementing robust security measures to protect user data and research was crucial.
- **Performance Optimization**: Balancing feature-rich content with fast load times was a constant challenge.
- **Multilingual Support**: Implementing and testing support for 28 different languages required meticulous attention to detail.

## Accomplishments that we're proud of

- Building a fully functional AI-powered learning tool in just one week
- Seamlessly integrating multiple advanced technologies (AI, real-time database, authentication)
- Creating an intuitive user interface that makes complex AI interactions feel natural
- Implementing a scalable architecture using Convex that can handle growing user demands
- Successfully supporting 28 languages, making Gnoseek accessible to a global audience

## What we learned

This project was a deep dive into the capabilities of Convex and its integration with AI technologies. We learned:

- How to leverage Convex's real-time features for collaborative learning environments
- Efficient ways to handle AI-generated content in a web application
- Strategies for optimizing performance in a feature-rich application
- The importance of user-centric design in EdTech products
- Techniques for implementing and managing multilingual support in a complex application

## What's next for Gnoseek

We're excited about the potential of Gnoseek and have several plans for its future:

- Implement more advanced AI features, such as personalized learning paths
- Enhance collaboration features, allowing users to share and co-edit research
- Develop mobile applications to make learning truly on-the-go
- Integrate with popular learning management systems
- Expand language support for even greater global accessibility
- Implement more sophisticated trend analysis and predictive learning features
- Enhance programming-related features with more languages and frameworks

Gnoseek is more than just an app; it's a step towards democratizing knowledge and enhancing the learning experience for everyone. We believe it has the potential to transform how people approach learning and research in the digital age. With the robust foundation provided by Convex, we're poised to rapidly develop and deploy new features, ensuring Gnoseek stays at the cutting edge of AI-powered learning tools.

## Built With

- **NextJS v14**
- **TypeScript**
- **Convex**
- **Clerk**
- **LangChain**
- **OpenAI**
- **TailwindCSS**

## Run Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
