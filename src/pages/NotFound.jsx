import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                </div>

                <h1 className="font-heading font-black text-8xl md:text-9xl text-primary mb-4">404</h1>
                <h2 className="font-serif italic text-3xl md:text-5xl text-dark mb-6">Page introuvable</h2>

                <p className="font-body text-text/70 text-lg md:text-xl mb-12 max-w-lg mx-auto">
                    Il semblerait que la page que vous cherchez a été déplacée ou n'existe plus.
                </p>

                <Link to="/" className="btn-magnetic inline-flex items-center gap-2 bg-primary hover:bg-primary-mid text-white px-8 py-4 rounded-full font-heading font-bold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1">
                    Retour à l'accueil <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}
