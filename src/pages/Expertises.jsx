import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Interactive Component 1: Diagnostic Shuffler
const DiagnosticShuffler = () => {
    const cards = ['Audit énergétique', 'Bureau d\'études', 'Valorisation CEE', 'Performance Tertiaire'];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % cards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <div className="relative h-48 w-full max-w-sm mx-auto mt-8 flex items-center justify-center perspective-1000">
            {cards.map((card, index) => {
                // Calculate relative position (-1, 0, 1) considering active index
                let diff = index - activeIndex;
                // Adjust for wrapping
                if (diff < -1) diff += cards.length;
                if (diff > 1) diff -= cards.length;

                let zIndex = 10 - Math.abs(diff);
                let scale = diff === 0 ? 1 : diff === 1 ? 0.9 : 0.8;
                let translateY = diff === 0 ? 0 : diff === 1 ? 20 : 40;
                let opacity = diff === 0 ? 1 : diff === 1 ? 0.7 : 0.4;

                return (
                    <div
                        key={index}
                        className="absolute top-0 w-full bg-white text-dark p-6 rounded-2xl shadow-xl border border-primary/10 transition-all duration-700 font-heading font-bold text-center flex items-center justify-center h-24"
                        style={{
                            transform: `translateY(${translateY}px) scale(${scale})`,
                            zIndex,
                            opacity,
                            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        {card}
                    </div>
                );
            })}
        </div>
    );
};

// Custom Interactive Component 2: Telemetry Typewriter
const TelemetryTypewriter = () => {
    const lines = [
        "> Analyse réglementaire Décret Tertiaire...",
        "> Audit énergétique usine : OK ✓",
        "> Recommandation isolation transmise...",
        "> Veille 2026 : CEE 6ème période intégrée"
    ];

    const [displayedText, setDisplayedText] = useState("");
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const blink = setInterval(() => setCursorVisible(v => !v), 500);
        return () => clearInterval(blink);
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setTimeout(() => {
                setDisplayedText("");
                setCurrentLineIndex(0);
                setCurrentCharIndex(0);
            }, 5000);
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + currentLine[currentCharIndex]);
                setCurrentCharIndex(c => c + 1);
            }, Math.random() * 50 + 30);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + '\n');
                setCurrentLineIndex(l => l + 1);
                setCurrentCharIndex(0);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, lines]);

    return (
        <div className="bg-dark text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden h-64 flex flex-col mt-8">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="font-mono text-xs tracking-wider text-bg/80">FLUX CONSEIL — EN DIRECT</span>
            </div>

            <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap flex-grow text-accent-hot">
                {displayedText}
                <span className={`inline-block w-2.5 h-4 bg-accent align-middle ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </div>
        </div>
    );
};

// Custom Interactive Component 3: Scheduler
const Scheduler = () => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const [activeDay, setActiveDay] = useState(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        // Sequence animation
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

            // Move to 'J' (index 3)
            tl.to(cursorRef.current, {
                x: (3 * 40), // approx width of day box
                y: 0,
                duration: 2,
                ease: "power2.inOut",
                delay: 1
            });

            // Click animation
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.call(() => setActiveDay(3));
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

            // Reset
            tl.to({}, { duration: 3 }); // wait 3 seconds
            tl.call(() => setActiveDay(null));
            tl.to(cursorRef.current, { x: -40, y: 0, duration: 1, ease: "power2.inOut" });

        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary/5 mt-8 max-w-sm mx-auto">
            <h4 className="font-heading font-bold text-dark mb-6 text-center">Planifier un Audit</h4>

            <div className="relative">
                <div className="flex justify-between items-center mb-8 relative">
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold transition-colors duration-300 relative z-10 ${activeDay === i ? 'bg-accent text-white shadow-lg' : 'bg-bg text-dark'}`}
                        >
                            {day}
                        </div>
                    ))}

                    {/* Animated Cursor */}
                    <div ref={cursorRef} className="absolute -left-10 top-2 z-20 pointer-events-none">
                        <MousePointer2 className="w-6 h-6 text-primary drop-shadow-md" fill="white" />
                    </div>
                </div>
            </div>

            <button className={`w-full py-3 rounded-xl font-heading font-bold transition-all duration-300 ${activeDay !== null ? 'bg-primary text-white scale-[1.02] shadow-xl' : 'bg-bg text-text/50 pointer-events-none'}`}>
                Lancer l'audit <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
        </div>
    );
};

