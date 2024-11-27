const Footer = () => {
        const footerLinks = {
          reservas: [
            { name: 'Hotéis', href: '/hoteis' },
            { name: 'Pacotes', href: '/pacotes' },
            { name: 'Veículos', href: '/veiculos' }
          ],
          suporte: [
            { name: 'Contato', href: '/contato' },
            { name: 'Sobre nós', href: '/sobre' }
          ],
          social: [
            { name: 'Facebook', href: '#' },
            { name: 'Twitter', href: '#' },
            { name: 'Instagram', href: '#' }
          ]
        };
      
        return (
          <footer className="bg-gray-900 text-white mt-12">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Voyagee</h3>
                  <p className="text-gray-400">
                    Sua melhor experiência em viagens começa aqui. Descubra destinos incríveis e crie memórias inesquecíveis.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Reservas</h4>
                  <ul className="space-y-2">
                    {footerLinks.reservas.map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.href} 
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
      
                <div>
                  <h4 className="text-lg font-semibold mb-4">Suporte</h4>
                  <ul className="space-y-2">
                    {footerLinks.suporte.map((link) => (
                      <li key={link.name}>
                        <a 
                          href={link.href} 
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
      
                <div>
                  <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
                  <div className="flex space-x-4">
                    {footerLinks.social.map((link) => (
                      <a 
                        key={link.name}
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        );
      };
      
      export default Footer;