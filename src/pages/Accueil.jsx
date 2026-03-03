import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, LineChart, GraduationCap, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const shouldReduceMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Custom hook for CountUp with GSAP
const useCountUp = (end, duration = 2) => {
    const [target, setTarget] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (shouldReduceMotion()) {
            setTarget(end);
            return undefined;
        }

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
    const reduceMotionRef = useRef(false);

    useEffect(() => {
        reduceMotionRef.current = shouldReduceMotion();
        if (reduceMotionRef.current) return undefined;

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
            <section ref={heroRef} className="relative min-h-[100dvh] w-full flex items-center justify-center pt-32 pb-20 px-6 bg-dark overflow-hidden">
                {/* Clean Modern Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_texture.png"
                        alt="Background Texture"
                        className="w-full h-full object-cover object-center opacity-10 mix-blend-screen"
                    />
                    {/* Subtle modern glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary-mid/20 rounded-full blur-[120px] pointer-events-none"></div>
                </div>

                {/* Hero Content - Centered & Epure */}
                <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center mt-10 md:mt-0">
                    
                    {/* Modern pill badge */}
                    <div className="hero-anim inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Particuliers & Tertiaire</span>
                    </div>

                    <h1 className="hero-anim flex flex-col items-center mb-8">
                        <span className="text-white font-heading font-light text-3xl md:text-5xl lg:text-6xl tracking-tight mb-3 opacity-90">
                            L'ingénierie au service de votre
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFC107] font-heading font-black text-5xl md:text-[5.5rem] lg:text-[7.5rem] leading-[1.1] drop-shadow-2xl py-2">
                            efficacité énergétique.
                        </span>
                    </h1>

                    <p className="hero-anim text-white/60 font-body text-xl md:text-2xl max-w-2xl mb-14 font-light leading-relaxed">
                        De l'audit réglementaire au déploiement de solutions performantes, nous vous accompagnons pour réduire votre empreinte et maximiser vos bénéfices.
                    </p>

                    <div className="hero-anim flex flex-col sm:flex-row items-center gap-6">
                        <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-dark font-heading font-bold text-sm tracking-widest uppercase hover:scale-105 hover:bg-accent hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3">
                            Démarrer un projet <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link to="/expertises" className="px-8 py-4 rounded-full border border-white/20 text-white font-heading font-medium text-sm tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-3">
                            Nos expertises
                        </Link>
                    </div>
                </div>
            </section>

{/* Stats Bar */}
            <section className="bg-primary py-16 px-6 relative z-20 -mt-8 rounded-t-3xl shadow-2xl">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <Counter prefix="+" value={50} label="Projets tertiaires & industriels" />
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
                        <p className="font-body text-text/70 max-w-2xl mx-auto text-lg">Une approche globale depuis l'analyse énergétique jusqu'au déploiement et financement de vos travaux.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Card 1 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center mb-8 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <GraduationCap className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Bureau d'études & Audit</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Audits énergétiques réglementaires et volontaires, diagnostics de performance et plans d'actions.</p>
                            <Link to="/bureau-etudes" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                                En savoir plus <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center mb-8 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <LineChart className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Valorisation des CEE</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Maximisation de vos primes CEE et structuration financière pour réduire significativement votre reste à charge.</p>
                            <Link to="/expertises" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                                En savoir plus <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="expertise-card bg-white p-10 rounded-3xl shadow-lg border border-primary/5 group hover:border-accent/40 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center mb-8 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <Wrench className="w-8 h-8 m-auto" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Solutions d'efficacité</h3>
                            <p className="font-body text-text/70 mb-8 leading-relaxed">Déploiement de solutions performantes : Isolation globale, Relamping LED et optimisation CVC.</p>
                            <Link to="/expertises" className="font-heading font-bold text-sm text-primary group-hover:text-accent transition-colors flex items-center gap-2">
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
                            La plupart des acteurs s'arrêtent au <span className="underline decoration-primary/50 underline-offset-4">conseil théorique</span>.
                        </p>
                        <p className="font-serif italic text-4xl md:text-5xl lg:text-7xl leading-tight">
                            {"Chez BATI ENERGY, nous maximisons vos économies avec la force des ".split(" ").map((word, i) => (
                                <span key={i} className="manifesto-word inline-block mr-[0.3em]">{word}</span>
                            ))}
                            <span className="manifesto-word inline-block text-accent">CEE.</span>
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
                            <img src="/images/projet_audit.png" alt="Audit Energétique Industriel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">AUDIT TERTIAIRE</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Audit Réglementaire 40 000 m²</h3>
                                <p className="font-body text-bg/70 text-sm">Essonne — 2026</p>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="project-card group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                            <img src="/images/formation.png" alt="Rénovation Globale CEE" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">VALORISATION CEE</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Financement CEE Industrie</h3>
                                <p className="font-body text-bg/70 text-sm">Seine-et-Marne — 2024</p>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="project-card group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                            <img src="/images/bureau.png" alt="Relamping LED" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider">SOLUTIONS EFFICACITÉ</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1">Isolation et Relamping LED</h3>
                                <p className="font-body text-bg/70 text-sm">Métropole du Grand Paris — 2025</p>
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
                        "L'approche globale de BATI ENERGY — audit, financement CEE et pilotage des travaux — nous a permis de réduire de 35% notre facture énergétique en moins de 18 mois."
                    </p>
                    <div className="font-body font-bold text-primary">Directeur Immobilier</div>
                    <div className="font-mono text-xs text-text/50 mt-1">Groupe Tertiaire — Île-de-France</div>
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


