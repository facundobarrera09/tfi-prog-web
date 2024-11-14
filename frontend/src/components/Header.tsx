interface HeaderProps {
    title: string
    button?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, button }) => {
    return (
        <header className="w-full flex justify-between items-center px-5 shadow-border-bottom">
            <h2 className="py-5 text-3xl font-bold">{title}</h2>
            {button && <div>{button}</div>}
        </header>
    )
}

export default Header