import React, { useState } from 'react';
import { Briefcase, Building2, Users, FileText, Download, TrendingUp, AlertCircle, Plus, Edit, Trash2, Check, CheckCircle2, X } from 'lucide-react';
import { OffreEmploi, Candidature, Entreprise, Candidat } from '../types';

interface RHDashboardProps {
  offres: OffreEmploi[];
  candidatures: Candidature[];
  entreprises: Entreprise[];
  onAddOffre: (offre: Omit<OffreEmploi, 'id' | 'datePublication' | 'entrepriseId' | 'entrepriseNom' | 'entrepriseLogo'>) => void;
  onEditOffre: (updated: OffreEmploi) => void;
  onDeleteOffre: (id: string) => void;
  onUpdateCandidatureStatus: (id: string, newStatus: Candidature['statut']) => void;
}

export default function RHDashboard({
  offres,
  candidatures,
  entreprises,
  onAddOffre,
  onEditOffre,
  onDeleteOffre,
  onUpdateCandidatureStatus,
}: RHDashboardProps) {
  // Navigation inside RH Dashboard
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'candidates' | 'jobs'>('stats');

  // Candidate filtering states
  const [jobFilter, setJobFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Add Job offer states
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<OffreEmploi | null>(null);

  // Job Form fields state
  const [jobForm, setJobForm] = useState({
    titre: '',
    localisation: '',
    secteur: 'Informatique & Tech',
    typeContrat: 'CDI' as OffreEmploi['typeContrat'],
    salaire: '',
    description: '',
  });

  // Calculate stats
  const totalOffres = offres.length;
  const totalCandidatures = candidatures.length;
  
  const countByStatus = {
    'En attente': candidatures.filter(c => c.statut === 'En attente').length,
    'En cours d\'examen': candidatures.filter(c => c.statut === 'En cours d\'examen').length,
    'Acceptée': candidatures.filter(c => c.statut === 'Acceptée').length,
    'Refusée': candidatures.filter(c => c.statut === 'Refusée').length,
  };

  const acceptanceRate = totalCandidatures > 0
    ? Math.round((countByStatus['Acceptée'] / totalCandidatures) * 100)
    : 0;

  // Filter application list
  const filteredCandidatures = candidatures.filter(app => {
    const matchesJob = !jobFilter || app.offreId === jobFilter;
    const matchesStatus = !statusFilter || app.statut === statusFilter;
    return matchesJob && matchesStatus;
  });

  const handleAddJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      onEditOffre({
        ...editingJob,
        titre: jobForm.titre,
        localisation: jobForm.localisation,
        secteur: jobForm.secteur,
        typeContrat: jobForm.typeContrat,
        salaire: jobForm.salaire,
        description: jobForm.description,
      });
      setEditingJob(null);
    } else {
      onAddOffre({
        titre: jobForm.titre,
        localisation: jobForm.localisation,
        secteur: jobForm.secteur,
        typeContrat: jobForm.typeContrat,
        salaire: jobForm.salaire,
        description: jobForm.description,
      });
    }

    // Reset Form
    setJobForm({
      titre: '',
      localisation: '',
      secteur: 'Informatique & Tech',
      typeContrat: 'CDI',
      salaire: '',
      description: '',
    });
    setShowAddJobForm(false);
  };

  const startEditJob = (job: OffreEmploi) => {
    setEditingJob(job);
    setJobForm({
      titre: job.titre,
      localisation: job.localisation,
      secteur: job.secteur,
      typeContrat: job.typeContrat,
      salaire: job.salaire,
      description: job.description,
    });
    setShowAddJobForm(true);
  };

  const simulateDownloadCv = (filename: string) => {
    alert(`Téléchargement du CV '${filename}' initié en format binaire.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Introduction Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Tableau de bord RH</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez vos publications, révisez les candidatures et analysez les métriques de recrutement.</p>
        </div>

        {/* Action Button to post new vacancy */}
        <button
          onClick={() => {
            setEditingJob(null);
            setJobForm({
              titre: '',
              localisation: '',
              secteur: 'Informatique & Tech',
              typeContrat: 'CDI',
              salaire: '',
              description: '',
            });
            setShowAddJobForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Publier une offre d'emploi</span>
        </button>
      </div>

      {/* RH Subnavigation tabs */}
      <div className="flex border-b border-gray-100 mb-8 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('stats')}
          className={`pb-3 transition-colors ${
            activeSubTab === 'stats'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Métriques / Graphiques
        </button>
        <button
          onClick={() => setActiveSubTab('candidates')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'candidates'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Candidatures Reçues
          {candidatures.length > 0 && (
            <span className="ml-1.5 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-600">
              {candidatures.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`pb-3 transition-colors ${
            activeSubTab === 'jobs'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Mes Annonces ({offres.length})
        </button>
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* SUB-TAB 1: Metrics & Graphiques */}
      {activeSubTab === 'stats' && (
        <div className="space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-gray-400 block uppercase">Offres en ligne</span>
              <span className="text-3xl font-black text-gray-950 block mt-1">{totalOffres}</span>
              <div className="text-[10px] text-emerald-600 font-mono mt-2">● Recrutement Actif</div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-gray-400 block uppercase">Candidatures reçues</span>
              <span className="text-3xl font-black text-gray-950 block mt-1">{totalCandidatures}</span>
              <div className="text-[10px] text-blue-600 font-mono mt-2">★ CVs En attente d'examen</div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-gray-400 block uppercase">Taux d'acceptation</span>
              <span className="text-3xl font-black text-gray-950 block mt-1">{acceptanceRate}%</span>
              <div className="text-[10px] text-gray-400 font-mono mt-2">Dossiers validés</div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <span className="text-xs font-semibold text-gray-400 block uppercase">Traitement RH</span>
              <span className="text-3xl font-black text-gray-950 block mt-1">
                {totalCandidatures > 0
                  ? Math.round(((totalCandidatures - countByStatus['En attente']) / totalCandidatures) * 100)
                  : 0}%
              </span>
              <div className="text-[10px] text-indigo-600 font-mono mt-2">Dossiers étudiés</div>
            </div>
          </div>

          {/* Interactive CSS Graphical distribution */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Visual breakdown widget */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-950 mb-4 flex items-center gap-1.5">
                <TrendingUp className="h-4.5 w-4.5 text-blue-600" />
                <span>Statuts des candidats postulés</span>
              </h3>

              <div className="space-y-4">
                {Object.entries(countByStatus).map(([status, count]) => {
                  const percentage = totalCandidatures > 0 ? (count / totalCandidatures) * 100 : 0;
                  
                  // Color codes
                  let barColor = 'bg-amber-500';
                  if (status === 'En cours d\'examen') barColor = 'bg-blue-500';
                  if (status === 'Acceptée') barColor = 'bg-emerald-500';
                  if (status === 'Refusée') barColor = 'bg-red-500';

                  return (
                    <div key={status} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">{status}</span>
                        <span className="font-bold text-gray-950">
                          {count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      
                      {/* Bar Container */}
                      <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                        <div
                          className={`h-full rounded-full ${barColor} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application volume insights */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-950 mb-4 flex items-center gap-1.5">
                  <AlertCircle className="h-4.5 w-4.5 text-blue-600" />
                  <span>Aperçu du volume de recrutement</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Pour chaque offre publiée, visualisez la distribution des expertises et délibérez sur l'embauche définitive. Un tableau de répartition rigoureux vous permet de minimiser le temps de pourvoiement.
                </p>
              </div>

              {/* Custom SVG distribution schema mapping */}
              <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-around gap-2 text-center">
                <div>
                  <span className="block text-xl font-bold text-emerald-600">{countByStatus['Acceptée']}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Recrutés</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <span className="block text-xl font-bold text-blue-600">{countByStatus['En cours d\'examen']}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">À l'entretien</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <span className="block text-xl font-bold text-amber-600">{countByStatus['En attente']}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Non lus</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 2: Received Applications & Evaluation */}
      {activeSubTab === 'candidates' && (
        <div className="space-y-6">
          
          {/* Quick Filters Panel */}
          <div className="rounded-xl border border-gray-50 bg-gray-50/50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
              RECHERCHE ET TRICRIGUEUX
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {/* Job Offer selector Filter */}
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 bg-white ring-1 ring-gray-100"
              >
                <option value="">Tous les postes</option>
                {offres.map((o) => (
                  <option key={o.id} value={o.id}>{o.titre}</option>
                ))}
              </select>

              {/* Status selector Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 bg-white ring-1 ring-gray-100"
              >
                <option value="">Tous les statuts</option>
                <option value="En attente">En attente</option>
                <option value="En cours d'examen">En cours d'examen</option>
                <option value="Acceptée">Acceptée</option>
                <option value="Refusée">Refusée</option>
              </select>
            </div>
          </div>

          {/* Candidature Evaluation Feed grid */}
          {filteredCandidatures.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-gray-100 bg-white">
              <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-semibold">Aucune candidature ne correspond à ces critères d'évaluation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCandidatures.map((app) => (
                <div key={app.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
                  
                  {/* Row 1: Candidate Meta & target Job */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar initials representation */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                        {app.candidatNom.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-gray-950">{app.candidatNom}</h4>
                        <span className="block text-xs font-mono text-gray-400 mt-0.5">{app.candidatEmail}</span>
                        
                        <p className="text-xs font-semibold text-gray-700 mt-2">
                          Postule pour : <span className="text-blue-600">{app.offreTitre}</span>
                        </p>
                      </div>
                    </div>

                    {/* Change Status Dropdown selection (Requirement 7) */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-400 font-mono">STATUT :</span>
                      <select
                        value={app.statut}
                        onChange={(e) => onUpdateCandidatureStatus(app.id, e.target.value as Candidature['statut'])}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${
                          app.statut === 'Acceptée'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.statut === 'Refusée'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : app.statut === 'En cours d\'examen'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="En attente">En attente</option>
                        <option value="En cours d'examen">En cours d'examen</option>
                        <option value="Acceptée">Acceptée (Embaucher)</option>
                        <option value="Refusée">Refusée</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: CV details and downloadable link */}
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4.5 w-4.5 text-blue-600" />
                      <div>
                        <span className="font-bold text-gray-800 block">CV : {app.cvFilename}</span>
                        <span className="text-[10px] text-gray-400 block font-mono">Date de dépôt : {app.dateCandidature}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => simulateDownloadCv(app.cvFilename)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-xs cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Télécharger CV</span>
                    </button>
                  </div>

                  {/* Row 3: Motivation letter excerpt */}
                  <div className="bg-gray-50/40 p-3 rounded-lg border border-gray-50 text-xs">
                    <span className="block font-bold text-gray-500 mb-1">Cahier de motivation :</span>
                    <p className="text-gray-600 italic leading-relaxed">
                      "{app.lettreMotivation}"
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* SUB-TAB 3: Published job Vacancies list & CRUD */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-6">
          
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  <th className="py-4 px-6">Poste / Secteur</th>
                  <th className="py-4 px-6">Contrat</th>
                  <th className="py-4 px-6">Localisation</th>
                  <th className="py-4 px-6">Salaire</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {offres.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-950 block">{job.titre}</span>
                      <span className="text-[10px] text-gray-400 block font-mono mt-0.5">{job.secteur}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="rounded bg-gray-150 px-2 py-0.5 text-[9px] font-black text-gray-600 uppercase">
                        {job.typeContrat}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">
                      {job.localisation}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-700 font-bold">
                      {job.salaire}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEditJob(job)}
                          className="rounded p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-gray-100 transition-colors"
                          title="Modifier l'offre"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Êtes-vous sûr de vouloir supprimer '${job.titre}' ?`)) {
                              onDeleteOffre(job.id);
                            }
                          }}
                          className="rounded p-1.5 text-gray-500 hover:text-red-500 hover:bg-white border border-transparent hover:border-gray-100 transition-colors"
                          title="Supprimer l'offre"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* CREATE OR EDIT JOBS MODAL (Requirement 7) */}
      {showAddJobForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl animate-in scale-in duration-200">
            
            <button
              onClick={() => setShowAddJobForm(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-950 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleAddJobSubmit} className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">Console de Publication</span>
                <h3 className="text-base font-extrabold text-gray-950 mt-1">
                  {editingJob ? 'Modifier l\'offre d\'emploi' : 'Publier une nouvelle offre de poste'}
                </h3>
                <p className="text-xs text-gray-500">Précisez les pré-requis méticuleusement pour attirer les bons candidats.</p>
              </div>

              {/* Titre & Localisation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Intitulé du poste *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.titre}
                    onChange={(e) => setJobForm({ ...jobForm, titre: e.target.value })}
                    placeholder="Ex: Senior Frontend Engineer"
                    className="w-full rounded-xl border-0 py-2 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Localisation / Ville *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.localisation}
                    onChange={(e) => setJobForm({ ...jobForm, localisation: e.target.value })}
                    placeholder="Ex: Paris (75) - Télétravail"
                    className="w-full rounded-xl border-0 py-2 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Secteur & Salaire */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Secteur d'activité *</label>
                  <select
                    value={jobForm.secteur}
                    onChange={(e) => setJobForm({ ...jobForm, secteur: e.target.value })}
                    className="w-full rounded-xl border-y-0 border-x-0 bg-transparent py-2 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Informatique & Tech">Informatique & Tech</option>
                    <option value="Santé & Biotech">Santé & Biotech</option>
                    <option value="Énergie & Environnement">Énergie & Environnement</option>
                    <option value="Finance & Assurances">Finance & Assurances</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Salaire annuel indicatif *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.salaire}
                    onChange={(e) => setJobForm({ ...jobForm, salaire: e.target.value })}
                    placeholder="Ex: 45k - 52k €/an"
                    className="w-full rounded-xl border-0 py-2 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Type de contrat */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Type de contrat *</label>
                <div className="flex flex-wrap gap-2">
                  {(['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance'] as OffreEmploi['typeContrat'][]).map((contract) => (
                    <button
                      key={contract}
                      type="button"
                      onClick={() => setJobForm({ ...jobForm, typeContrat: contract })}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-bold border transition-all ${
                        jobForm.typeContrat === contract
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {contract}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Description détaillée de l'offre *</label>
                <textarea
                  rows={6}
                  required
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="### Vos Missions :\n-\n\n### Profil recherché :\n-"
                  className="w-full rounded-xl border-0 py-2.5 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-gray-400 font-sans leading-relaxed"
                />
              </div>

              {/* Form buttons */}
              <div className="flex gap-2 justify-end pt-3 border-t border-gray-105">
                <button
                  type="button"
                  onClick={() => setShowAddJobForm(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  {editingJob ? 'Enregistrer les modifications' : 'Publier d\'offre'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
