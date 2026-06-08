import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Building2, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { OffreEmploi, Entreprise } from '../types';

interface HeroProps {
  offres: OffreEmploi[];
  entreprises: Entreprise[];
  onSearch: (keyword: string, location: string, sector: string) => void;
  setCurrentTab: (tab: string) => void;
  candidateCount: number;
}

export default function Hero({ offres, entreprises, onSearch, setCurrentTab, candidateCount }: HeroProps) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [sector, setSector] = useState('');

  // Extract unique sectors for selecting in the hero search
  const uniqueSectors = Array.from(new Set(offres.map((o) => o.secteur)));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location, sector);
    setCurrentTab('offres');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white py-12 sm:py-20">
      {/* Decorative background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/10 mb-6 animate-fade-in">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            <span>Plateforme de Recrutement Nouvelle Génération</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl max-w-3xl mx-auto">
            Trouvez le job de vos rêves ou recrutez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">talents d'exception</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme de mise en relation de pointe facilitant la gestion des offres d'emploi, le suivi des candidatures et le pilotage RH en temps réel.
          </p>
        </div>

        {/* Search Engine Card */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-100/40">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            
            {/* Keyword */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Poste, mot-clé, outil..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-xl border-0 py-3 pl-9 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Ville / Location */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ville ou Télétravail"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border-0 py-3 pl-9 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Secteur */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Building2 className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-3 pl-9 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="">Tous les secteurs</option>
                {uniqueSectors.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            {/* Search Submit button */}
            <button
              type="submit"
              className="flex items-center justify-center rounded-xl bg-blue-600 py-3 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all cursor-pointer"
            >
              Rechercher
            </button>
          </form>
        </div>

        {/* Real-time Statistics grid */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            
            {/* Stat 1: Job Offers */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100/30 flex items-center space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-gray-900">{offres.length}</span>
                <span className="text-sm font-medium text-gray-500">Offres d'emploi actives</span>
              </div>
            </div>

            {/* Stat 2: Candidates */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100/30 flex items-center space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-gray-900">{candidateCount}</span>
                <span className="text-sm font-medium text-gray-500">Profils candidats vérifiés</span>
              </div>
            </div>

            {/* Stat 3: Corporate/Enterprises */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-100/30 flex items-center space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-gray-900">{entreprises.length}</span>
                <span className="text-sm font-medium text-gray-500">Entreprises partenaires</span>
              </div>
            </div>

          </div>
        </div>

        {/* Platform presentation teaser cards */}
        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-center text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Comment ça fonctionne</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
            
            {/* Teaser 1: Pour les candidats */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg">
              <span className="inline-flex rounded-lg bg-blue-50 text-blue-700 px-2.5 py-1 text-xs font-semibold uppercase mb-4">Pour les Candidats</span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Propulsez votre carrière de façon transparente</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Créez un profil complet comprenant vos formations, vos expériences, vos langues de travail, et déposez votre CV au format numérique. Postulez en un clic et suivez le statut de votre dossier de candidature en temps réel.
              </p>
              <button 
                onClick={() => setCurrentTab('candidat')}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <span>Accéder à mon espace candidat</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Teaser 2: Pour les RH */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg">
              <span className="inline-flex rounded-lg bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold uppercase mb-4">Pour les Recruteurs / RH</span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Gérez vos talents et vos annonces au même endroit</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Rédigez ou éditez vos descriptifs de poste, suivez les statistiques de visite et gérez les lettres de motivation reçues. Filtrez instantanément, téléchargez les curricula vitae et actez le destin de chaque opportunité.
              </p>
              <button 
                onClick={() => setCurrentTab('rh')}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>Ouvrir mon tableau de bord RH</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
