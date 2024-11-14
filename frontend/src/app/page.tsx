import Header from "../components/Header"

const Home: React.FC = () => {
    return (
        <div className="flex-1 min-w-fit">
            <Header title="Página Principal" />
            <div className="p-5">
                <a href="/students">
                    <div className="flex justify-center items-center py-5 shadow-card">
                        <span className="text-4xl font-bold">Módulo Alumnos</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Home