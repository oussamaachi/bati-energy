import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Quote, Leaf, Euro, Clock, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: "Centrale Solaire",
        category: "Solaire",
        location: "Île-de-France",
        year: "2024",
        image: "/images/projet_solaire.png",
        gallery: [
            "/images/projet_solaire.png",
            "https://images.unsplash.com/photo-1509391366360-1e9e30a5ca6f?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588612158671-0ae10717208d?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Étude et dimensionnement d'une ferme solaire de 5MWc sur friche industrielle.",
        fullDesc: "Sur ce projet ambitieux de revalorisation d'une ancienne friche industrielle, nous avons mené l'ensemble des études techniques : gisement solaire, ingénierie électrique, et intégration paysagère. Le défi principal consistait à optimiser la disposition des trackers solaires tout en respectant les contraintes strictes du PLU local.",
        tags: ["Faisabilité", "PV Tracker", "Autoconsommation", "Réseau MT"],
        results: [
            { label: "Puissance", value: "5 MWc", icon: Zap },
            { label: "Production", value: "6.2 GWh/an", icon: Leaf },
            { label: "Évitement CO2", value: "~350 t/an", icon: Leaf },
            { label: "Économies annuelles", value: "850 K€", icon: Euro }
        ],
        testimonial: {
            quote: "L'expertise de Bati Energy nous a permis de maximiser le potentiel de cette friche tout en sécurisant un ROI sur moins de 6 ans.",
            author: "Direction Énergie",
            role: "Établissement Public — Région Île-de-France"
        }
    },
    {
        id: 2,
        title: "Plan Territorial ENR",
        category: "Conseil territorial",
        location: "Métropole du Grand Paris",
        year: "2025",
        image: "/images/projet_territoire.png",
        gallery: [
            "/images/projet_territoire.png",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Schéma directeur des énergies renouvelables à l'échelle métropolitaine.",
        fullDesc: "Accompagnement de la collectivité dans la définition de sa stratégie de transition énergétique. Cartographie des gisements (solaire, géothermie, réseaux de chaleur), modélisation des scénarios technico-économiques et rédaction du masterplan.",
        tags: ["Stratégie", "SIG", "Concertation", "Plan Climat"],
        results: [
            { label: "Couverture ENR", value: "32% visés", icon: Leaf },
            { label: "Communes", value: "12 impliquées", icon: Clock },
            { label: "Investissement", value: "45 M€", icon: Euro }
        ],
        testimonial: {
            quote: "Un accompagnement stratégique clair et chiffré qui a fédéré l'ensemble des maires autour du Plan Climat.",
            author: "Vice-présidence Transition Écologique",
            role: "Métropole du Grand Paris"
        }
    },
    {
        id: 3,
        title: "Étude Éolienne Offshore",
        category: "Éolien",
        location: "Normandie",
        year: "2025",
        image: "/images/projet_eolien.png",
        gallery: [
            "/images/projet_eolien.png",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549449859-99e71fd035b8?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Avant-projet détaillé pour le raccordement d'un parc offshore.",
        fullDesc: "Mission d'assistance technique pour le dimensionnement du poste électrique de raccordement d'un futur parc éolien en mer. Modélisation dynamique des flux et optimisation des pertes en ligne sur le câble sous-marin HVDC.",
        tags: ["HVDC", "Offshore", "Réseau de transport", "BIM"],
        results: [
            { label: "Capacité", value: "450 MW", icon: Zap },
            { label: "Câble", value: "35 km", icon: Clock },
            { label: "Tension", value: "225 kV", icon: Zap }
        ]
    },
    {
        id: 4,
        title: "Audit Énergétique Industriel",
        category: "Audit",
        location: "Seine-et-Marne",
        year: "2024",
        image: "/images/projet_audit.png",
        gallery: [
            "/images/projet_audit.png",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531835551805-16d8f8d67f5b?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Optimisation des utilités sur un site classé Seveso.",
        fullDesc: "Réalisation d'un audit énergétique approfondi (norme EN 16247) sur un site chimique industriel complet. Identification de gisements de récupération de chaleur fatale sur les compresseurs et optimisation de la chaufferie vapeur.",
        tags: ["Chaleur fatale", "ISO 50001", "Process thermiques", "Vapeur"],
        results: [
            { label: "Économies", value: "18%", icon: Leaf },
            { label: "ROI moyen", value: "2.4 ans", icon: Clock },
            { label: "Subventions", value: "65 K€ CEE", icon: Euro }
        ],
        testimonial: {
            quote: "L'audit a révélé des gisements d'économies insoupçonnés, rentabilisés en moins de 3 ans. Bati Energy a su comprendre nos contraintes industrielles.",
            author: "Direction d'Exploitation",
            role: "Site Industriel Classé — Seine-et-Marne"
        }
    },
    {
        id: 5,
        title: "Programme Formation ENR",
        category: "Formation",
        location: "Hauts-de-Seine",
        year: "2025",
        image: "/images/formation.png",
        gallery: [
            "/images/formation.png",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Montée en compétences des équipes techniques de l'EPCI.",
        fullDesc: "Déploiement d'un parcours de formation sur mesure d'une semaine pour 25 techniciens et ingénieurs de la métropole, axé sur la maintenance photovoltaïque et le suivi d'exploitation des réseaux de chaleur urbains.",
        tags: ["Présentiel", "Ingénierie Pédagogique", "Exploitation"],
        results: [
            { label: "Session", value: "5 jours", icon: Clock },
            { label: "Stagiaires", value: "25 agents", icon: Zap },
            { label: "Satisfaction", value: "9.6/10", icon: Leaf }
        ]
    },
    {
        id: 6,
        title: "Optimisation Thermique",
        category: "Audit",
        location: "Essonne",
        year: "2026",
        image: "/images/projet_territoire.png",
        gallery: [
            "/images/projet_territoire.png",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Modélisation dynamique globale d'un grand ensemble tertiaire.",
        fullDesc: "Diagnostic complet de la performance thermique d'un campus de bureaux de 40 000 m². Simulation Thermique Dynamique (STD) pour orienter la rénovation de la GTB et l'intégration d'ombrières photovoltaïques en parking.",
        tags: ["STD", "GTB", "Tertiaire", "Décret Bap"],
        results: [
            { label: "Surface", value: "40 k m²", icon: Zap },
            { label: "Gain estimé", value: "-25% énergie", icon: Leaf },
            { label: "Évitement CO2", value: "110 t/an", icon: Leaf },
            { label: "Autoconsommation", value: "14%", icon: Zap }
        ],
        testimonial: {
            quote: "Leur modélisation détaillée nous a permis d'optimiser notre investissement tout en répondant aux exigences du décret tertiaire.",
            author: "Direction Immobilière",
            role: "Parc Tertiaire Privé — Essonne"
        }
    }
];

const categories = ["Tous", "Solaire", "Éolien", "Conseil territorial", "Formation", "Audit"];

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images.length]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-full group overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-dark/30 hover:bg-primary backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-dark/30 hover:bg-primary backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${currentIndex === idx
                            ? 'w-8 h-2.5 bg-primary shadow-[0_0_10px_rgba(255,87,34,0.7)]'
                            : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Projets() {
    const [activeFilter, setActiveFilter] = useState("Tous");
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Initial hero anim
        gsap.fromTo('.hero-text',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, []);

    // Filter logic
    useEffect(() => {
        const newItems = activeFilter === "Tous"
            ? projectsData
            : projectsData.filter(p => p.category === activeFilter);

        // Animate filtering
        const ctx = gsap.context(() => {
            gsap.to('.project-item', {
                scale: 0.9, opacity: 0, duration: 0.3, stagger: 0.05,
                onComplete: () => {
                    setFilteredProjects(newItems);
                }
            });
        }, gridRef);

        return () => ctx.revert();
    }, [activeFilter]);

    // Animate items in after state updates
    useEffect(() => {
        if (filteredProjects.length > 0) {
            gsap.fromTo('.project-item',
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        }
    }, [filteredProjects]);

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        gsap.to('.project-modal', {
            y: '100%', opacity: 0, duration: 0.6, ease: "power3.in",
            onComplete: () => {
                setSelectedProject(null);
                document.body.style.overflow = 'auto';
            }
        });
    };

    // Modal open animation
    useEffect(() => {
        if (selectedProject) {
            gsap.fromTo('.project-modal',
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [selectedProject]);

    return (
        <div className="bg-bg min-h-screen">
            {/* Hero Interne */}
            <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/images/hero_texture.png"
                        alt="Architecture durable"
                        className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
                    />
                </div>
                <div className="relative z-10 text-center px-6 mt-16">
                    <h1 className="hero-text font-serif italic text-5xl md:text-7xl text-white mb-6">Nos Réalisations</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> Projets
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-12 px-6 sticky top-20 z-40 bg-bg/80 backdrop-blur-xl border-b border-primary/5">
                <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar pb-2">
                    <div className="flex gap-4 items-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`flex-shrink-0 px-6 py-2.5 rounded-full font-mono text-sm font-bold transition-all duration-300 ${activeFilter === cat
                                    ? 'bg-primary text-white scale-105 shadow-md shadow-primary/30'
                                    : 'bg-white text-text border border-primary/10 hover:border-primary hover:text-primary hover:shadow-sm'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 px-6 relative z-10 min-h-[50vh]">
                <div ref={gridRef} className="max-w-[1600px] mx-auto grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))' }}>
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => openModal(project)}
                            className="project-item group relative h-[28rem] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-shadow bg-dark/10"
                        >
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/95 via-dark/60 to-transparent"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                <span className="font-mono text-accent text-sm mb-3 font-semibold tracking-wider group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-500">{project.category.toUpperCase()}</span>
                                <h3 className="font-heading font-bold text-2xl text-white mb-1 group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-500">{project.title}</h3>
                                <p className="font-body text-white/70 text-sm mb-6 group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-500">{project.location} — {project.year}</p>

                                {/* Hover reveal */}
                                <div className="absolute bottom-6 left-8 right-8 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-4">
                                    <p className="font-body text-white/90 text-sm line-clamp-2">{project.shortDesc}</p>
                                    <div className="flex items-center gap-2 text-accent text-sm font-bold font-heading">
                                        Voir le détail <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal Project Detail */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex justify-end bg-dark/60 backdrop-blur-md">
                    {/* Backdrop click layer */}
                    <div className="absolute inset-0" onClick={closeModal}></div>

                    <div className="project-modal relative w-full lg:w-[65vw] xl:w-[55vw] h-[100dvh] bg-bg shadow-2xl flex flex-col pt-safe overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-dark/30 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
                            <div className="h-[45vh] min-h-[350px] relative w-full bg-dark">
                                {/* Use ImageSlider here */}
                                {selectedProject.gallery ? (
                                    <ImageSlider images={selectedProject.gallery} />
                                ) : (
                                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-14 text-white pointer-events-none">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="font-mono bg-white/20 text-white border border-white/40 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                                            {selectedProject.category}
                                        </span>
                                        <span className="font-mono text-white/70 text-sm">{selectedProject.year}</span>
                                    </div>
                                    <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white mb-2 leading-tight drop-shadow-lg">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="font-body text-white/90 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                                        {selectedProject.location}
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 md:p-14 max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                                    {/* Left Column: Description */}
                                    <div className="lg:col-span-2 space-y-12">
                                        <section>
                                            <h4 className="font-heading font-bold text-2xl text-dark mb-6 flex items-center gap-3">
                                                Le Défi technique
                                            </h4>
                                            <p className="font-body text-text/80 text-lg leading-relaxed">{selectedProject.fullDesc}</p>
                                        </section>

                                        <section>
                                            <h4 className="font-heading font-bold text-sm text-text/50 mb-4 font-mono tracking-widest uppercase">
                                                Domaines d'expertise
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className="px-4 py-2 bg-white border border-primary/10 text-dark font-mono text-sm font-semibold rounded-lg shadow-sm hover:border-primary/30 transition-colors">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Testimonial Section */}
                                        {selectedProject.testimonial && (
                                            <div className="relative mt-12 bg-white p-8 md:p-10 rounded-3xl border border-primary/10 shadow-lg shadow-primary/5">
                                                <Quote className="absolute top-8 left-8 w-10 h-10 text-primary/10" />
                                                <div className="relative z-10 pl-4">
                                                    <p className="font-serif italic text-xl md:text-2xl text-dark leading-relaxed mb-6">
                                                        "{selectedProject.testimonial.quote}"
                                                    </p>
                                                    <div>
                                                        <div className="font-bold text-primary font-heading text-lg">
                                                            {selectedProject.testimonial.author}
                                                        </div>
                                                        <div className="font-body text-sm text-text/60">
                                                            {selectedProject.testimonial.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: KPIs */}
                                    <div className="space-y-4">
                                        {selectedProject.results.map((res, i) => {
                                            const IconComponent = res.icon || Zap; // Fallback icon
                                            return (
                                                <div key={i} className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group flex flex-col justify-center">
                                                    <div className="flex items-center gap-3 mb-3 text-text/50 group-hover:text-primary transition-colors">
                                                        <IconComponent className="w-5 h-5" />
                                                        <span className="font-body text-xs uppercase tracking-widest font-semibold">{res.label}</span>
                                                    </div>
                                                    <div className="font-mono text-3xl font-bold text-dark group-hover:text-primary transition-colors">
                                                        {res.value}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div className="mt-8 pt-8 border-t border-primary/10">
                                            <a href="/contact" className="w-full flex items-center justify-between px-6 py-4 bg-primary text-white font-bold rounded-xl hover:bg-dark transition-colors duration-300 shadow-md hover:shadow-xl group">
                                                <span>Nous consulter</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
