import ServiceCard from '../components/ServiceCard';

const Home = () => {
    const services = [
        { title: 'Reservas de Hotel', iconType: 'hotel' },
        { title: 'Pacotes de Viagem', iconType: 'flag' },
        { title: 'Locação de Veículos', iconType: 'car' },
        { title: 'Disponibilidade de Transporte Público', iconType: 'train' },
        { title: 'Melhores Restaurantes', iconType: 'restaurant' },
        { title: 'Eventos Acontecendo', iconType: 'event' },
    ] as const;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="container mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center max-w-7xl">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Explore as praias de
                            <span className="text-blue-500 block mt-2">
                                Natal RN
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Descubra as mais belas praias do nordeste
                            brasileiro. Planeje sua viagem perfeita com as
                            melhores opções de hospedagem e passeios.
                        </p>
                        <div className="w-full">
                            <button className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                Começar
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://coralplaza.com.br/wp-content/uploads/2019/04/280453-x-praias-urbanas-em-natal-que-voce-nao-pode-deixar-de-conferir.jpg"
                            alt="Praias de Natal"
                            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-8 max-w-7xl">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">
                                Facilite a sua viagem
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Nós te ajudamos a encontrar as melhores opções
                                para a sua viagem, com todo o suporte que você
                                precisa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    title={service.title}
                                    iconType={service.iconType}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
