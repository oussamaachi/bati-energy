import codecs

with codecs.open('src/pages/Accueil.jsx', 'r', 'utf-8') as f:
    content = f.read()

start_marker = "{/* Hero Section */}"
end_marker = "{/* Stats Bar */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_hero = """            {/* Hero Section */}
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

"""
    new_content = content[:start_idx] + new_hero + content[end_idx:]
    with codecs.open('src/pages/Accueil.jsx', 'w', 'utf-8') as f:
        f.write(new_content)
    print("Hero section updated successfully.")
else:
    print("Could not find markers.")
