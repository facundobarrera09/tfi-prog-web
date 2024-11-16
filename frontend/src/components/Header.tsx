interface HeaderProps {
    title: string
    button?: React.ReactNode
    size?: '3xl' | 'xl'
}

const Header: React.FC<HeaderProps> = ({ title, button, size = '3xl' }) => {
    return (
        <header className="w-full flex justify-between items-center px-5 shadow-border-bottom">
            <h2 className={`font-bold ${size === '3xl' ? 'py-5 text-3xl' : 'py-3 text-xl'}`}>{title}</h2>
            {button && <div>{button}</div>}
        </header>
    )
}

export default Header