import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Mail, Clock, Send, Calculator, Zap, Building2, Trees } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for CountUp with GSAP
const useCountUp = (end, duration = 1.5, start = 0, isDecimal = false) => {
    const [target, setTarget] = useState(start);
    const valObj = useRef({ val: start });

    useEffect(() => {
        gsap.to(valObj.current, {
            val: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
                setTarget(isDecimal ? valObj.current.val.toFixed(1) : Math.floor(valObj.current.val));
            }
        });
    }, [end, duration, isDecimal]);

    return target;
};

const EfficiencyCalculator = () => {
    const [projectType, setProjectType] = useState('Relamping LED'); // Relamping LED, Isolation, CVC / GTB, Audit global
    const [surface, setSurface] = useState(1000); // 500 to 10000 m2
    const [structureType, setStructureType] = useState('Tertiaire'); // Tertiaire, Industriel, Collectivité

    // Derived values for animation
    const [results, setResults] = useState({ savingsAmount: 0, ceeEstimate: 0, co2: 0, roiMin: 0, roiMax: 0 });

    useEffect(() => {
        if (projectType === 'Audit global') {
            setResults({ savingsAmount: surface * 15, ceeEstimate: 0, co2: surface * 0.02, roiMin: 1, roiMax: 2 });
            return;
        }

        let baseSavingsPerM2 = 0;
        let baseCeePerM2 = 0;
        let baseCo2PerM2 = 0;
        let roiBase = 0;

        if (projectType === 'Relamping LED') {
            baseSavingsPerM2 = 12;
            baseCeePerM2 = 4;
            baseCo2PerM2 = 0.015;
            roiBase = 2;
        } else if (projectType === 'Isolation') {
            baseSavingsPerM2 = 25;
            baseCeePerM2 = 15;
            baseCo2PerM2 = 0.04;
            roiBase = 6;
        } else if (projectType === 'CVC / GTB') {
            baseSavingsPerM2 = 30;
            baseCeePerM2 = 20;
            baseCo2PerM2 = 0.05;
            roiBase = 4;
        }

        let structureMultiplier = structureType === 'Industriel' ? 1.3 : (structureType === 'Collectivité' ? 0.9 : 1.0);

        setResults({
            savingsAmount: surface * baseSavingsPerM2 * structureMultiplier,
            ceeEstimate: surface * baseCeePerM2 * structureMultiplier,
            co2: surface * baseCo2PerM2 * structureMultiplier,
            roiMin: Math.max(roiBase - 1, 1),
            roiMax: roiBase + 1.5
        });
    }, [projectType, surface, structureType]);

    const animSavings = useCountUp(results.savingsAmount, 1.5, 0);
    const animCee = useCountUp(results.ceeEstimate, 1.5, 0);
    const animCo2 = useCountUp(results.co2, 1.5, 0);
    const animRoiMin = useCountUp(results.roiMin, 1, 0, true);
    const animRoiMax = useCountUp(results.roiMax, 1, 0, true);

    return (
        <div className="bg-bg p-8 md:p-12 rounded-3xl shadow-2xl border border-primary/5 relative overflow-hidden mt-16 max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 p-8 text-primary/10">
                <Calculator className="w-48 h-48 rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h3 className="font-heading font-black text-3xl text-dark mb-4">Simulateur de Rénovation & CEE</h3>
                    <p className="font-body text-text/70">Estimez vos économies et vos aides financières potentielles en 3 clics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Controls */}
                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div>
                            <div className="font-mono text-primary text-sm font-bold tracking-widest mb-3">ÉTAPE 1 — LOT TECHNIQUE</div>
                            <div className="flex flex-wrap gap-3">
                                {['Relamping LED', 'Isolation', 'CVC / GTB', 'Audit global'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setProjectType(type)}
                                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${projectType === type
                                            ? 'bg-primary border-primary text-white shadow-md scale-105'
                                            : 'bg-white border-primary/20 text-text/70 hover:border-accent'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <div className="font-mono text-primary text-sm font-bold tracking-widest mb-3 flex justify-between">
                                <span>ÉTAPE 2 — SURFACE CONCERNÉE</span>
                                <span className="text-accent">{surface} m²</span>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="100"
                                value={surface}
                                onChange={(e) => setSurface(parseInt(e.target.value))}
                                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                            <div className="flex justify-between text-xs text-text/50 font-mono mt-2">
                                <span>500 m²</span>
                                <span>10 000 m² +</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <div className="font-mono text-primary text-sm font-bold tracking-widest mb-3">ÉTAPE 3 — SECTEUR D'ACTIVITÉ</div>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { id: 'Tertiaire', icon: Building2 },
                                    { id: 'Industriel', icon: Zap },
                                    { id: 'Collectivité', icon: Trees }
                                ].map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => setStructureType(type.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${structureType === type.id
                                            ? 'bg-primary border-primary text-white shadow-md scale-105'
                                            : 'bg-white border-primary/20 text-text/70 hover:border-accent'
                                            }`}
                                    >
                                        <type.icon className="w-4 h-4" /> {type.id}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="bg-dark text-white rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col justify-center relative overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-50 blur-xl mix-blend-screen pointer-events-none"></div>

                        <div className="relative z-10 grid grid-cols-2 gap-8">
                            {projectType !== 'Audit global' ? (
                                <>
                                    <div className="col-span-2">
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">POTENTIEL PRIMES CEE</div>
                                        <div className="font-heading font-black text-4xl md:text-5xl text-accent">~ {new Intl.NumberFormat('fr-FR').format(animCee)} <span className="text-2xl">€</span></div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">ÉCONOMIES D'ÉNERGIE (AN)</div>
                                        <div className="font-heading font-black text-2xl md:text-3xl text-white">{new Intl.NumberFormat('fr-FR').format(animSavings)} <span className="text-lg">€</span></div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">R.O.I APRÈS AIDES</div>
                                        <div className="font-heading font-black text-2xl md:text-3xl text-white">{animRoiMin} à {animRoiMax} <span className="text-lg">ans</span></div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-2 text-center py-4">
                                    <div className="font-mono text-xs text-white/50 tracking-widest mb-4">GAIN MOYEN SUITE À L'AUDIT</div>
                                    <div className="font-heading font-black text-4xl text-accent mb-4">- {new Intl.NumberFormat('fr-FR').format(animSavings)} €/an</div>
                                    <div className="font-body text-white/70 text-sm max-w-sm mx-auto">Basé sur une estimation de 20% d'économies réalisables en optimisant vos installations (sans CAPEX majeur).</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 pt-8 border-t border-primary/10">
                    <p className="font-body text-text/70 mb-6 font-medium">Les CEE fluctuent. Sécurisons votre prime dès aujourd'hui.</p>
                    <a href="#contact-form" className="btn-magnetic px-8 py-4">
                        <span>Lancer une vérification d'éligibilité <ArrowRight className="w-5 h-5" /></span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function Contact() {
    const heroRef = useRef(null);
    const [formState, setFormState] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.hero-text',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulated API call
        setTimeout(() => {
            setFormState('success');
            setTimeout(() => setFormState('idle'), 5000); // Reset after 5s
        }, 1500);
    };

    return (
        <div className="bg-bg min-h-screen">
            {/* Hero Interne */}
            <section ref={heroRef} className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/bureau.png"
                        alt="Réunion équipe"
                        className="w-full h-full object-cover object-center grayscale"
                    />
                </div>
                <div className="relative z-10 text-center px-6 mt-16">
                    <h1 className="hero-text font-serif italic text-5xl md:text-6xl text-white mb-4">Parlons de votre projet</h1>
                    <div className="hero-text font-mono text-xs text-white/50 tracking-wide uppercase">
                        Accueil <span className="mx-2 text-accent">/</span> Contact
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto" id="contact-form">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Colonne Gauche - Formulaire */}
                    <div className="w-full lg:w-3/5">
                        <div className="mb-10">
                            <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-4">Consultez notre Bureau d'Études</h2>
                            <p className="font-body text-text/70 text-lg">Nos ingénieurs vous recontactent sous 48h ouvrées avec une première analyse de faisabilité énergétique et d'éligibilité CEE.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nom" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Nom complet <span className="text-accent">*</span></label>
                                    <input type="text" id="nom" required className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark placeholder:text-text/30" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Email professionnel <span className="text-accent">*</span></label>
                                    <input type="email" id="email" required className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark placeholder:text-text/30" placeholder="jane@societe.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="telephone" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Téléphone</label>
                                    <input type="tel" id="telephone" className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark placeholder:text-text/30" placeholder="+33 6 00 00 00 00" />
                                </div>
                                <div>
                                    <label htmlFor="societe" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Organisation / Société</label>
                                    <input type="text" id="societe" className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark placeholder:text-text/30" placeholder="Mairie de..." />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="besoin" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Type de besoin</label>
                                <div className="relative">
                                    <select id="besoin" className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark cursor-pointer">
                                        <option value="">Sélectionnez un domaine d'intervention</option>
                                        <option value="audit">Bureau d'études & Audit énergétique</option>
                                        <option value="cee">Montage & Valorisation dossier CEE</option>
                                        <option value="travaux">Réalisation Travaux (Isolation, CVC, LED)</option>
                                        <option value="autre">Autre demande</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block font-mono text-xs font-bold text-dark tracking-widest mb-2 uppercase">Description du projet</label>
                                <textarea id="description" rows="4" className="w-full bg-white border border-primary/20 rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-dark placeholder:text-text/30 resize-y" placeholder="Objectifs, contraintes, timing visé..."></textarea>
                            </div>

                            <div className="flex items-start gap-4">
                                <input type="checkbox" id="rgpd" required className="mt-1 w-5 h-5 rounded border-primary/20 text-accent focus:ring-accent cursor-pointer" />
                                <label htmlFor="rgpd" className="font-body text-sm text-text/70 leading-relaxed cursor-pointer">
                                    J'accepte que les données saisies dans ce formulaire soient utilisées pour me recontacter dans le cadre de ma demande. <a href="/politique-confidentialite" className="underline decoration-primary/30 underline-offset-2 hover:text-primary transition-colors">Politique de confidentialité</a>.
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className={`w-full md:w-auto relative overflow-hidden inline-flex items-center justify-center rounded-full font-heading font-bold text-white transition-all duration-300 px-10 py-5 ${formState === 'success' ? 'bg-primary' : 'bg-accent hover:bg-accent-hot hover:scale-[1.03] shadow-lg'
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {formState === 'submitting' ? (
                                            <>Traitement en cours <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                                        ) : formState === 'success' ? (
                                            <>Demande envoyée avec succès ✓</>
                                        ) : (
                                            <>Demander une étude gratuite <Send className="w-5 h-5" /></>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Colonne Droite - Infos */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-primary text-white rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden border border-white/10 lg:sticky lg:top-32">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                            <h3 className="font-heading font-black text-2xl mb-10 relative z-10">Directement en contact.</h3>

                            <ul className="space-y-8 relative z-10">
                                <li className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-dark transition-colors duration-300 border border-white/10">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-xs tracking-widest text-white/50 mb-2 font-bold uppercase">Siège Social</h4>
                                        <p className="font-body text-lg font-medium leading-relaxed">45 avenue Pierre Brossolette<br />92120 Montrouge, France</p>
                                    </div>
                                </li>

                                <li className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-dark transition-colors duration-300 border border-white/10">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-xs tracking-widest text-white/50 mb-2 font-bold uppercase">Adresse Email</h4>
                                        <a href="mailto:contact@bati-energy.fr" className="font-body text-lg font-medium hover:text-accent transition-colors">contact@bati-energy.fr</a>
                                    </div>
                                </li>

                                <li className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-dark transition-colors duration-300 border border-white/10">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-mono text-xs tracking-widest text-white/50 mb-2 font-bold uppercase">Horaires d'ouverture</h4>
                                        <p className="font-body text-lg font-medium leading-relaxed">Lun–Ven : 09:00 – 18:00<br /><span className="text-white/60">Fermé le week-end et jours fériés</span></p>
                                    </div>
                                </li>
                            </ul>

                            {/* Status pill */}
                            <div className="mt-12 pt-8 border-t border-white/10 relative z-10 flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4CAF50]"></span>
                                </span>
                                <span className="font-mono font-bold text-sm tracking-widest">DISPONIBLE POUR NOUVEAUX PROJETS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Calculator Section */}
            <section className="py-24 px-6 border-t border-primary/10">
                <EfficiencyCalculator />
            </section>
        </div>
    );
}
