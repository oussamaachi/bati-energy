import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = `fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-5 py-3 xl:py-1.5 xl:px-5 flex items-center justify-between gap-4 xl:gap-6 min-w-[300px] w-max max-w-[96vw] ${scrolled || !isHome
        ? 'bg-bg/80 backdrop-blur-xl border border-primary/10 shadow-lg text-primary'
        : 'bg-transparent text-white'
        }`;

    return (
        <nav className={navClass}>
            <Link to="/" className="flex items-center gap-2 hover-link group shrink-0 xl:min-w-[200px]">
                <img src="/logo.png" alt="BATI ENERGY" className="h-10 xl:h-12 w-auto object-contain" />
            </Link>

            <ul className="hidden xl:flex items-center gap-5 font-body text-[14px] font-semibold whitespace-nowrap">
                <li><NavLink to="/" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Accueil</NavLink></li>

                <li className="relative group cursor-pointer py-2">
                    <div className="flex items-center gap-1 hover:text-accent transition-colors">
                        Nos Solutions
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    {/* Submenu Dropdown - pt-4 creates invisible hover bridge */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <div className="bg-bg/95 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-xl flex flex-col p-2">
                            <div className="px-4 py-2 text-xs text-text/50 font-mono uppercase tracking-wider mb-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent"></span> Particuliers & Tertiaire
                            </div>
                            <NavLink to="/expertises#isolation" className="px-4 py-2.5 hover:bg-dark/5 rounded-xl transition-colors text-dark hover:text-accent flex flex-col">
                                <span className="font-semibold text-sm">Isolation Thermique</span>
                                <span className="text-xs text-dark/60 font-normal mt-0.5">ITE, ITI, Combles & Toitures</span>
                            </NavLink>
                            <NavLink to="/expertises#pompes-a-chaleur" className="px-4 py-2.5 hover:bg-dark/5 rounded-xl transition-colors text-dark hover:text-accent flex flex-col">
                                <span className="font-semibold text-sm">Pompes à Chaleur (PAC)</span>
                                <span className="text-xs text-dark/60 font-normal mt-0.5">Air-Air & Air-Eau (Hydraulique)</span>
                            </NavLink>
                            <div className="h-px bg-dark/10 my-1 mx-2"></div>
                            <NavLink to="/bureau-etudes" className="px-4 py-2.5 hover:bg-dark/5 rounded-xl transition-colors text-dark hover:text-accent text-sm">Bureau d'Études & Audit</NavLink>
                            <NavLink to="/expertises#cee" className="px-4 py-2.5 hover:bg-dark/5 rounded-xl transition-colors text-dark hover:text-accent text-sm">Primes CEE / Montage dossiers</NavLink>
                        </div>
                    </div>
                </li>

                <li><NavLink to="/projets" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Projets</NavLink></li>
                <li><NavLink to="/blog" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Blog</NavLink></li>
                <li><NavLink to="/a-propos" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>À propos</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Contact</NavLink></li>
            </ul>

            <Link to="/contact" className="hidden xl:flex btn-magnetic px-6 py-2.5 text-sm whitespace-nowrap shrink-0">
                <span>Demander une étude</span>
            </Link>

            <MobileMenu scrolled={scrolled} isHome={isHome} />
        </nav>
    );
}

function MobileMenu({ scrolled, isHome }) {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const linkClass = "block font-body font-semibold text-lg text-dark hover:text-accent transition-colors py-2 border-b border-primary/10 last:border-none";
    const subLinkClass = "block font-body font-medium text-base text-dark/80 hover:text-accent transition-colors py-2 pl-4 border-b border-primary/5 last:border-none";

    return (
        <div className="xl:hidden relative">
            <button
                onClick={() => setOpen(!open)}
                className="ml-2 flex flex-col justify-center items-center w-9 h-9 gap-1.5"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled || !isHome ? 'bg-primary' : 'bg-white'} ${open ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled || !isHome ? 'bg-primary' : 'bg-white'} ${open ? 'opacity-0 w-4' : 'w-4'}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled || !isHome ? 'bg-primary' : 'bg-white'} ${open ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
            </button>

            {open && (
                <div className="absolute top-14 right-0 w-80 max-w-[90vw] bg-bg rounded-3xl shadow-2xl border border-primary/10 p-6 z-[999] max-h-[80vh] overflow-y-auto">
                    <nav className="flex flex-col gap-1">
                        <NavLink to="/" className={linkClass}>Accueil</NavLink>

                        <div className="py-2 border-b border-primary/10">
                            <div className="font-body font-semibold text-lg text-primary mb-2">Nos Solutions</div>
                            <div className="px-2 py-1 mb-2 bg-dark/5 rounded-lg text-xs font-mono font-bold text-dark/70 uppercase tracking-wider inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Particuliers & Tertiaire
                            </div>
                            <div className="flex flex-col border-l-2 border-primary/20 ml-2">
                                <NavLink to="/expertises#isolation" className={subLinkClass}>🏠 Isolation Thermique</NavLink>

                                <NavLink to="/expertises#pompes-a-chaleur" className={subLinkClass}>â„ï¸ Pompes à Chaleur (PAC)</NavLink>
                                <NavLink to="/bureau-etudes" className={subLinkClass}>ðŸ“‹ Bureau d'Études</NavLink>
                                <NavLink to="/expertises#cee" className={subLinkClass}>ðŸ’¶ Primes CEE / Dossiers</NavLink>
                            </div>
                        </div>

                        <NavLink to="/projets" className={linkClass}>Projets</NavLink>
                        <NavLink to="/blog" className={linkClass}>Blog</NavLink>
                        <NavLink to="/a-propos" className={linkClass}>À propos</NavLink>
                        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
                    </nav>
                    <Link to="/contact" className="btn-magnetic w-full text-center mt-6 py-3 text-sm block">
                        <span>Demander une étude</span>
                    </Link>
                </div >
            )
            }
        </div >
    );
}



