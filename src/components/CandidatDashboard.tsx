import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Award, GraduationCap, Briefcase, Globe, FileText, Download, Trash2, Plus, Edit, Check, CheckCircle2 } from 'lucide-react';
import { Candidat, Candidature, AppNotification } from '../types';

interface CandidatDashboardProps {
  candidat: Candidat;
  onUpdateCandidat: (updated: Candidat) => void;
  candidatures: Candidature[];
  notifications: AppNotification[];
  onClearNotification: (id: string) => void;
}

export default function CandidatDashboard({
  candidat,
  onUpdateCandidat,
  candidatures,
  notifications,
  onClearNotification,
}: CandidatDashboardProps) {
  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    titreProfessionnel: candidat.titreProfessionnel,
    ville: candidat.ville,
    telephone: candidat.telephone,
    photoUrl: candidat.photoUrl,
  });

  // CV simulation state
  const [cvFile, setCvFile] = useState<string>(candidat.cvFilename);

  // Skill Add input
  const [newSkill, setNewSkill] = useState('');

  // Experience state
  const [newExperience, setNewExperience] = useState({
    poste: '',
    entreprise: '',
    debut: '',
    fin: '',
    description: '',
  });
  const [showAddExp, setShowAddExp] = useState(false);

  // Formation state
  const [newFormation, setNewFormation] = useState({
    diplome: '',
    etablissement: '',
    annee: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Language state
  const [newLanguage, setNewLanguage] = useState('');

  // Save the basic top profile info
  const handleSaveProfileHeader = () => {
    onUpdateCandidat({
      ...candidat,
      titreProfessionnel: tempProfile.titreProfessionnel,
      ville: tempProfile.ville,
      telephone: tempProfile.telephone,
      photoUrl: tempProfile.photoUrl,
    });
    setIsEditingProfile(false);
  };

  // Add skill helper
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!candidat.competences.includes(newSkill.trim())) {
      const updatedComp = [...candidat.competences, newSkill.trim()];
      onUpdateCandidat({ ...candidat, competences: updatedComp });
    }
    setNewSkill('');
  };

  // Remove skill helper
  const handleRemoveSkill = (skill: string) => {
    const updatedComp = candidat.competences.filter(c => c !== skill);
    onUpdateCandidat({ ...candidat, competences: updatedComp });
  };

  // Add Experience helper
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.poste || !newExperience.entreprise) return;
    const updatedExp = [...candidat.experiences, newExperience];
    onUpdateCandidat({ ...candidat, experiences: updatedExp });
    setNewExperience({ poste: '', entreprise: '', debut: '', fin: '', description: '' });
    setShowAddExp(false);
  };

  // Remove Experience helper
  const handleRemoveExperience = (index: number) => {
    const updatedExp = candidat.experiences.filter((_, i) => i !== index);
    onUpdateCandidat({ ...candidat, experiences: updatedExp });
  };

  // Add Formation helper
  const handleAddFormation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormation.diplome || !newFormation.etablissement) return;
    const updatedForm = [...candidat.formations, newFormation];
    onUpdateCandidat({ ...candidat, formations: updatedForm });
    setNewFormation({ diplome: '', etablissement: '', annee: '' });
    setShowAddForm(false);
  };

  // Remove Formation helper
  const handleRemoveFormation = (index: number) => {
    const updatedForm = candidat.formations.filter((_, i) => i !== index);
    onUpdateCandidat({ ...candidat, formations: updatedForm });
  };

  // Add Language helper
  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLanguage.trim()) return;
    if (!candidat.langues.includes(newLanguage.trim())) {
      const updatedLang = [...candidat.langues, newLanguage.trim()];
      onUpdateCandidat({ ...candidat, langues: updatedLang });
    }
    setNewLanguage('');
  };

  // Remove Language helper
  const handleRemoveLanguage = (lang: string) => {
    const updatedLang = candidat.langues.filter(l => l !== lang);
    onUpdateCandidat({ ...candidat, langues: updatedLang });
  };

  const handleSimulatedCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filename = e.target.files[0].name;
      setCvFile(filename);
      onUpdateCandidat({ ...candidat, cvFilename: filename });
    }
  };

  const simulateDownloadCv = () => {
    alert(`Téléchargement simulé pour le fichier : ${cvFile}`);
  };

  // Status mapping to elegant color pills
  const getStatusBadge = (status: Candidature['statut']) => {
    switch (status) {
      case 'En attente':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'En cours d\'examen':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Acceptée':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Refusée':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Introduction Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Espace Candidat</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez votre CV, enrichissez votre profil et suivez le statut de vos candidatures.</p>
      </div>

      {/* Top Banner Profile Summary */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            
            {/* User Avatar */}
            <div className="relative group">
              <img
                src={candidat.photoUrl}
                alt="Jean Dupont"
                className="h-20 w-20 rounded-2xl object-cover ring-4 ring-blue-50/50 shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-gray-950">Jean Dupont</h2>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">Candidat Principal</span>
              </div>
              
              {isEditingProfile ? (
                <div className="space-y-2 mt-2 max-w-md">
                  <input
                    type="text"
                    value={tempProfile.titreProfessionnel}
                    onChange={(e) => setTempProfile({ ...tempProfile, titreProfessionnel: e.target.value })}
                    className="w-full rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Titre professionnel"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={tempProfile.ville}
                      onChange={(e) => setTempProfile({ ...tempProfile, ville: e.target.value })}
                      className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      placeholder="Ville, Pays"
                    />
                    <input
                      type="text"
                      value={tempProfile.telephone}
                      onChange={(e) => setTempProfile({ ...tempProfile, telephone: e.target.value })}
                      className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      placeholder="Téléphone"
                    />
                  </div>
                  <input
                    type="text"
                    value={tempProfile.photoUrl}
                    onChange={(e) => setTempProfile({ ...tempProfile, photoUrl: e.target.value })}
                    className="w-full rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    placeholder="URL Image Photo de profil"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfileHeader}
                      className="rounded-lg bg-blue-600 py-1 px-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> Enregistrer
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="rounded-lg bg-gray-100 py-1 px-3 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-blue-600">{candidat.titreProfessionnel}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1 justify-center sm:justify-start">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {candidat.ville}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {candidat.telephone}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> jean.dupont@email.com</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {!isEditingProfile && (
            <button
              onClick={() => {
                setTempProfile({
                  titreProfessionnel: candidat.titreProfessionnel,
                  ville: candidat.ville,
                  telephone: candidat.telephone,
                  photoUrl: candidat.photoUrl,
                });
                setIsEditingProfile(true);
              }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Edit className="h-3.5 w-3.5" />
              <span>Modifier mes coordonnées</span>
            </button>
          )}

        </div>
      </div>

      {/* Main dashboard content layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Profile info edit boxes */}
        <div className="lg:col-span-7 space-y-6">

          {/* CV Attachment widget */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Curriculum Vitae (CV)</span>
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-900">{cvFile}</span>
                  <span className="block text-[10px] text-gray-400 font-mono">Format PDF • mis à jour récemment</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={simulateDownloadCv}
                  className="rounded-lg p-2 text-gray-500 hover:text-blue-600 hover:bg-white border border-transparent hover:border-gray-100 transition-all"
                  title="Télécharger le CV"
                >
                  <Download className="h-4.5 w-4.5" />
                </button>
                <div className="relative">
                  <input
                    type="file"
                    id="cv-replace-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleSimulatedCvUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.getElementById('cv-replace-input')?.click()}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-blue-600 border border-gray-100 shadow-xs hover:shadow-xs cursor-pointer"
                  >
                    Remplacer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Competences (Skills) Widget */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
              <Award className="h-4 w-4 text-blue-600" />
              <span>Mes Compétences</span>
            </h3>
            
            {/* Input Form add */}
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Ajouter une compétence (ex: Tailwind, Python...)"
                className="flex-1 rounded-xl border-0 py-2 px-3 text-xs text-gray-950 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Ajouter
              </button>
            </form>

            {/* Badges container */}
            <div className="flex flex-wrap gap-2">
              {candidat.competences.map((sk) => (
                <span
                  key={sk}
                  className="group inline-flex items-center gap-1 rounded-full bg-blue-50/70 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(sk)}
                    className="rounded-full p-0.5 text-blue-400 group-hover:text-red-500 hover:bg-blue-100 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experiences professionnelles widget */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>Expériences professionnelles</span>
              </h3>
              <button
                onClick={() => setShowAddExp(!showAddExp)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                {showAddExp ? 'Fermer' : 'Ajouter une expérience'}
              </button>
            </div>

            {/* Experience form builder */}
            {showAddExp && (
              <form onSubmit={handleAddExperience} className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 mb-6 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Intitulé du poste (ex : Développeur React)"
                    value={newExperience.poste}
                    onChange={(e) => setNewExperience({ ...newExperience, poste: e.target.value })}
                    className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-100 bg-white focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Entreprise (ex : Google Paris)"
                    value={newExperience.entreprise}
                    onChange={(e) => setNewExperience({ ...newExperience, entreprise: e.target.value })}
                    className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-100 bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Début (ex : 09/2024)"
                    value={newExperience.debut}
                    onChange={(e) => setNewExperience({ ...newExperience, debut: e.target.value })}
                    className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-100 bg-white focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Fin (ex : En cours)"
                    value={newExperience.fin}
                    onChange={(e) => setNewExperience({ ...newExperience, fin: e.target.value })}
                    className="rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-100 bg-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <textarea
                  placeholder="Brève description de vos réalisations principales..."
                  rows={2}
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  className="w-full rounded-lg border-0 py-1.5 px-3 text-xs text-gray-950 ring-1 ring-gray-100 bg-white focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-1.5 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                >
                  Enregistrer l'expérience
                </button>
              </form>
            )}

            {/* List timeline */}
            <div className="relative border-l border-gray-100 pl-4 ml-2 space-y-6">
              {candidat.experiences.map((exp, index) => (
                <div key={index} className="relative group/exp">
                  {/* Timeline bullet icon */}
                  <span className="absolute -left-6.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] text-blue-600 border border-white">
                    •
                  </span>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-950">{exp.poste}</h4>
                      <p className="text-[11px] font-semibold text-blue-600 mt-0.5">{exp.entreprise}</p>
                      <span className="block text-[10px] text-gray-400 font-mono mt-0.5">{exp.debut} — {exp.fin}</span>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className="rounded p-1 text-gray-400 opacity-0 group-hover/exp:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations (Educations) & Langues Row split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Formations widget */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
                <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-blue-600" />
                  <span>Formations / Études</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                >
                  {showAddForm ? 'X' : '(+)'}
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddFormation} className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Diplôme (ex: Bac+5 Informatique)"
                    value={newFormation.diplome}
                    onChange={(e) => setNewFormation({ ...newFormation, diplome: e.target.value })}
                    className="w-full rounded-lg border-0 py-1 px-2.5 text-xs text-gray-950 ring-1 ring-gray-100"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Établissement (ex: Univ de Lyon)"
                    value={newFormation.etablissement}
                    onChange={(e) => setNewFormation({ ...newFormation, etablissement: e.target.value })}
                    className="w-full rounded-lg border-0 py-1 px-2.5 text-xs text-gray-950 ring-1 ring-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Année d'obtention (ex: 2025)"
                    value={newFormation.annee}
                    onChange={(e) => setNewFormation({ ...newFormation, annee: e.target.value })}
                    className="w-full rounded-lg border-0 py-1 px-2.5 text-xs text-gray-950 ring-1 ring-gray-100"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-1 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                  >
                    Ajouter diplôme
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {candidat.formations.map((f, i) => (
                  <div key={i} className="group/form relative flex items-start justify-between pl-3 border-l-2 border-blue-50">
                    <div>
                      <h4 className="text-xs font-bold text-gray-950">{f.diplome}</h4>
                      <p className="text-[10px] font-semibold text-gray-500 mt-0.5">{f.etablissement} ({f.annee})</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFormation(i)}
                      className="rounded p-1 text-gray-400 opacity-0 group-hover/form:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Langues widget */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                <Globe className="h-4.5 w-4.5 text-blue-600" />
                <span>Langues parlées</span>
              </h3>

              <form onSubmit={handleAddLanguage} className="flex gap-1 mb-4">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Ex: Allemand (C1)..."
                  className="flex-1 rounded-lg border-0 py-1 px-2.5 text-xs text-gray-950 ring-1 ring-gray-100"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5">
                {candidat.langues.map((l) => (
                  <span
                    key={l}
                    className="group inline-flex items-center gap-1 rounded bg-gray-50 border border-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                  >
                    <span>{l}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(l)}
                      className="text-gray-400 group-hover:text-red-500 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Real-time Application Follow-up & Live Alerts */}
        <div className="lg:col-span-5 space-y-6">

          {/* Candidatures History tracker */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span>Suivi de mes candidatures ({candidatures.length})</span>
            </h3>

            {candidatures.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                Vous n'avez pas encore postulé aux offres.
              </div>
            ) : (
              <div className="space-y-4">
                {candidatures.map((app) => (
                  <div key={app.id} className="p-4 rounded-xl border border-gray-50 bg-gray-50/20 space-y-2 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-extrabold text-gray-950 line-clamp-1">{app.offreTitre}</h4>
                        <span className="block text-[10px] font-semibold text-gray-500 mt-0.5">{app.entrepriseNom}</span>
                      </div>
                      
                      {/* Status indicator badge */}
                      <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-extrabold ${getStatusBadge(app.statut)}`}>
                        {app.statut}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-gray-50">
                      <span>CV : {app.cvFilename}</span>
                      <span>Envoyé le {app.dateCandidature}</span>
                    </div>

                    {/* Feedback letter accordion if any */}
                    {app.lettreMotivation && (
                      <div className="mt-2 text-[10px] text-gray-500 italic bg-white p-2 rounded border border-gray-50 max-h-16 overflow-y-auto">
                        "{app.lettreMotivation}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Personal notifications history list */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>Alertes &amp; Notifications</span>
            </h3>

            {notifications.length === 0 ? (
              <p className="py-6 text-center text-xs text-gray-400">Aucun message pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg text-xs leading-relaxed flex items-start justify-between gap-3 ${
                      !notif.lue ? 'bg-blue-50/50 border-l-2 border-blue-600 pl-2.5' : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-700">{notif.message}</p>
                      <span className="block text-[9px] text-gray-400 font-mono mt-1">{notif.date}</span>
                    </div>
                    
                    <button
                      onClick={() => onClearNotification(notif.id)}
                      className="text-[10px] text-gray-400 hover:text-red-500 font-bold px-1.5 py-0.5"
                      title="Supprimer la notification"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
