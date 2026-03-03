import codecs

with codecs.open("src/pages/Accueil.jsx", "r", "utf-8") as f:
    text = f.read()

start_marker = "{/* Hero Section */}"
end_marker = "{/* Stats Bar */}"

start = text.find(start_marker)
end = text.find(end_marker)

if start != -1 and end != -1:
    new_hero = """            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-6 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero_texture.png"
                        alt="Efficacité énergétique bâtiments"
                        className="w-full h-full object-cover object-center transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-primary/50 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="max-w-4xl space-y-4">
                        <div className="hero-anim flex items-center gap-3 mb-6">
                            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm">
                                🏠 Particuliers
                            </span>
                            <span className="bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm">
                                🏢 Tertiaire
                            </span>
                        </div>
                        <h1 className="flex flex-col">
                            <span className="hero-anim text-white font-heading font-black text-4xl md:text-6xl lg:text-[4rem] leading-tight tracking-tight">
                                Maximisez votre
                            </span>
                            <span className="hero-anim text-accent font-serif italic text-6xl md:text-8xl lg:text-[7rem] leading-none mt-2">
                                efficacité énergétique.
                            </span>
                        </h1>
                        <p className="hero-anim text-bg/90 font-body text-lg md:text-xl max-w-2xl mt-6 border-l-2 border-accent pl-4">
                            Audit énergétique, isolation thermique, pompes à chaleur et valorisation CEE. Des solutions clés en main, de l'étude à la réalisation.
                        </p>
                        <div className="hero-anim pt-8 flex flex-wrap items-center gap-6">
                            <Link to="/contact" className="btn-magnetic px-8 py-4 text-base shadow-[0_0_30px_rgba(245,160,0,0.3)] hover:-translate-y-1 transition-transform bg-accent text-dark font-heading font-bold rounded-full">
                                <span className="flex items-center gap-2">Demander une étude <ArrowRight className="w-5 h-5" /></span>
                            </Link>
                            <Link to="/expertises" className="hover-link text-white font-medium flex items-center gap-2 group">
                                Découvrir nos expertises
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

"""
    new_content = text[:start] + new_hero + text[end:]
    with codecs.open("src/pages/Accueil.jsx", "w", "utf-8") as f:
        f.write(new_content)
    print("Hero section restored!")
else:
    print("Markers not found.")
