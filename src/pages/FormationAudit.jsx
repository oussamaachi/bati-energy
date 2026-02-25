import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, Search, FileText, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedChecklist = () => {
    const listRef = useRef(null);

    const items = [
        "Analyse des factures et contrats",
        "Bilan de l'enveloppe thermique",
        "Rendement des systèmes CVAC",
        "Simulation thermique dynamique",
        "Plan d'actions chiffré (CAPEX/OPEX)"
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.check-item',
                { x: -20, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.5, stagger: 0.3, ease: "power2.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 75%"
                    }
                }
            );

            gsap.fromTo('.check-icon',
                { scale: 0, rotation: -90 },
                {
                    scale: 1, rotation: 0, duration: 0.5, stagger: 0.3, ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 75%"
                    }
                }
            );
        }, listRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={listRef} className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 max-w-md mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] -z-0"></div>
            <h4 className="font-heading font-bold text-dark text-xl mb-6 relative z-10">Livrables de l'Audit</h4>
            <ul className="space-y-6 relative z-10">
                {items.map((item, index) => (
                    <li key={index} className="check-item flex items-center gap-4">
                        <CheckCircle2 className="check-icon w-6 h-6 text-primary flex-shrink-0" />
                        <span className="font-body text-text/80 font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function FormationAudit() {
    const heroRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.hero-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Timeline Steps
            gsap.fromTo('.process-step',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 75%"
                    }
                }
            );

            // Timeline Line
            gsap.fromTo('.process-line',
                { scaleX: 0 },
                {
                    scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 75%"
                    }
                }
            );

            // Fade up sections
            gsap.utils.toArray('.fade-up').forEach((el) => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%"
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-bg min-h-screen">
            {/* Hero Interne */}
            <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/images/formation.png"
                        alt="Formation professionnelle ENR"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-dark/70"></div>
                </div>
                <div className="relative z-10 text-center px-6 mt-16">
                    <div className="hero-text inline-flex items-center gap-2 text-accent font-mono text-sm tracking-widest mb-6">
                        <span className="w-12 h-px bg-accent"></span>
                        COMPÉTENCES & PERFORMANCES
                        <span className="w-12 h-px bg-accent"></span>
                    </div>
                    <h1 className="hero-text font-serif italic text-5xl md:text-7xl text-white mb-6">Formation & Audit</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> Formation & Audit
                    </div>
                </div>
            </section>

            {/* Section Audit */}
            <section className="py-32 px-6 fade-up">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-[55%]">
                        <span className="font-mono text-accent text-sm font-bold tracking-widest block mb-4 uppercase">Pôle Évaluation</span>
                        <h2 className="font-heading font-black text-4xl lg:text-5xl text-dark mb-6 leading-tight">Audits Énergétiques</h2>
                        <p className="font-body text-text/80 text-lg mb-8 leading-relaxed">
                            Base incontournable de toute démarche d'amélioration, nos audits dressent un portrait factuel et chiffré de votre patrimoine foncier ou industriel. Nous traduisons la donnée brute en plan d'investissement stratégique.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent transition-colors">
                                <h4 className="font-heading font-bold text-dark mb-2">Audit Réglementaire</h4>
                                <p className="font-body text-sm text-text/70 line-clamp-3">Mise en conformité avec les décrets tertiaires (BACS, etc.) et réalisation des rapports obligatoires.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent transition-colors">
                                <h4 className="font-heading font-bold text-dark mb-2">Audit Technique ENR</h4>
                                <p className="font-body text-sm text-text/70 line-clamp-3">Évaluation experte des performances d'unités de production existantes (PV, géothermie, réseaux de chaleur).</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent transition-colors">
                                <h4 className="font-heading font-bold text-dark mb-2">Diagnostic Environnemental</h4>
                                <p className="font-body text-sm text-text/70 line-clamp-3">Analyse d'impact, émissions GES et approche cycle de vie des bâtiments.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 hover:border-accent transition-colors">
                                <h4 className="font-heading font-bold text-dark mb-2">Audit Territorial</h4>
                                <p className="font-body text-sm text-text/70 line-clamp-3">Approche multi-sites à l'échelle d'une commune ou d'une agglomération.</p>
                            </div>
                        </div>
                        <button className="btn-magnetic px-6 py-3">
                            <span>Commander un audit <ArrowRight className="w-4 h-4" /></span>
                        </button>
                    </div>

                    <div className="w-full lg:w-[45%]">
                        <AnimatedChecklist />
                    </div>
                </div>
            </section>

            {/* Processus */}
            <section ref={timelineRef} className="py-24 px-6 bg-primary/5 border-y border-primary/10 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading font-black text-3xl md:text-4xl text-dark">L'Exigence Méthodologique</h2>
                    </div>

                    <div className="relative">
                        {/* Horizontal Line background */}
                        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-1 bg-primary/10 rounded-full"></div>
                        {/* Animated Line */}
                        <div className="process-line hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary to-accent rounded-full z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                            {[
                                { icon: ClipboardCheck, title: "1. Cadrage", desc: "Définition des périmètres de mesure et mobilisation des données." },
                                { icon: Search, title: "2. Diagnostic", desc: "Campagnes de mesures in-situ, relevés thermographiques et modélisations." },
                                { icon: FileText, title: "3. Rapport", desc: "Analyse critique, STD et synthèse des potentiels." },
                                { icon: Lightbulb, title: "4. Recommandations", desc: "Scénarios d'actions, ingénierie financière et planning." }
                            ].map((step, i) => (
                                <div key={i} className="process-step text-center group">
                                    <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-primary/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:border-accent group-hover:shadow-[0_8px_30px_rgba(245,160,0,0.15)] transition-all duration-300">
                                        <step.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="font-heading font-bold text-xl text-dark mb-3">{step.title}</h3>
                                    <p className="font-body text-text/70 text-sm leading-relaxed max-w-[250px] mx-auto">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Formation */}
            <section className="py-32 px-6 fade-up">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-mono text-accent text-sm font-bold tracking-widest block mb-4 uppercase">Pôle Transfert de Compétences</span>
                        <h2 className="font-heading font-black text-4xl lg:text-5xl text-dark mb-6">Programmes de Formation</h2>
                        <p className="font-body text-text/70 text-lg max-w-3xl mx-auto">Préparer vos équipes d'exploitation, de conception ou de gestion aux défis de demain grâce à nos formateurs-ingénieurs spécialisés.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-bg p-8 rounded-3xl border border-transparent shadow-[0_0_0_1px_transparent] relative overflow-hidden group hover:shadow-[0_0_0_2px_var(--tw-gradient-stops)] from-primary to-accent transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

                            <div className="font-mono text-accent text-sm font-bold tracking-widest mb-4 flex items-center justify-between">
                                MODULE 1
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs">2 JOURS</span>
                            </div>

                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Fondamentaux ENR</h3>
                            <p className="font-body text-text/70 mb-8 h-24">Maîtriser les ordres de grandeur énergétiques, les filières (PV, Bois, Géothermie, Éolien) et les clés de la transition territoire.</p>

                            <div className="space-y-3 font-mono text-sm text-dark mb-8">
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Public</span>
                                    <span className="font-bold flex-1 text-right">Élus, décideurs</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Format</span>
                                    <span className="font-bold flex-1 text-right">Présentiel / Visio</span>
                                </div>
                            </div>
                            <a href="/contact" className="font-heading font-bold text-primary flex items-center gap-2 group-hover:text-accent transition-colors">
                                Programme détaillé <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-bg p-8 rounded-3xl border border-transparent shadow-[0_0_0_1px_transparent] relative overflow-hidden group hover:shadow-[0_0_0_2px_var(--tw-gradient-stops)] from-primary to-accent transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

                            <div className="font-mono text-accent text-sm font-bold tracking-widest mb-4 flex items-center justify-between">
                                MODULE 2
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs">3 JOURS</span>
                            </div>

                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Ingénierie Solaire PV</h3>
                            <p className="font-body text-text/70 mb-8 h-24">Module technique avancé : dimensionnement de calepinage, onduleurs, courbes de charge, PVSyst et cadre consuel.</p>

                            <div className="space-y-3 font-mono text-sm text-dark mb-8">
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Public</span>
                                    <span className="font-bold flex-1 text-right">Techniciens, ING</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Format</span>
                                    <span className="font-bold flex-1 text-right">Présentiel + TP</span>
                                </div>
                            </div>
                            <a href="/contact" className="font-heading font-bold text-primary flex items-center gap-2 group-hover:text-accent transition-colors">
                                Programme détaillé <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-bg p-8 rounded-3xl border border-transparent shadow-[0_0_0_1px_transparent] relative overflow-hidden group hover:shadow-[0_0_0_2px_var(--tw-gradient-stops)] from-primary to-accent transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

                            <div className="font-mono text-accent text-sm font-bold tracking-widest mb-4 flex items-center justify-between">
                                MODULE 3
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs">2 JOURS</span>
                            </div>

                            <h3 className="font-heading font-bold text-2xl text-dark mb-4">Montage de Projets ENR</h3>
                            <p className="font-body text-text/70 mb-8 h-24">Structuration juridique, SPV, sécurisation foncière, appel d'offres CRE et financement participatif local.</p>

                            <div className="space-y-3 font-mono text-sm text-dark mb-8">
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Public</span>
                                    <span className="font-bold flex-1 text-right">Chefs de projet MOA</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-2">
                                    <span className="text-text/50 uppercase">Format</span>
                                    <span className="font-bold flex-1 text-right">Atelier pratique</span>
                                </div>
                            </div>
                            <a href="/contact" className="font-heading font-bold text-primary flex items-center gap-2 group-hover:text-accent transition-colors">
                                Programme détaillé <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Formation */}
            <section className="bg-primary m-6 rounded-[3rem] overflow-hidden relative fade-up">
                <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-accent rounded-full opacity-20 blur-3xl mix-blend-screen"></div>
                <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary-light rounded-full opacity-30 blur-3xl mix-blend-screen"></div>

                <div className="relative z-10 max-w-5xl mx-auto py-24 px-6 text-center text-white">
                    <h2 className="font-heading font-black text-4xl md:text-5xl mb-6">Vous souhaitez une formation sur-mesure ?</h2>
                    <p className="font-body text-white/80 text-xl max-w-2xl mx-auto mb-10">
                        Intra-entreprise, spécifique à votre patrimoine ou orientée sur une filière inédite : nos ingénieurs construisent le syllabus adapté à vos enjeux.
                    </p>
                    <a href="/contact" className="btn-magnetic bg-accent text-white px-8 py-4 shadow-xl">
                        <span>Nous contacter <ArrowRight className="w-5 h-5" /></span>
                    </a>
                </div>
            </section>
        </div>
    );
}
