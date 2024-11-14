'use client'

import { usePathname } from "next/navigation"

interface SideNavItemProps {
    title: string
    href: string
}

const SideNavItem: React.FC<SideNavItemProps> = ({ title, href }) => {
    const pathname = usePathname()

    const selected = (href === '/' ? pathname === href : pathname.startsWith(href))

    return (
        <a className="w-full" href={href}>
            <li className={`py-1.5 text-lg hover:bg-paleturquoise ${selected ? "bg-white pl-3 font-bold" : "" }`}>
                {title}
            </li>
        </a>
    )
}

const SideNav: React.FC = () => {
    return (
        <nav className="w-96 h-screen sticky left-0 top-0 py-8 pl-8 bg-darkturquoise shadow-border">
            <h1 className="mb-5 text-3xl font-bold">Trabajo Práctico 1</h1>
            <ol>
                <SideNavItem title="Página Principal" href="/" />
                <SideNavItem title="Alumnos" href="/students" />
            </ol>
        </nav>
    )
}

export default SideNav