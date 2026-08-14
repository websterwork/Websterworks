/**
 * -----------------------------------------------------------------------------
 * Icon Map
 * -----------------------------------------------------------------------------
 *
 * Central registry for every icon used in WebsterWork.
 *
 * -----------------------------------------------------------------------------
 */

import type { IconType } from "react-icons";

import
    {
        SiNextdotjs,
        SiReact,
        SiTailwindcss,
        SiTypescript,
        SiJavascript,
        SiNodedotjs,
        SiNestjs,
        SiExpress,
        SiGraphql,
        SiMongodb,
        SiMysql,
        SiPostgresql,
        SiRedis,
        SiDocker,
        SiLinux,
        SiGit,
        SiGithub,
        SiVercel,
        SiNetlify,
        SiWordpress,
        SiPython,
        SiTensorflow,
        SiPytorch,
        SiHuggingface,
        SiExpo,
        SiFirebase,
        SiSwift,
        SiKotlin,
        SiUnity,
        SiUnrealengine,
        SiBlender,
        SiFigma,
        SiGoogleanalytics,
        SiGooglesearchconsole,
        SiSemrush,
        SiKalilinux,
        SiWireshark,
    } from "react-icons/si";

import
    {
        FaAws,
    } from "react-icons/fa6";

import
    {
        TbBrandAdobe,
    } from "react-icons/tb";

export const iconMap = {
    nextjs: SiNextdotjs,
    react: SiReact,
    tailwind: SiTailwindcss,
    typescript: SiTypescript,
    javascript: SiJavascript,

    node: SiNodedotjs,
    nest: SiNestjs,
    express: SiExpress,
    graphql: SiGraphql,

    mongodb: SiMongodb,
    mysql: SiMysql,
    postgresql: SiPostgresql,
    redis: SiRedis,

    docker: SiDocker,

    linux: SiLinux,

    git: SiGit,
    github: SiGithub,

    vercel: SiVercel,
    netlify: SiNetlify,

    wordpress: SiWordpress,

    aws: FaAws,

  

    python: SiPython,
    tensorflow: SiTensorflow,
    pytorch: SiPytorch,

    huggingface: SiHuggingface,

    expo: SiExpo,
    firebase: SiFirebase,

    swift: SiSwift,
    kotlin: SiKotlin,

    unity: SiUnity,
    unreal: SiUnrealengine,

    blender: SiBlender,

    figma: SiFigma,


    photoshop: TbBrandAdobe,
    illustrator: TbBrandAdobe,
    aftereffects: TbBrandAdobe,
    premierepro: TbBrandAdobe,
    xd: TbBrandAdobe,

    analytics: SiGoogleanalytics,
    searchconsole: SiGooglesearchconsole,
    semrush: SiSemrush,

    kali: SiKalilinux,
    wireshark: SiWireshark,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof iconMap;