import React, { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PolitiqueConfidentialite() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-bg min-h-screen pt-40 pb-20 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-primary/5">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary/10 p-4 rounded-2xl">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-heading font-black text-3xl md:text-5xl text-dark">Politique de Confidentialité & Mentions Légales</h1>
                </div>

                <div className="prose prose-lg prose-green max-w-none font-body text-text/80">
                    <p className="lead text-xl text-dark font-medium mb-12">
                        BATI ENERGY accorde une importance primordiale à la protection de vos données personnelles et au respect de la vie privée (RGPD).
                    </p>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">1. Éditeur du site</h2>
                    <p>
                        Le site internet <strong>bati-energy.fr</strong> est édité par la société <strong>BATI ENERGY SAS</strong>.<br />
                        Siège social : 45 avenue Pierre Brossolette, 92120 Montrouge, France.<br />
                        Capital social : 50 000 €<br />
                        RCS : Nanterre<br />
                        Email : <a href="mailto:contact@bati-energy.fr" className="underline hover:text-primary">contact@bati-energy.fr</a>
                    </p>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">2. Hébergement</h2>
                    <p>
                        Ce site est hébergé par Cloudflare, Inc.<br />
                        101 Townsend St, San Francisco, CA 94107, États-Unis.
                    </p>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">3. Collecte des données personnelles</h2>
                    <p>
                        Nous collectons les données suivantes via notre formulaire de demande d'étude :
                        Nom, E-mail, Téléphone, Société, Type de projet. Ces données sont strictement nécessaires pour :
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Traiter vos demandes d'études de faisabilité ENR.</li>
                        <li>Vous recontacter suite à votre sollicitation commerciale.</li>
                        <li>Améliorer nos services et notre plateforme.</li>
                    </ul>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">4. Durée de conservation (RGPD)</h2>
                    <p>
                        Vos données personnelles sont conservées uniquement le temps nécessaire à la finalité de leur traitement, dans la limite de <strong>3 ans</strong> à compter de notre dernier contact.
                    </p>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">5. Gestion des Cookies</h2>
                    <p>
                        Ce site utilise des cookies techniques nécessaires à son bon fonctionnement ainsi que des cookies de mesure d'audience anonymisée.
                        Vous pouvez à tout moment modifier vos préférences via le bandeau cookie affiché lors de votre première visite, ou en effaçant le cache de votre navigateur.
                    </p>

                    <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">6. Vos droits</h2>
                    <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de vos données personnelles. Vous pouvez exercer ce droit en nous contactant directement à l'adresse suivante : <strong>dpo@bati-energy.fr</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
