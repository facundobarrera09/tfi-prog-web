interface OverlayProps {
    active?: boolean
    children?: React.ReactNode | React.ReactNode[]
}

const Overlay: React.FC<OverlayProps> = ({ active = true, children }) => {


    if (active) {
        return <div className="absolute left-0 top-0 w-full h-full z-10 bg-black bg-opacity-50">{children}</div>
    }
    return null
}

export default Overlay