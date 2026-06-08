import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Calendar, SlidersHorizontal, CheckCircle, FileText, Upload, ChevronRight, X } from 'lucide-react';
import { OffreEmploi, Candidat, Candidature } from '../types';

interface OffresListProps {
  offres: OffreEmploi[];
  activeFilters: {
    keyword: string;
    location: string;
    sector: string;
  };
  onApply: (candidature: Omit<Candidature, 'id' | 'dateCandidature' | 'statut'>) => void;
  currentCandidat: Candidat | null;
  hasApplied: (offreId: string) => boolean;
}

export default function OffresList({
  offres,
  activeFilters,
  onApply,
  currentCandidat,
  hasApplied,
}: OffresListProps) {
  // Advanced Filter state
  const [searchWord, setSearchWord] = useState(activeFilters.keyword);
  const [villeFilter, setVilleFilter] = useState(activeFilters.location);
  const [secteurFilter, setSecteurFilter] = useState(activeFilters.sector);
  const [typeContrat, setTypeContrat] = useState<string>('');
  const [salaireMinimum, setSalaireMinimum] = useState<number>(0);

  // Layout states
  const [selectedOffre, setSelectedOffre] = useState<OffreEmploi | null>(offres[0] || null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Apply Form state
  const [motivation, setMotivation] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState(currentCandidat?.cvFilename || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Synchronize state when external filters change
  useEffect(() => {
    setSearchWord(activeFilters.keyword);
    setVilleFilter(activeFilters.location);
    setSecteurFilter(activeFilters.sector);
  }, [activeFilters]);

  // Extract metadata lists for UI selector helpers
  const uniqueSecteurs = Array.from(new Set(offres.map((o) => o.secteur)));
  const uniqueVilles = Array.from(new Set(offres.map((o) => {
    // simple extraction of city name before code
    const clean = o.localisation.split('(')[0].trim();
    return clean;
  })));

  // Filter Calculation logic
  const filteredOffres = offres.filter((item) => {
    const matchesKeyword = !searchWord || 
      item.titre.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.description.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.entrepriseNom.toLowerCase().includes(searchWord.toLowerCase());

    const matchesVille = !villeFilter || 
      item.localisation.toLowerCase().includes(villeFilter.toLowerCase());

    const matchesSecteur = !secteurFilter || 
      item.secteur === secteurFilter;

    const matchesContrat = !typeContrat || 
      item.typeContrat === typeContrat;

    // Standardize salary string to check minimum if preset
    let matchesSalaire = true;
    if (salaireMinimum > 0) {
      const parsedSalary = parseInt(item.salaire.replace(/[^0-9]/g, ''), 10);
      if (parsedSalary && parsedSalary < salaireMinimum) {
        matchesSalaire = false;
      }
    }

    return matchesKeyword && matchesVille && matchesSecteur && matchesContrat && matchesSalaire;
  });

  // Automatically reset selected job if filtered list changes and currently selected is no longer visible
  useEffect(() => {
    if (filteredOffres.length > 0) {
      if (!filteredOffres.find(o => o.id === selectedOffre?.id)) {
        setSelectedOffre(filteredOffres[0]);
      }
    } else {
      setSelectedOffre(null);
    }
  }, [filteredOffres]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffre) return;

    onApply({
      offreId: selectedOffre.id,
      offreTitre: selectedOffre.titre,
      entrepriseNom: selectedOffre.entrepriseNom,
      candidatId: currentCandidat?.id || 'cand_visitor',
      candidatNom: currentCandidat ? 'Jean Dupont' : 'Visiteur Anonyme',
      candidatEmail: currentCandidat ? 'jean.dupont@email.com' : 'visiteur@gmail.com',
      cvFilename: uploadedFileName || 'Mon_Curriculum.pdf',
      lettreMotivation: motivation,
    });

    setApplySuccess(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplySuccess(false);
      setMotivation('');
    }, 2000);
  };

  const openApplyPanel = () => {
    if (currentCandidat) {
      setUploadedFileName(currentCandidat.cvFilename);
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Search and Filters Strip */}
      <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          <span>Filtres de recherche avancés</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Mots clés */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Mots clés</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: React, Node, Ingénieur..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                className="w-full rounded-xl border-0 py-2.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Villes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Ville / Localisation</label>
            <select
              value={villeFilter}
              onChange={(e) => setVilleFilter(e.target.value)}
              className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-2.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="">Toutes les villes</option>
              {uniqueVilles.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Secteurs */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Secteur d'activité</label>
            <select
              value={secteurFilter}
              onChange={(e) => setSecteurFilter(e.target.value)}
              className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-2.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="">Tous les secteurs</option>
              {uniqueSecteurs.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Types de contrat */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Type de contrat</label>
            <select
              value={typeContrat}
              onChange={(e) => setTypeContrat(e.target.value)}
              className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-2.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="">Tous contrats</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Alternance">Alternance</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          {/* Salaire minimum */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Salaire min. estimé (k€)</label>
            <select
              value={salaireMinimum}
              onChange={(e) => setSalaireMinimum(Number(e.target.value))}
              className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-2.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="0">Indifférent</option>
              <option value="35">35 k€ / an</option>
              <option value="40">40 k€ / an</option>
              <option value="45">45 k€ / an</option>
              <option value="50">50 k€ / an</option>
              <option value="55">55 k€ / an</option>
            </select>
          </div>
        </div>
        
        {/* Reset filters button label */}
        {(searchWord || villeFilter || secteurFilter || typeContrat || salaireMinimum > 0) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setSearchWord('');
                setVilleFilter('');
                setSecteurFilter('');
                setTypeContrat('');
                setSalaireMinimum(0);
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>

      {/* Main dual panel view: Job List Left, Active Job Detail Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Side: Cards list */}
        <div className="lg:col-span-5 h-[650px] overflow-y-auto pr-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase">
              {filteredOffres.length} annonce(s) trouvée(s)
            </span>
          </div>

          {filteredOffres.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 px-4 text-center">
              <Briefcase className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-gray-900">Aucun résultat</h4>
              <p className="mt-1 text-xs text-gray-500">Essayez de modifier ou d'assouplir vos filtres.</p>
            </div>
          ) : (
            filteredOffres.map((item) => {
              const applied = hasApplied(item.id);
              const isSelected = selectedOffre?.id === item.id;
              
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedOffre(item)}
                  className={`group relative rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  {/* Applied badge identifier */}
                  {applied && (
                    <span className="absolute top-4 right-4 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100">
                      Candidature envoyée
                    </span>
                  )}

                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl border border-gray-100 shadow-sm">
                      {item.entrepriseLogo}
                    </div>
                    <div className="space-y-1 pr-12">
                      <h4 className="text-sm font-bold text-gray-950 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.titre}
                      </h4>
                      <p className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                        <span className="font-semibold text-gray-800">{item.entrepriseNom}</span>
                        <span>•</span>
                        <span>{item.localisation}</span>
                      </p>
                      
                      {/* Meta Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 uppercase">
                          {item.typeContrat}
                        </span>
                        <span className="rounded-md bg-blue-50/50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                          {item.salaire}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3 text-[11px] text-gray-400">
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Publié le {item.datePublication}
                    </span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Voir détails <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Large detailed panel */}
        <div className="lg:col-span-7 h-[650px] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col">
          {selectedOffre ? (
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              
              <div>
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl border border-gray-100">
                      {selectedOffre.entrepriseLogo}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-950 leading-snug">{selectedOffre.titre}</h2>
                      <p className="text-sm text-gray-600 font-medium mt-1">{selectedOffre.entrepriseNom}</p>
                      <div className="flex flex-wrap gap-1.5 items-center mt-2.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {selectedOffre.localisation}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {selectedOffre.typeContrat}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-600" /> {selectedOffre.salaire}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body details */}
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase">Secteur : {selectedOffre.secteur}</h4>
                  
                  {/* Description format parsed */}
                  <div className="leading-relaxed whitespace-pre-line text-sm text-gray-600">
                    {selectedOffre.description}
                  </div>
                </div>
              </div>

              {/* Apply Footer action bar */}
              <div className="border-t border-gray-100 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-gray-400 font-mono">
                  Référence d'offre : {selectedOffre.id}
                </span>

                {hasApplied(selectedOffre.id) ? (
                  <button
                    disabled
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 border border-emerald-200"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Candidature envoyée</span>
                  </button>
                ) : (
                  <button
                    onClick={openApplyPanel}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    <span>Postuler maintenant</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="m-auto text-center p-8">
              <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium">Sélectionnez une offre à droite de l'écran pour en afficher le détail.</p>
            </div>
          )}
        </div>
      </div>

      {/* Applying Interactive Modal Popup */}
      {isApplyModalOpen && selectedOffre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl animate-in scale-in duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Success state */}
            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-950">Candidature enregistrée !</h3>
                <p className="text-sm text-gray-500">
                  Votre CV et votre lettre ont été transmis avec succès à <strong>{selectedOffre.entrepriseNom}</strong>.
                </p>
                <p className="text-xs text-blue-600 font-mono">Statut du dossier : En attente</p>
              </div>
            ) : (
              <form onSubmit={submitApplication} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">CANDIDATURE RAPIDE</span>
                  <h3 className="text-base font-extrabold text-gray-950 mt-1">
                    Postuler pour : <span className="text-blue-600">{selectedOffre.titre}</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">{selectedOffre.entrepriseNom} • {selectedOffre.localisation}</p>
                </div>

                {/* Identity indicators (pre-populated) */}
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold">Candidat</span>
                    <span className="text-xs font-bold text-gray-800">{currentCandidat ? 'Jean Dupont' : 'Visiteur Anonyme'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold">Email de contact</span>
                    <span className="text-xs font-mono text-gray-600">{currentCandidat ? 'jean.dupont@email.com' : 'visiteur@gmail.com'}</span>
                  </div>
                </div>

                {/* Custom CV File upload element (Usability pattern) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Votre Curriculum Vitae (CV) *</label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload-input')?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragOver
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      id="file-upload-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    {uploadedFileName ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-bold text-gray-900">{uploadedFileName}</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-800">
                          Glissez-déposez votre CV ici ou <span className="text-blue-600 underline">parcourez vos fichiers</span>
                        </p>
                        <p className="text-[10px] text-gray-400">PDF, DOC ou DOCX jusqu'à 5 Mo</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Motivation Letter text area */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-gray-700">Lettre de motivation *</label>
                    <button
                      type="button"
                      onClick={() => setMotivation(
                        `Madame, Monsieur,\n\nC'est avec un grand intérêt que j'ai pris connaissance de votre offre de "${selectedOffre.titre}". Mon profil correspond tout à fait aux qualifications recherchées. Passionné, rigoureux et désireux d'intégrer une équipe dynamique comme la vôtre, je reste à votre entière disposition pour un entretien.\n\nCordialement,\nJean Dupont`
                      )}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                    >
                      (+) Générer une lettre type
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Saisissez ou collez votre lettre de motivation ici..."
                    className="w-full rounded-xl border-0 py-2.5 px-3 text-xs text-gray-900 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Envoyer ma candidature
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
