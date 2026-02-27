import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-dark text-bg pt-20 pb-6 rounded-t-[3rem] mt-20">
            {/* Top Gradient Separator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-mid via-accent to-primary-mid rounded-t-full"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Col 1 */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="BATI ENERGY" className="h-10 w-auto object-contain brightness-0 invert" />
                    </Link>
                    <p className="font-serif italic text-xl text-bg/80">"L'ingénierie au service de la transition énergétique."</p>
                    <p className="font-body text-sm text-bg/60">Fondée en 2023, Montrouge</p>
                </div>

                {/* Col 2 */}
                <div>
                    <h4 className="font-heading font-bold text-lg mb-6 text-white">Expertises</h4>
                    <ul className="space-y-4 font-body text-sm text-bg/80">
                        <li><Link to="/" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Accueil</Link></li>
                        <li><Link to="/expertises" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Nos Domaines</Link></li>
                        <li><Link to="/projets" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Réalisations</Link></li>
                        <li><Link to="/bureau-etudes" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Bureau d'Études</Link></li>
                    </ul>
                </div>

                {/* Col 3 */}
                <div>
                    <h4 className="font-heading font-bold text-lg mb-6 text-white">L'Agence</h4>
                    <ul className="space-y-4 font-body text-sm text-bg/80">
                        <li><Link to="/a-propos" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">À propos</Link></li>
                        <li><Link to="/blog" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Actualités & Ressources</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors inline-block hover:-translate-y-0.5 transform">Contact</Link></li>
                    </ul>
                </div>

                {/* Col 4 */}
                <div>
                    <h4 className="font-heading font-bold text-lg mb-6 text-white">Contact</h4>
                    <ul className="space-y-4 font-body text-sm text-bg/80">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span>45 avenue Pierre Brossolette<br />92120 Montrouge, France</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-accent shrink-0" />
                            <a href="mailto:contact@bati-energy.fr" className="hover:text-accent transition-colors">contact@bati-energy.fr</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-accent shrink-0" />
                            <span>Lun–Ven : 9h–18h</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Status Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-bg/60">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
                    </span>
                    <span>Système opérationnel — BATI ENERGY SAS — NAF 71.12B</span>
                </div>
                <div>
                    &copy; {new Date().getFullYear()} BATI ENERGY. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
