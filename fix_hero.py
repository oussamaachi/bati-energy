import re

with open('src/pages/Accueil.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

start_str = '<div className=\"max-w-4xl space-y-4\">'
end_str = '<div className=\"hero-anim pt-8 flex flex-wrap items-center gap-6\">'

new_block = '''                        <div className="hero-anim flex items-center gap-4 mb-8">
                            <span className="bg-white/5 border border-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse"></span> Particuliers
                            </span>
                            <span className="bg-accent/10 border border-accent/20 text-[#f5a000] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(245,160,0,0.15)] flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_5px_rgba(245,160,0,0.8)]"></span> Tertiaire
                            </span>
                        </div>
                        <h1 className="flex flex-col relative z-10">
                            <span className="hero-anim text-white font-heading font-black text-5xl md:text-7xl lg:text-[5rem] leading-[1.1] tracking-tight drop-shadow-xl">
                                Maximisez votre
                            </span>
                            <span className="hero-anim text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#ffb732] to-[#ffcc66] font-heading font-black text-[3.5rem] sm:text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] tracking-tighter drop-shadow-[0_0_25px_rgba(245,160,0,0.3)] pb-2 scale-y-105 origin-left">
                                efficacité énergétique.
                            </span>
                        </h1>
                        <p className="hero-anim text-white/90 font-body text-lg md:text-xl lg:text-2xl max-w-2xl mt-8 border-l-4 border-accent pl-6 leading-relaxed bg-gradient-to-r from-dark/60 via-dark/20 to-transparent py-3 pr-4 rounded-r-2xl backdrop-blur-sm">
                            Audit énergétique, isolation thermique, pompes à chaleur et valorisation CEE. Des solutions clés en main, de l'étude à la réalisation.
                        </p>'''

start_idx = text.find(start_str)
end_idx = text.find(end_str)

if start_idx != -1 and end_idx != -1:
    # Build new text
    text = text[:start_idx + len(start_str)] + '\n' + new_block + '\n                        ' + text[end_idx:]
    with open('src/pages/Accueil.jsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully updated the hero section in Accueil.jsx!")
else:
    print("Could not find the target anchor tags.")
