import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronLeft, ChevronRight, Quote, Leaf, Euro, Clock, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: "Audit Réglementaire Tertiaire",
        category: "Audit",
        location: "Essonne",
        year: "2026",
        image: "/images/projet_audit.png",
        gallery: [
            "/images/projet_audit.png",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Audit réglementaire complet pour un parc de bureaux de 40 000 m².",
        fullDesc: "Accompagnement d'un gestionnaire immobilier dans la mise en conformité avec le Décret Tertiaire et BACS. Réalisation des audits énergétiques obligatoires, modélisation des plans d'actions et déclaration sur la plateforme OPERAT.",
        tags: ["Décret Tertiaire", "OPERAT", "BACS", "Plan Climat"],
        results: [
            { label: "Surfaces", value: "40k m²", icon: Leaf },
            { label: "Sites", value: "3 impliqués", icon: Clock },
            { label: "Baisse visée", value: "-40% (2030)", icon: Zap }
        ],
        testimonial: {
            quote: "Une expertise pointue et un plan d'actions clair qui sécurisent notre trajectoire Décret Tertiaire.",
            author: "Direction RSE & Immobilier",
            role: "Foncière Privée"
        }
    },
    {
        id: 2,
        title: "Financement CEE Industrie",
        category: "Valorisation CEE",
        location: "Seine-et-Marne",
        year: "2024",
        image: "/images/formation.png",
        gallery: [
            "/images/formation.png",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549449859-99e71fd035b8?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Valorisation des primes CEE pour la rénovation d'un site industriel.",
        fullDesc: "Montage intégral du dossier de Certificats d'Économies d'Énergie pour le remplacement de groupes froids (systèmes de récupération de chaleur) et l'isolation des réseaux. Optimisation de la prime pour couvrir une part majoritaire de l'investissement.",
        tags: ["Fiche IND-UT-117", "Chaleur de récupération", "Subventions"],
        results: [
            { label: "Prime CEE", value: "850 K€", icon: Euro },
            { label: "Couverture", value: "65% du CAPEX", icon: Euro },
            { label: "Instruction", value: "3 mois", icon: Clock }
        ]
    },
    {
        id: 3,
        title: "Audit Énergétique Industriel",
        category: "Audit",
        location: "Hauts-de-France",
        year: "2025",
        image: "/images/projet_territoire.png",
        gallery: [
            "/images/projet_territoire.png",
            "https://images.unsplash.com/photo-1531835551805-16d8f8d67f5b?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Optimisation des utilités sur un site de production.",
        fullDesc: "Réalisation d'un audit énergétique approfondi (norme EN 16247). Identification de gisements d'économies sur la chaufferie vapeur, l'air comprimé, et proposition d'un plan de comptage conforme à l'ISO 50001.",
        tags: ["ISO 50001", "Process thermiques", "Vapeur", "Air comprimé"],
        results: [
            { label: "Économies", value: "18%", icon: Leaf },
            { label: "ROI moyen", value: "2.4 ans", icon: Clock },
            { label: "Gisements", value: "7 identifiés", icon: Zap }
        ],
        testimonial: {
            quote: "L'audit a révélé des gisements d'économies insoupçonnés, rentabilisés en moins de 3 ans. Bati Energy a su comprendre nos contraintes industrielles.",
            author: "Direction d'Exploitation",
            role: "Site Industriel — Hauts-de-France"
        }
    },
    {
        id: 4,
        title: "Relamping LED National",
        category: "Efficacité Énergétique",
        location: "National",
        year: "2025",
        image: "/images/bureau.png",
        gallery: [
            "/images/bureau.png",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Remplacement de l'éclairage sur 150 agences commerciales.",
        fullDesc: "Accompagnement maître d'ouvrage pour le déploiement national de luminaires LED avec détection intelligente. Audit initial par échantillonnage, rédaction du cahier des charges, choix des prestataires et réception des travaux.",
        tags: ["Relamping", "Détection", "Réseau d'agences"],
        results: [
            { label: "Agences", value: "150 sites", icon: Clock },
            { label: "Conso Éclairage", value: "-65%", icon: Zap },
            { label: "Retour invest.", value: "1.8 an", icon: Leaf }
        ]
    },
    {
        id: 5,
        title: "Rénovation Globale CEE & CVC",
        category: "Efficacité Énergétique",
        location: "Métropole du Grand Paris",
        year: "2026",
        image: "/images/hero_texture.png",
        gallery: [
            "/images/hero_texture.png",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        ],
        shortDesc: "Optimisation de l'enveloppe et des systèmes sur un immeuble des années 90.",
        fullDesc: "Mission complète (AMO et ingénierie) : isolation des toitures terrasses, calorifugeage, et mise à niveau de la GTB. Valorisation CEE intégrée au plan de financement en amont pour maximiser le passage à l'acte.",
        tags: ["Isolation Enveloppe", "Calorifugeage", "GTB", "Rénovation globale"],
        results: [
            { label: "Investissement", value: "1.2 M€", icon: Euro },
            { label: "Gain estimé", value: "-35% énergie", icon: Leaf },
            { label: "Évitement CO2", value: "110 t/an", icon: Leaf }
        ],
        testimonial: {
            quote: "Le couplage ingénierie et recherche de financements (CEE) de Bati Energy a rendu cette rénovation lourde financièrement viable.",
            author: "Direction Immobilière",
            role: "Siège Social — Paris"
        }
    }
];

const categories = ["Tous", "Audit", "Valorisation CEE", "Efficacité Énergétique"];

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
                type="button"
                onClick={prevSlide}
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-dark/30 hover:bg-primary backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-dark/30 hover:bg-primary backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {images.map((_, idx) => (
                    <button
                        type="button"
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Aller à l'image ${idx + 1}`}
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

    useEffect(() => {
        if (!selectedProject) return;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedProject]);

    useEffect(() => () => {
        document.body.style.overflow = 'auto';
    }, []);

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
                                className={`flex-shrink-0 px-6 py-2.5 rounded-full font-body text-sm tracking-wide font-bold transition-all duration-300 ${activeFilter === cat
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

                    <div className="project-modal relative w-full lg:w-[65vw] xl:w-[55vw] h-[100dvh] bg-bg shadow-2xl flex flex-col pt-[env(safe-area-inset-top)] overflow-hidden">
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={closeModal}
                            aria-label="Fermer le projet"
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
                                        <span className="font-body bg-white/20 text-white border border-white/40 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                                            {selectedProject.category}
                                        </span>
                                        <span className="font-body text-white/70 text-sm font-semibold tracking-wide uppercase">{selectedProject.year}</span>
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
                                                    <span key={tag} className="px-4 py-2 bg-white border border-primary/10 text-dark font-body text-sm font-semibold rounded-lg shadow-sm hover:border-primary/30 transition-colors">
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
                                            <Link to="/contact" className="w-full flex items-center justify-between px-6 py-4 bg-primary text-white font-bold rounded-xl hover:bg-dark transition-colors duration-300 shadow-md hover:shadow-xl group">
                                                <span>Nous consulter</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
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