export default function Expertises() {
    const heroRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero reveal
            gsap.fromTo('.hero-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Fade up sections
            sectionRefs.current.forEach((el) => {
                if (el) {
                    gsap.fromTo(el,
                        { y: 60, opacity: 0 },
                        {
                            y: 0, opacity: 1, duration: 1, ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 75%"
                            }
                        }
                    );
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-bg">
            {/* Hero Interne */}
            <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="/images/bureau.png"
                        alt="Expertise Efficacité Énergétique"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-dark/70"></div>
                </div>
                <div className="relative z-10 text-center px-6 mt-16">
                    <h1 className="hero-text font-serif italic text-5xl md:text-7xl text-white mb-6">Nos Domaines d'Expertise</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> Expertises
                    </div>
                </div>
            </section>

            {/* Expertise 1 : Bureau d'études */}
            <section ref={el => sectionRefs.current[0] = el} className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold tracking-wider mb-4">PÔLE 01</span>
                        <h2 className="font-heading font-black text-4xl lg:text-5xl text-dark mb-6 leading-tight">Bureau d'études & Audit</h2>
                        <ul className="space-y-4 font-body text-lg text-text/80 mb-8 border-l-2 border-primary/20 pl-6">
                            <li>Audits énergétiques réglementaires et volontaires</li>
                            <li>Diagnostics de performance des bâtiments (enveloppe, équipements, usages)</li>
                            <li>Études de faisabilité et dimensionnement des installations</li>
                            <li>Optimisation des puissances de souscription</li>
                            <li>Accompagnement Tertiaire et Industriels</li>
                        </ul>
                        <a href="/bureau-etudes" className="font-heading font-bold text-primary hover:text-accent transition-colors flex items-center gap-2">
                            Découvrir notre démarche d'audit <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="w-full md:w-1/2 order-1 md:order-2">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-8 border border-primary/5">
                            <DiagnosticShuffler />
                        </div>
                        <div className="mt-8 rounded-[2.5rem] overflow-hidden shadow-2xl h-80">
                            <img src="/images/projet_audit.png" alt="Bureau d'études audit énergétique" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise 2 : Photovoltaïque & PAC */}
            <section ref={el => sectionRefs.current[1] = el} className="py-32 px-6 bg-primary/5 border-y border-primary/10 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-80 mb-8">
                            <img src="/images/bureau.png" alt="Installation Pompes à chaleur et Solaire" className="w-full h-full object-cover" />
                        </div>
                        <TelemetryTypewriter />
                    </div>
                    <div className="w-full md:w-1/2">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold tracking-wider mb-4">PÔLE 02</span>
                        <h2 className="font-heading font-black text-4xl lg:text-5xl text-dark mb-6 leading-tight">Photovoltaïque & Pompes à Chaleur</h2>
                        <p className="font-body text-lg text-text/80 mb-6">
                            Produisez votre propre énergie et optimisez votre confort thermique avec des solutions durables et rentables, adaptées aux particuliers et aux professionnels.
                        </p>

                        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
                            <h3 className="font-heading font-bold text-xl text-primary mb-3 flex items-center gap-2">☀️ Photovoltaïque</h3>
                            <ul className="space-y-2 font-body text-text/70 pl-6 list-disc marker:text-accent">
                                <li>Autoconsommation avec ou sans revente de surplus</li>
                                <li>Centrales solaires pour toitures tertiaires et industrielles</li>
                                <li>Ombrières de parking photovoltaïques</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
                            <h3 className="font-heading font-bold text-xl text-primary mb-3 flex items-center gap-2">❄️ Pompes à Chaleur (PAC)</h3>
                            <ul className="space-y-2 font-body text-text/70 pl-6 list-disc marker:text-accent">
                                <li><strong>PAC Air-Air</strong> : Systèmes de climatisation réversible haut rendement</li>
                                <li><strong>PAC Air-Eau</strong> : Systèmes hydrauliques de chauffage et production d'ECS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise 3 : CEE & Isolation */}
            <section ref={el => sectionRefs.current[2] = el} className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold tracking-wider mb-4">PÔLE 03</span>
                        <h2 className="font-heading font-black text-4xl lg:text-5xl text-dark mb-6 leading-tight">Efficacité Globale & Primes C2E</h2>
                        <ul className="space-y-4 font-body text-lg text-text/80 mb-8 border-l-2 border-primary/20 pl-6">
                            <li><strong>Isolation Thermique :</strong> Combles, murs (ITI/ITE), toitures terrasses, planchers bas et calorifugeage.</li>
                            <li><strong>Éclairage :</strong> Relamping LED professionnel et gestion de présence.</li>
                            <li><strong>Aides & Financement :</strong> Montage intégral de vos dossiers de Primes C2E pour minimiser le reste à charge.</li>
                        </ul>
                        <Scheduler />
                    </div>
                    <div className="w-full md:w-1/2 order-1 md:order-2">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[40rem]">
                            <img src="/images/projet_territoire.png" alt="Solutions d'isolation et relamping" className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent opacity-80"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secteurs d'Intervention - Typography fix */}
            <section ref={el => sectionRefs.current[3] = el} className="py-24 px-6 max-w-5xl mx-auto text-center">
                <h2 className="font-serif italic text-4xl text-dark mb-12">Nos cibles d'intervention</h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {['Particuliers', 'Bâtiments Tertiaires', 'Infrastructures Industrielles', 'Collectivités'].map((sector, i) => (
                        <div key={i} className="px-8 py-4 rounded-full border-2 border-primary/20 bg-white font-heading text-lg font-bold text-primary shadow-sm hover:border-accent hover:shadow-lg transition-all cursor-default transform hover:-translate-y-1">
                            {sector}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
