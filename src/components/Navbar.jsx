import React, { useEffect, useState } from 'react';
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

    const navClass = `fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-5 py-3 xl:py-1.5 xl:pl-6 xl:pr-3 flex items-center justify-between gap-4 xl:gap-8 min-w-[300px] w-max max-w-[96vw] ${scrolled || !isHome
        ? 'bg-bg/80 backdrop-blur-xl border border-primary/10 shadow-lg text-primary'
        : 'bg-transparent text-white'
        }`;

    return (
        <nav className={navClass}>
            <Link to="/" className="flex items-center gap-2 hover-link group shrink-0">
                <img src="/logo.png" alt="BATI ENERGY" className={`h-10 xl:h-12 w-auto object-contain ${!scrolled && isHome ? 'brightness-0 invert' : ''}`} />
            </Link>

            <ul className="hidden xl:flex items-center gap-5 font-body text-[14px] font-semibold whitespace-nowrap">
                <li><NavLink to="/" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Accueil</NavLink></li>
                <li><NavLink to="/expertises" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Expertises</NavLink></li>
                <li><NavLink to="/projets" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Projets</NavLink></li>
                <li><NavLink to="/formation-audit" className={({ isActive }) => `hover:text-accent transition-colors ${isActive ? 'text-accent' : ''}`}>Formation &amp; Audit</NavLink></li>
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
                <div className="absolute top-14 right-0 w-72 bg-bg rounded-3xl shadow-2xl border border-primary/10 p-6 z-[999]">
                    <nav className="flex flex-col gap-1">
                        <NavLink to="/" className={linkClass}>Accueil</NavLink>
                        <NavLink to="/expertises" className={linkClass}>Expertises</NavLink>
                        <NavLink to="/projets" className={linkClass}>Projets</NavLink>
                        <NavLink to="/formation-audit" className={linkClass}>Formation &amp; Audit</NavLink>
                        <NavLink to="/blog" className={linkClass}>Blog</NavLink>
                        <NavLink to="/a-propos" className={linkClass}>À propos</NavLink>
                        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
                    </nav>
                    <Link to="/contact" className="btn-magnetic w-full text-center mt-6 py-3 text-sm block">
                        <span>Demander une étude</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
