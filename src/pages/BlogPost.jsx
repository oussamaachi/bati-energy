import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Tag, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { articles, featuredArticle } from '../data/blogData';
import ReactMarkdown from 'react-markdown';

// Custom renderers — gives full control over how each Markdown element is styled
const mdComponents = {
    h1: ({ children }) => (
        <h1 className="font-heading font-black text-4xl text-dark mt-12 mb-5 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-heading font-black text-2xl lg:text-3xl text-dark mt-12 mb-4 leading-tight border-l-4 border-primary pl-5 py-1">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-heading font-bold text-xl text-primary mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="font-heading font-bold text-lg text-dark/80 mt-6 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
        <p className="font-body text-[#2d2d2d] text-base leading-[1.9] mb-5">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-none pl-0 my-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 my-6 space-y-2 text-[#2d2d2d] font-body">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="font-body text-[#2d2d2d] leading-relaxed flex items-start gap-3 before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-primary before:shrink-0 before:mt-[0.55rem]">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="font-bold text-dark">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic text-dark/70">{children}</em>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent bg-accent/5 pl-6 pr-4 py-4 rounded-r-xl my-6 italic text-dark/70 font-body">{children}</blockquote>
    ),
    code: ({ inline, children }) =>
        inline ? (
            <code className="bg-primary/10 text-primary font-mono text-sm px-2 py-0.5 rounded">{children}</code>
        ) : (
            <pre className="bg-dark text-white font-mono text-sm rounded-2xl p-6 my-6 overflow-x-auto">
                <code>{children}</code>
            </pre>
        ),
    a: ({ href, children }) => (
        <a href={href} className="text-primary underline underline-offset-4 hover:text-primary-mid transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
    hr: () => <hr className="border-dark/10 my-10" />,
};

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const allArticles = [featuredArticle, ...articles];
    const article = allArticles.find(a => a.slug === slug);

    // Find related articles (same category, excluding current)
    const relatedArticles = allArticles
        .filter(a => a.slug !== slug && a.category === article?.category)
        .slice(0, 2);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (article) {
            gsap.fromTo('.post-fade',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
            );
        }
    }, [slug, article]);

    if (!article) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center">
                <BookOpen className="w-16 h-16 text-primary/40 mb-6" />
                <h1 className="font-heading font-black text-7xl text-white mb-4">404</h1>
                <p className="font-body text-xl text-white/60 mb-8">Cet article est introuvable.</p>
                <button onClick={() => navigate('/blog')} className="btn-primary">Retour au blog</button>
            </div>
        );
    }

    return (
        <div className="bg-[#F4F6F1] min-h-screen">

            {/* ── DARK HERO ─────────────────────────────────────────── */}
            <section className="relative bg-dark overflow-hidden pt-28 pb-20">
                {/* Background image with heavy overlay */}
                <div className="absolute inset-0">
                    <img
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-primary/40" />
                    {/* Decorative accent dot */}
                    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                    {/* Breadcrumb */}
                    <div className="post-fade mb-12">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Retour aux articles
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
                        {/* Text */}
                        <div className="space-y-6">
                            <div className="post-fade">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-widest border border-accent/30">
                                    {article.category}
                                </span>
                            </div>

                            <h1 className="post-fade font-heading font-black text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1]">
                                {article.title}
                            </h1>

                            <div className="post-fade flex flex-wrap items-center gap-6 font-mono text-sm text-white/50">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    {article.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-accent" />
                                    Lecture : {article.readTime}
                                </span>
                            </div>

                            <blockquote className="post-fade border-l-4 border-accent pl-6 py-1">
                                <p className="font-serif italic text-lg text-white/80 leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </blockquote>
                        </div>

                        {/* Hero Image */}
                        <div className="post-fade relative">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-primary/30">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-dark/20 to-transparent" />
                            </div>
                            {/* floating category badge on image */}
                            <div className="absolute -bottom-4 -left-4 bg-primary text-white font-mono text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-primary/30 uppercase tracking-widest">
                                {article.category}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Curved bridge to white background */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#F4F6F1] rounded-t-[3rem]" />
            </section>

            {/* ── CONTENT ───────────────────────────────────────────── */}
            <section className="relative -mt-4 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">

                        {/* Main Article Body */}
                        <article className="post-fade bg-white rounded-[2.5rem] shadow-lg shadow-dark/5 border border-dark/5 overflow-hidden">
                            <div className="p-8 md:p-14 lg:p-16">
                                <div className="min-w-0">
                                    <ReactMarkdown components={mdComponents}>
                                        {article.content}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Article Footer */}
                            <div className="border-t border-dark/8 bg-dark/[0.015] px-8 md:px-14 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Tag className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="font-mono text-sm text-dark/50 uppercase tracking-widest">{article.category}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-body text-sm font-semibold text-dark/60">Partager :</span>
                                    <button
                                        onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                                        className="flex items-center gap-2 bg-primary text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-primary-mid transition-colors shadow-sm"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Partager l'article
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="post-fade space-y-6 lg:sticky lg:top-28">

                            {/* Reading info card */}
                            <div className="bg-white rounded-2xl border border-dark/8 p-6 shadow-sm">
                                <p className="font-mono text-xs text-dark/40 uppercase tracking-widest mb-4">À propos de l'article</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-dark/70 font-body">
                                        <Calendar className="w-4 h-4 text-accent shrink-0" />
                                        <span>Publié le <strong className="text-dark">{article.date}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-dark/70 font-body">
                                        <Clock className="w-4 h-4 text-accent shrink-0" />
                                        <span>Temps de lecture : <strong className="text-dark">{article.readTime}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-dark/70 font-body">
                                        <Tag className="w-4 h-4 text-accent shrink-0" />
                                        <span>Catégorie : <strong className="text-dark">{article.category}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA card */}
                            <div className="bg-dark rounded-2xl p-6 text-white shadow-lg">
                                <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Expert BATI ENERGY</p>
                                <h3 className="font-heading font-black text-lg mb-3 leading-snug">Un projet d'efficacité énergétique ? Parlons-en.</h3>
                                <p className="font-body text-sm text-white/60 mb-6 leading-relaxed">
                                    Nos ingénieurs analysent votre situation et vous proposent un plan d'action sur-mesure.
                                </p>
                                <Link
                                    to="/contact"
                                    className="block text-center bg-accent text-white font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-accent-hot transition-colors shadow-md shadow-accent/30"
                                >
                                    Prendre contact →
                                </Link>
                            </div>

                            {/* Related articles */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-2xl border border-dark/8 p-6 shadow-sm">
                                    <p className="font-mono text-xs text-dark/40 uppercase tracking-widest mb-4">Articles similaires</p>
                                    <div className="space-y-4">
                                        {relatedArticles.map((rel) => (
                                            <Link
                                                key={rel.slug}
                                                to={`/blog/${rel.slug}`}
                                                className="flex items-start gap-3 group"
                                            >
                                                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-dark/10">
                                                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <p className="font-body text-sm font-semibold text-dark/80 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                    {rel.title}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

        </div>
    );
}
