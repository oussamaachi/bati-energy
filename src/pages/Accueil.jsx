import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, LineChart, GraduationCap, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for CountUp with GSAP
const useCountUp = (end, duration = 2) => {
    const [target, setTarget] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top 85%",
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: end,
                        duration: duration,
                        ease: "power2.out",
                        onUpdate: function () {
                            setTarget(Math.floor(this.targets()[0].val));
                        }
                    });
                },
                once: true
            });
        }, ref);

        return () => ctx.revert();
    }, [end, duration]);

    return { target, ref };
};

const Counter = ({ value, label, prefix = "", suffix = "" }) => {
    const { target, ref } = useCountUp(value, 2.5);

    return (
        <div ref={ref} className="text-center">
            <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2">
                {prefix}{target}{suffix}
            </div>
            <div className="font-body text-sm text-bg/80">{label}</div>
        </div>
    );
};

export default function Accueil() {
    const heroRef = useRef(null);
    const expertiseRef = useRef(null);
    const manifestoRef = useRef(null);
    const projectsRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo('.hero-anim',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
            );

            // Expertise Cards
            gsap.fromTo('.expertise-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: expertiseRef.current,
                        start: "top 75%"
                    }
                }
            );

            // Manifesto Reaveal
            const words = document.querySelectorAll('.manifesto-word');
            gsap.fromTo(words,
                { opacity: 0, y: 10 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out",
                    scrollTrigger: {
                        trigger: manifestoRef.current,
                        start: "top 70%"
                    }
                }
            );

            // Parallax bg
            gsap.to('.manifesto-bg', {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: manifestoRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Projects slide up
            gsap.fromTo('.project-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top 75%"
                    }
                }
            );

        }, [heroRef, expertiseRef, manifestoRef, projectsRef]);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-bg">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-6 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_texture.png"
                        alt="Parc photovoltaïque"
                        className="w-full h-full object-cover object-center transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-primary/50 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="max-w-4xl space-y-4">
                        <h1 className="flex flex-col">
                            <span className="hero-anim text-white font-heading font-black text-4xl md:text-6xl lg:text-[4rem] leading-tight tracking-tight">
                                L'énergie de demain,
                            </span>
                            <span className="hero-anim text-accent font-serif italic text-6xl md:text-8xl lg:text-[7rem] leading-none mt-2">
                                s'ingénie aujourd'hui.
                            </span>
                        </h1>
                        <p className="hero-anim text-bg/90 font-body text-lg md:text-xl max-w-2xl mt-6 border-l-2 border-accent pl-4">
                            Bureau d'ingénierie spécialisé en ENR, environnement et territoire — Montrouge, depuis 2023.
                        </p>
                        <div className="hero-anim pt-8 flex flex-wrap items-center gap-6">
                            <Link to="/contact" className="btn-magnetic px-8 py-4 text-base shadow-[0_0_30px_rgba(245,160,0,0.3)]">
                                <span>Demander une étude <ArrowRight className="w-5 h-5" /></span>
                            </Link>
                            <Link to="/expertises" className="hover-link text-white font-medium flex items-center gap-2 group">
                                Découvrir nos expertises
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-primary py-16 px-6 relative z-20 -mt-8 rounded-t-3xl shadow-2xl">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <Counter prefix="+" value={50} label="Projets accompagnés" />
                    <Counter value={3} label="Domaines d'expertise" />
                    <Counter value={100} suffix="%" label="Indépendant" />
                    <Counter value={2023} label="Fondée" />
                </div>
            </section>

            {/* Expertises Overview */}
            <section ref={expertiseRef} className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-black text-4xl md:text-5xl text-dark mb-4">Nos Pôles d'Excellence</h2>
                        <p className="font-body text-text/70 max-w-2xl mx-auto text-lg">Une approche intégrée pour maîtriser la complexité de la transition énergétique sur votre territoire.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Card 1 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flexItems-center justify-center mb-8 flex text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <Wrench className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Ingénierie & Études</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Études de faisabilité, conception technique et optimisation continue de vos infrastructures ENR.</p>
                            <Link to="/expertises" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                                En savoir plus <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flexItems-center justify-center mb-8 flex text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <LineChart className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Conseil Stratégique</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Accompagnement de la maîtrise d'ouvrage, ingénierie financière et respect des cadres normatifs.</p>
                            <Link to="/expertises" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                                En savoir plus <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flexItems-center justify-center mb-8 flex text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <GraduationCap className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Formation & Audit</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Diagnostics thermiques certifiés et transfert de compétences pour les acteurs publics et privés.</p>
                            <Link to="/formation-audit" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                                En savoir plus <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Le Manifeste */}
            <section ref={manifestoRef} className="relative py-40 overflow-hidden bg-dark text-white rounded-[3rem] mx-4 lg:mx-12 shadow-2xl">
                <div className="absolute inset-0 z-0 opacity-10">
                    <img
                        src="/images/hero_texture.png"
                        alt="Texture territoire"
                        className="manifesto-bg w-full h-[120%] object-cover object-center -top-[10%]"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <p className="font-body text-bg/60 text-lg md:text-xl font-medium mb-12 uppercase tracking-widest">Notre Vision</p>
                    <div className="space-y-8">
                        <p className="font-body text-xl md:text-2xl text-bg/80 font-light leading-relaxed max-w-3xl mx-auto">
                            La plupart des bureaux d'études se concentrent sur <span className="underline decoration-primary/50 underline-offset-4">les équipements</span>.
                        </p>
                        <p className="font-serif italic text-4xl md:text-5xl lg:text-7xl leading-tight">
                            {"Chez BATI ENERGY, nous nous concentrons sur : l'impact réel du ".split(" ").map((word, i) => (
                                <span key={i} className="manifesto-word inline-block mr-[0.3em]">{word}</span>
                            ))}
                            <span className="manifesto-word inline-block text-accent">territoire.</span>
                        </p>
                    </div>
                    <div className="mt-20">
                        <Link to="/a-propos" className="font-heading font-bold text-sm tracking-widest hover:text-accent transition-colors flex items-center justify-center gap-2 group">
                            DÉCOUVRIR NOTRE HISTOIRE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Projects Overview */}
            <section ref={projectsRef} className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="font-heading font-black text-4xl md:text-5xl text-dark mb-4">Derniers Projets</h2>
                            <p className="font-body text-text/70 text-lg">De la conception à l'exploitation, nos réalisations concrètes.</p>
                        </div>
                        <Link to="/projets" className="btn-magnetic bg-primary hover:bg-primary-mid px-6 py-3 border border-transparent">
                            <span>Voir tous les projets <ArrowRight className="w-4 h-4" /></span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Project 1 */}
                        <div className="project-card group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                            <img src="/images/projet_solaire.png" alt="Projet Solaire" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">SOLAIRE PV</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Centrale Solaire</h3>
                                <p className="font-body text-bg/70 text-sm">Île-de-France — 2024</p>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="project-card group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                            <img src="/images/projet_territoire.png" alt="Projet Territoire" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">CONSEIL</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Plan Territorial ENR</h3>
                                <p className="font-body text-bg/70 text-sm">Métropole du Grand Paris — 2025</p>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="project-card group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                            <img src="/images/projet_eolien.png" alt="Projet Éolien" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">ÉOLIEN</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Étude Éolienne Offshore</h3>
                                <p className="font-body text-bg/70 text-sm">Normandie — 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="bg-bg py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Quote className="w-16 h-16 mx-auto text-primary/20 mb-8" />
                    <p className="font-serif italic text-3xl md:text-4xl text-dark leading-relaxed mb-8">
                        "L'approche systémique de BATI ENERGY nous a permis de débloquer notre projet d'aménagement d'éco-quartier avec 6 mois d'avance sur le planning prévisionnel."
                    </p>
                    <div className="font-body font-bold text-primary">Directeur Développement</div>
                    <div className="font-mono text-xs text-text/50 mt-1">Etablissement Public Foncier</div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-primary m-6 rounded-[3rem] overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-5xl mx-auto py-24 px-6 text-center">
                    <h2 className="font-serif italic text-5xl md:text-7xl text-white mb-10 leading-tight">
                        Prêt à accélérer votre<br />transition énergétique ?
                    </h2>
                    <Link to="/contact" className="btn-magnetic text-lg px-10 py-5 shadow-2xl">
                        <span>Demander une étude gratuite <ArrowRight className="w-5 h-5" /></span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
