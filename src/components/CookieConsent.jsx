import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';
import gsap from 'gsap';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('bati_energy_cookie_consent');
        if (!consent) {
            // Slight delay before showing
            const timer = setTimeout(() => {
                setIsVisible(true);
                gsap.fromTo('.cookie-banner',
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
                );
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('bati_energy_cookie_consent', 'accepted');
        gsap.to('.cookie-banner', {
            y: 100, opacity: 0, duration: 0.5, ease: "power2.in",
            onComplete: () => setIsVisible(false)
        });
    };

    const handleDecline = () => {
        localStorage.setItem('bati_energy_cookie_consent', 'declined');
        gsap.to('.cookie-banner', {
            y: 100, opacity: 0, duration: 0.5, ease: "power2.in",
            onComplete: () => setIsVisible(false)
        });
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[450px] bg-dark border border-primary/20 rounded-3xl p-6 shadow-2xl z-[100] text-bg flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">Vos données, votre choix</h3>
                </div>
                <button onClick={handleDecline} className="text-bg/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <p className="font-body text-sm text-bg/70 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser notre trafic et vous proposer des contenus personnalisés. Conformément au RGPD, vous pouvez choisir d'accepter ou de refuser ces traceurs.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <button onClick={handleAccept} className="w-full sm:w-auto px-6 py-2.5 bg-accent text-dark font-mono text-sm font-bold rounded-full hover:bg-accent-hot transition-colors flex-1 text-center">
                    Accepter tout
                </button>
                <button onClick={handleDecline} className="w-full sm:w-auto px-6 py-2.5 bg-white/10 text-white font-mono text-sm font-bold rounded-full hover:bg-white/20 transition-colors flex-1 text-center">
                    Gérer / Refuser
                </button>
            </div>

            <div className="text-center mt-2">
                <Link to="/politique-confidentialite" className="font-mono text-xs text-primary hover:text-primary-light transition-colors underline underline-offset-4">
                    Lire notre politique de confidentialité
                </Link>
            </div>
        </div>
    );
}

