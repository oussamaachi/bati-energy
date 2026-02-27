import React, { useEffect, useRef } from 'react';
import { Target, Leaf, HeartHandshake, Lightbulb, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function APropos() {
    const heroRef = useRef(null);
    const timelineRef = useRef(null);
    const pathRef = useRef(null);
    const teamRef = useRef(null);
    const valuesRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.hero-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Timeline SVG Line Draw
            if (pathRef.current) {
                const path = pathRef.current;
                const length = path.getTotalLength();

                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                });

                // Timeline items
                gsap.fromTo('.timeline-item',
                    { x: -30, opacity: 0 },
                    {
                        x: 0, opacity: 1, stagger: 0.5, ease: "power2.out",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 60%",
                            end: "bottom 80%",
                            scrub: 1
                        }
                    }
                );
            }

            // Team
            gsap.fromTo('.team-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: teamRef.current,
                        start: "top 75%"
                    }
                }
            );

            // Values
            gsap.fromTo('.value-card',
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top 80%"
                    }
                }
            );

        }, [heroRef, timelineRef, teamRef, valuesRef]);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-bg">
            {/* Hero Interne */}
            <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/hero_texture.png"
                        alt="Texture territoire"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-dark/60"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                    <div className="hero-text inline-flex items-center gap-2 text-accent font-mono text-sm tracking-widest mb-6">
                        <span className="w-12 h-px bg-accent"></span>
                        L'AGENCE
                        <span className="w-12 h-px bg-accent"></span>
                    </div>
                    <h1 className="hero-text font-serif italic text-5xl md:text-7xl text-white mb-6">Qui sommes-nous ?</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> À Propos
                    </div>
                </div>
            </section>

            {/* Timeline - Notre Histoire */}
            <section ref={timelineRef} className="py-32 px-6 max-w-4xl mx-auto relative">
                <div className="text-center mb-24">
                    <h2 className="font-heading font-black text-4xl text-dark">Notre Histoire</h2>
                </div>

                <div className="relative">
                    {/* SVG Line */}
                    <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-px">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 2 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path ref={pathRef} d="M1 0V100" stroke="#F5A000" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                        </svg>
                    </div>

                    <div className="space-y-16">
                        {[
                            { date: "Jan 2023", title: "Création de BATI ENERGY à Montrouge", side: "left" },
                            { date: "2024", title: "Premiers projets d'ingénierie ENR", side: "right" },
                            { date: "2025", title: "Expansion conseil territorial", side: "left" },
                            { date: "2026", title: "Développement pôle Formation & Audit", side: "right" }
                        ].map((item, index) => (
                            <div key={index} className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                <div className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-accent rounded-full border-4 border-bg md:-translate-x-1.5 mt-1.5 md:mt-0 z-10"></div>

                                {/* Content width */}
                                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-16 text-left md:text-right" style={{ [item.side === 'right' ? 'paddingLeft' : 'paddingRight']: '4rem', [item.side === 'right' ? 'paddingRight' : 'paddingLeft']: '0', [item.side === 'right' ? 'textAlign' : 'textAlign']: 'left' }}>
                                    <div className={`flex flex-col ${item.side === 'left' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                        <span className="font-mono font-bold text-primary-light mb-2 block">{item.date}</span>
                                        <h3 className="font-heading font-bold text-xl text-dark">{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-primary/5 py-24 px-6 border-y border-primary/10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="font-mono text-accent text-sm font-bold tracking-widest block mb-4">NOTRE MISSION</span>
                        <p className="font-body text-lg text-text/80 leading-relaxed">
                            En tant que bureau d'études spécialisé, nous sommes nés d'une conviction simple : la transition énergétique nécessite une approche globale qui dépasse le simple cadre technique. Notre mission est de fournir des audits énergétiques précis, de valoriser vos projets via les CEE et les subventions, et de contribuer concrètement à la gestion durable de nos territoires.
                        </p>
                    </div>
                    <div>
                        <blockquote className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-accent leading-tight border-l-4 border-primary pl-8 py-2">
                            L'ingénierie prend tout son sens lorsqu'elle est au service du vivant et des générations futures.
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Equipe */}
            <section ref={teamRef} className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-black text-4xl text-dark mb-4">L'Équipe Dirigeante</h2>
                    <p className="font-body text-text/70 text-lg">Des experts dédiés à la réussite de vos projets.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Directrice Générale", role: "Fondatrice — Ingénieure ENR", img: "/images/camille.png" },
                        { name: "Directeur Technique", role: "Expert Géothermie & Éolien", img: "/images/thomas.png" },
                        { name: "Responsable Conseil", role: "Stratégie & Assistance MOA", img: "/images/sarah.png" }
                    ].map((member, i) => (
                        <div key={i} className="team-card group relative overflow-hidden rounded-3xl bg-white shadow-lg">
                            <div className="aspect-[4/5] overflow-hidden">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                                <div>
                                    <h3 className="font-heading font-bold text-2xl text-white mb-1">{member.name}</h3>
                                    <p className="font-mono text-accent text-xs">{member.role}</p>
                                </div>
                                <a href="https://www.linkedin.com/company/bati-energy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:text-dark hover:border-accent transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Valeurs */}
            <section ref={valuesRef} className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="value-card bg-white p-8 rounded-3xl shadow-sm border border-primary/10">
                        <Target className="w-8 h-8 text-primary mb-6" />
                        <h3 className="font-heading font-bold text-xl text-dark mb-3">Rigueur technique</h3>
                        <p className="font-body text-sm text-text/70">Des calculs précis et des études approfondies pour garantir la viabilité de vos systèmes.</p>
                    </div>
                    <div className="value-card bg-white p-8 rounded-3xl shadow-sm border border-primary/10">
                        <Leaf className="w-8 h-8 text-primary mb-6" />
                        <h3 className="font-heading font-bold text-xl text-dark mb-3">Engagement</h3>
                        <p className="font-body text-sm text-text/70">Une vision environnementale au cœur de chaque préconisation stratégique.</p>
                    </div>
                    <div className="value-card bg-white p-8 rounded-3xl shadow-sm border border-primary/10">
                        <HeartHandshake className="w-8 h-8 text-primary mb-6" />
                        <h3 className="font-heading font-bold text-xl text-dark mb-3">Proximité client</h3>
                        <p className="font-body text-sm text-text/70">Un accompagnement sur-mesure et une réactivité totale durant toutes les phases.</p>
                    </div>
                    <div className="value-card bg-white p-8 rounded-3xl shadow-sm border border-primary/10">
                        <Lightbulb className="w-8 h-8 text-primary mb-6" />
                        <h3 className="font-heading font-bold text-xl text-dark mb-3">Innovation continue</h3>
                        <p className="font-body text-sm text-text/70">Une veille technologique constante pour vous proposer les meilleures solutions ENR.</p>
                    </div>
                </div>
            </section>

            {/* Section Légale */}
            <section className="bg-primary pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center font-mono text-white/80 space-y-2 text-sm">
                    <div className="text-accent mb-6">
                        <Leaf className="w-8 h-8 mx-auto" />
                    </div>
                    <p className="font-bold text-white text-lg tracking-wider">SAS BATI ENERGY</p>
                    <p>45 avenue Pierre Brossolette — 92120 Montrouge</p>
                    <p>NAF 71.12B — Fondée en 2023</p>
                </div>
            </section>
        </div>
    );
}
