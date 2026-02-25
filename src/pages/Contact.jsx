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

const EnrCalculator = () => {
    const [projectType, setProjectType] = useState('Solaire PV'); // Solaire PV, Éolien, Mixte ENR, Audit seul
    const [power, setPower] = useState(100); // 10 kWc to 500 kWc
    const [structureType, setStructureType] = useState('Entreprise'); // Entreprise, Collectivité, Industriel

    // Derived values for animation
    const [results, setResults] = useState({ prod: 0, savings: 0, co2: 0, roiMin: 0, roiMax: 0 });

    useEffect(() => {
        // Basic mock calculation logic (fictitious but logical for demonstration)
        if (projectType === 'Audit seul') {
            setResults({ prod: 0, savings: power * 15, co2: power * 0.1, roiMin: 1, roiMax: 2 });
            return;
        }

        let baseProd = power * 1.1; // MWh/an per kWc
        if (projectType === 'Éolien') baseProd *= 1.4;
        if (projectType === 'Mixte ENR') baseProd *= 1.3;

        let tariff = structureType === 'Industriel' ? 70 : (structureType === 'Collectivité' ? 90 : 110); // €/MWh
        let baseSavings = baseProd * tariff;

        let baseCo2 = baseProd * 0.05; // tonnes CO2 / MWh (very rough grid average offset here)
        if (projectType === 'Solaire PV') baseCo2 *= 1.2;

        let roiBase = structureType === 'Collectivité' ? 8 : (structureType === 'Industriel' ? 6 : 7);
        if (projectType === 'Mixte ENR') roiBase += 2;

        setResults({
            prod: baseProd,
            savings: baseSavings,
            co2: baseCo2,
            roiMin: Math.max(roiBase - 1, 1),
            roiMax: roiBase + 1
        });
    }, [projectType, power, structureType]);

    const animProd = useCountUp(results.prod, 1.5, 0);
    const animSavings = useCountUp(results.savings, 1.5, 0);
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
                    <h3 className="font-heading font-black text-3xl text-dark mb-4">Calculateur d'Impact ENR</h3>
                    <p className="font-body text-text/70">Estimez le potentiel de votre projet en 3 étapes simples.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Controls */}
                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div>
                            <div className="font-mono text-primary text-sm font-bold tracking-widest mb-3">ÉTAPE 1 — TYPE DE PROJET</div>
                            <div className="flex flex-wrap gap-3">
                                {['Solaire PV', 'Éolien', 'Mixte ENR', 'Audit seul'].map(type => (
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
                                <span>ÉTAPE 2 — PUISSANCE VISÉE</span>
                                <span className="text-accent">{power} kWc</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                step="10"
                                value={power}
                                onChange={(e) => setPower(parseInt(e.target.value))}
                                className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-accent"
                            />
                            <div className="flex justify-between text-xs text-text/50 font-mono mt-2">
                                <span>10 kWc (Toiture)</span>
                                <span>500 kWc (Centrale)</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <div className="font-mono text-primary text-sm font-bold tracking-widest mb-3">ÉTAPE 3 — VOTRE STRUCTURE</div>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { id: 'Entreprise', icon: Building2 },
                                    { id: 'Collectivité', icon: Trees },
                                    { id: 'Industriel', icon: Zap }
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
                            {projectType !== 'Audit seul' ? (
                                <>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">PRODUCTION ESTIMÉE</div>
                                        <div className="font-heading font-black text-3xl md:text-4xl text-white">{animProd} <span className="text-xl text-primary-light">MWh/an</span></div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">ÉCONOMIES NETTES</div>
                                        <div className="font-heading font-black text-3xl md:text-4xl text-accent">{new Intl.NumberFormat('fr-FR').format(animSavings)} <span className="text-xl">€/an</span></div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">RÉDUCTION CO₂</div>
                                        <div className="font-heading font-black text-3xl md:text-4xl text-white">{animCo2} <span className="text-xl text-primary-light">t/an</span></div>
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs text-white/50 tracking-widest mb-2">R.O.I ESTIMÉ</div>
                                        <div className="font-heading font-black text-3xl md:text-4xl text-accent">{animRoiMin} à {animRoiMax} <span className="text-xl">ans</span></div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-2 text-center py-8">
                                    <div className="font-mono text-xs text-white/50 tracking-widest mb-4">GAIN POTENTIEL EN OPTIMISATION OPEX</div>
                                    <div className="font-heading font-black text-5xl text-accent mb-4">{new Intl.NumberFormat('fr-FR').format(animSavings)} €/an</div>
                                    <div className="font-body text-white/70 max-w-sm mx-auto">Basé sur une estimation de 15% d'économies réalisables suite à un audit complet approfondi.</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 pt-8 border-t border-primary/10">
                    <p className="font-body text-text/70 mb-6 font-medium">Ces chiffres vous intéressent ? Affinons-les ensemble.</p>
                    <a href="#contact-form" className="btn-magnetic px-8 py-4">
                        <span>Demander une étude précise <ArrowRight className="w-5 h-5" /></span>
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
                            <h2 className="font-heading font-black text-3xl md:text-4xl text-dark mb-4">Lancez la dynamique</h2>
                            <p className="font-body text-text/70 text-lg">Nos ingénieurs vous recontactent sous 48h ouvrées avec une première analyse de faisabilité.</p>
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
                                        <option value="etudes">Étude technique (Faisabilité, PV, Éolien...)</option>
                                        <option value="conseil">Conseil stratégique & AMO</option>
                                        <option value="audit">Audit énergétique réglementaire</option>
                                        <option value="formation">Formation professionnelle</option>
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
                <EnrCalculator />
            </section>
        </div>
    );
}
