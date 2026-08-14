/**
 * -----------------------------------------------------------------------------
 * Technologies Data
 * -----------------------------------------------------------------------------
 *
 * WebsterWork Technologies grouped by service.
 *
 * -----------------------------------------------------------------------------
 */

import type { IconName } from "@/components/icons";

export interface TechnologyItem
{
    name: string;

    icon: IconName;
}

export interface TechnologyGroup
{
    service: string;

    items: TechnologyItem[];
}

export const technologies: TechnologyGroup[] = [
    {
        service: "AI Models",

        items: [
            // { name: "OpenAI", icon: "openai" },
            // { name: "LangChain", icon: "langchain" },
            { name: "Python", icon: "python" },
            { name: "TensorFlow", icon: "tensorflow" },
            { name: "PyTorch", icon: "pytorch" },
            { name: "Hugging Face", icon: "huggingface" },
        ],
    },

    {
        service: "Website Development",

        items: [
            { name: "Next.js", icon: "nextjs" },
            { name: "React", icon: "react" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Tailwind CSS", icon: "tailwind" },
            // { name: "Shadcn UI", icon: "shadcn" },
            { name: "Node.js", icon: "node" },
            { name: "NestJS", icon: "nest" },
            { name: "Express", icon: "express" },
            { name: "GraphQL", icon: "graphql" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "MySQL", icon: "mysql" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "Redis", icon: "redis" },
            { name: "Docker", icon: "docker" },
            { name: "Linux", icon: "linux" },
            { name: "Git", icon: "git" },
            { name: "GitHub", icon: "github" },
            { name: "Vercel", icon: "vercel" },
            { name: "Netlify", icon: "netlify" },
            { name: "WordPress", icon: "wordpress" },
        ],
    },

    {
        service: "Mobile Development",

        items: [
            { name: "React Native", icon: "react" },
            { name: "Expo", icon: "expo" },
            { name: "Firebase", icon: "firebase" },
            { name: "Swift", icon: "swift" },
            { name: "Kotlin", icon: "kotlin" },
        ],
    },

    {
        service: "Game Development",

        items: [
            { name: "Unity", icon: "unity" },
            { name: "Unreal Engine", icon: "unreal" },
            { name: "Blender", icon: "blender" },
        ],
    },

    {
        service: "Graphics Design",

        items: [
            { name: "Adobe Photoshop", icon: "photoshop" },
            { name: "Adobe Illustrator", icon: "illustrator" },
            { name: "Figma", icon: "figma" },
            // { name: "Canva", icon: "canva" },
            { name: "Blender", icon: "blender" },
        ],
    },

    {
        service: "UI / UX Design",

        items: [
            { name: "Figma", icon: "figma" },
            { name: "Adobe XD", icon: "xd" },
            { name: "Adobe Illustrator", icon: "illustrator" },
            // { name: "Canva", icon: "canva" },
        ],
    },

    {
        service: "Video Editing",

        items: [
            { name: "Adobe Premiere Pro", icon: "premierepro" },
            { name: "Adobe After Effects", icon: "aftereffects" },
           // { name: "DaVinci Resolve", icon: "davinci" },
            { name: "Blender", icon: "blender" },
        ],
    },

    {
        service: "Content Writing",

        items: [
          //  { name: "OpenAI", icon: "openai" },
           // { name: "Notion", icon: "notion" },
            //{ name: "Markdown", icon: "markdown" },
        ],
    },

    {
        service: "SEO Optimization",

        items: [
            { name: "Google Analytics", icon: "analytics" },
            { name: "Google Search Console", icon: "searchconsole" },
            { name: "SEMrush", icon: "semrush" },
        ],
    },

    {
        service: "Cyber Security",

        items: [
            { name: "Kali Linux", icon: "kali" },
            { name: "Wireshark", icon: "wireshark" },
            { name: "Linux", icon: "linux" },
            { name: "Docker", icon: "docker" },
        ],
    },
];