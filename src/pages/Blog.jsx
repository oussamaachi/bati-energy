import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Calendar, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { articles, featuredArticle } from '../data/blogData';
import { Link } from 'react-router-dom';

export default function Blog() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.hero-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Featured Article
            gsap.fromTo('.featured-article',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
            );

            // Grid Articles
            gsap.fromTo('.article-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.grid-container',
                        start: "top 80%"
                    }
                }
            );

            // Newsletter form
            gsap.fromTo('.newsletter-content',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.newsletter-section',
                        start: "top 85%"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-bg min-h-screen">
            {/* Hero Interne */}
            <section className="relative h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/bureau.png"
                        alt="Bureau environnement"
                        className="w-full h-full object-cover object-center grayscale"
                    />
                </div>
                <div className="relative z-10 text-center px-6 mt-16">
                    <h1 className="hero-text font-serif italic text-5xl md:text-6xl text-white mb-4">Actualités & Ressources</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> Blog
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
                {/* Article Mis en Avant */}
                <Link to={`/blog/${featuredArticle.slug}`} className="featured-article bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-primary/5 flex flex-col md:flex-row cursor-pointer group mb-24 hover:shadow-primary/10 transition-shadow">
                    <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                        <img
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 bg-accent text-white font-mono text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                            À LA UNE
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="flex items-center gap-4 font-mono text-xs text-text/50 mb-4">
                            <span className="text-primary font-bold uppercase">{featuredArticle.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                        </div>

                        <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-dark mb-6 leading-tight group-hover:text-primary transition-colors">
                            {featuredArticle.title}
                        </h2>

                        <p className="font-body text-text/70 text-lg leading-relaxed mb-8 line-clamp-3">
                            {featuredArticle.excerpt}
                        </p>

                        <div className="mt-auto">
                            <span className="font-heading font-bold text-accent group-hover:text-accent-hot transition-colors flex items-center gap-2 uppercase text-sm tracking-wider">
                                Lire l'article complet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Grille Articles */}
                <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <Link to={`/blog/${article.slug}`} key={index} className="article-card flex flex-col bg-bg group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 shadow-md shadow-primary/5">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary font-mono text-xs font-bold px-3 py-1.5 rounded-md shadow-sm uppercase">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 font-mono text-xs text-text/50 mb-3">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                                </div>

                                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="font-body text-text/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <span className="font-heading font-bold text-sm text-accent group-hover:text-accent-hot transition-colors flex items-center gap-2 uppercase tracking-wider">
                                        Lire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section bg-dark text-white py-24 px-6 relative mt-16 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden shadow-2xl border border-primary/20">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(26,92,26,0.5))] mix-blend-screen pointer-events-none"></div>
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <Mail className="newsletter-content w-12 h-12 text-accent mx-auto mb-6" />
                    <h2 className="newsletter-content font-heading font-black text-3xl md:text-4xl mb-4">La veille réglementaire de nos ingénieurs</h2>
                    <p className="newsletter-content font-body text-bg/70 text-lg mb-10 max-w-2xl mx-auto">
                        Recevez chaque mois notre sélection technique, réglementaire et stratégique sur la transition énergétique des territoires.
                    </p>

                    <form className="newsletter-content flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Votre email professionnel"
                            className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-body"
                            required
                        />
                        <button type="submit" className="btn-magnetic px-8 py-4 sm:w-auto w-full">
                            <span>S'abonner <ArrowRight className="w-4 h-4 inline" /></span>
                        </button>
                    </form>
                    <p className="newsletter-content font-mono text-xs text-white/30 mt-6">
                        Zéro spam. Désabonnement en un clic.
                    </p>
                </div>
            </section>

            {/* Small spacing to not collide with footer visually */}
            <div className="h-12"></div>
        </div>
    );
}

