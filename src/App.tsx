import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OffresList from './components/OffresList';
import CandidatDashboard from './components/CandidatDashboard';
import RHDashboard from './components/RHDashboard';
import SqlScriptsView from './components/SqlScriptsView';

// Mock Data
import {
  INITIAL_OFFRES,
  INITIAL_ENTREPRISES,
  INITIAL_CANDIDAT_PROFILE,
  INITIAL_CANDIDATURES,
  INITIAL_NOTIFICATIONS,
} from './data';

import { OffreEmploi, Candidat, Candidature, AppNotification, Role } from './types';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<string>('accueil');
  
  // Simulated Roles (Candidat vs RH) for preview convenience
  const [currentRole, setCurrentRole] = useState<Role>('candidat');

  // Unified States
  const [offres, setOffres] = useState<OffreEmploi[]>(INITIAL_OFFRES);
  const [candidatures, setCandidatures] = useState<Candidature[]>(INITIAL_CANDIDATURES);
  const [candidatProfile, setCandidatProfile] = useState<Candidat>(INITIAL_CANDIDAT_PROFILE);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Search Engine filters state
  const [activeFilters, setActiveFilters] = useState({
    keyword: '',
    location: '',
    sector: '',
  });

  // Global Toast HUD State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Notifications calculation
  const unreadCount = notifications.filter(n => !n.lue).length;

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lue: true } : n))
    );
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSearchFromHero = (keyword: string, location: string, sector: string) => {
    setActiveFilters({ keyword, location, sector });
    showToast(`Filtres appliqués : "${keyword || 'Tout'}" à "${location || 'Tout'}"`);
  };

  // Candidat Actions: Apply online (Requirement 6)
  const handleApplyToJob = (newApply: Omit<Candidature, 'id' | 'dateCandidature' | 'statut'>) => {
    const formattedDate = new Date().toISOString().split('T')[0];
    const createdApply: Candidature = {
      ...newApply,
      id: `apply_${Date.now()}`,
      statut: 'En attente',
      dateCandidature: formattedDate,
    };

    setCandidatures((prev) => [createdApply, ...prev]);

    // Send candidate notification
    const newNotif: AppNotification = {
      id: `not_${Date.now()}`,
      utilisateurId: 'usr_candidat',
      message: `Votre candidature pour le poste "${newApply.offreTitre}" chez ${newApply.entrepriseNom} a été transmise.`,
      date: `${formattedDate} ${new Date().toTimeString().slice(0, 5)}`,
      lue: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Votre candidature a été envoyée chez ${newApply.entrepriseNom} !`);
  };

  const handleCheckHasApplied = (offreId: string) => {
    return candidatures.some((c) => c.offreId === offreId);
  };

  // Candidat profile updates (Requirement 3)
  const handleUpdateCandidat = (updated: Candidat) => {
    setCandidatProfile(updated);
    showToast('Profil candidat mis à jour avec succès.');
  };

  // RH Actions: Add Offer (Requirement 7)
  const handleAddOffre = (newOffre: Omit<OffreEmploi, 'id' | 'datePublication' | 'entrepriseId' | 'entrepriseNom' | 'entrepriseLogo'>) => {
    const formattedDate = new Date().toISOString().split('T')[0];
    const createdOffre: OffreEmploi = {
      ...newOffre,
      id: `job_${Date.now()}`,
      entrepriseId: 'ent_1',
      entrepriseNom: 'TechCorp Solutions',
      entrepriseLogo: '⚡',
      datePublication: formattedDate,
    };

    setOffres((prev) => [createdOffre, ...prev]);
    showToast(`Nouvelle annonce publiée : "${createdOffre.titre}"`);
  };

  // RH Actions: Update Offer info (Requirement 7)
  const handleUpdateOffre = (updated: OffreEmploi) => {
    setOffres((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showToast(`Annonce '${updated.titre}' modifiée.`);
  };

  // RH Actions: Delete Offer (Requirement 7)
  const handleDeleteOffre = (id: string) => {
    setOffres((prev) => prev.filter((item) => item.id !== id));
    // Also remove applications associated
    setCandidatures((prev) => prev.filter((item) => item.offreId !== id));
    showToast("Offre d'emploi supprimée du catalogue.");
  };

  // RH Actions: Update application status (Requirement 7)
  const handleUpdateCandidatureStatus = (id: string, newStatus: Candidature['statut']) => {
    let appTitle = '';
    let company = '';

    setCandidatures((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          appTitle = app.offreTitre;
          company = app.entrepriseNom;
          return { ...app, statut: newStatus };
        }
        return app;
      })
    );

    const formattedDate = new Date().toISOString().split('T')[0];
    let customMsg = `Votre candidature pour le poste "${appTitle}" est passée au statut : ${newStatus}.`;
    if (newStatus === 'Acceptée') {
      customMsg = `Félicitations ! Votre candidature pour "${appTitle}" chez ${company} a été Acceptée !`;
    } else if (newStatus === 'Refusée') {
      customMsg = `Votre candidature pour "${appTitle}" de ${company} a été Refusée.`;
    }

    // Add notification targeting candidate (Jean Dupont)
    const newNotif: AppNotification = {
      id: `not_${Date.now()}`,
      utilisateurId: 'usr_candidat',
      message: customMsg,
      date: `${formattedDate} ${new Date().toTimeString().slice(0, 5)}`,
      lue: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Statut de candidature mis à jour vers: ${newStatus}`);
  };

  const currentEmail = currentRole === 'candidat' ? 'jean.dupont@email.com' : 'sophie.rh@techcorp.com';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Toast Notification HUD */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-6 lg:right-8 z-55 max-w-sm rounded-xl bg-gray-900 border border-gray-800 p-4 shadow-2xl flex items-center space-x-3 pointer-events-auto"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-white leading-tight">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Navigation Hub */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        notifications={notifications}
        markNotificationAsRead={handleMarkNotificationAsRead}
        unreadCount={unreadCount}
        userEmail={currentEmail}
        onLogout={() => showToast('Déconnexion simulée.')}
        onOpenAuth={() => showToast('Ouverture de session requise.')}
      />

      {/* Role Switching Warning Accent line */}
      <div className="w-full bg-blue-600 px-4 py-1.5 text-center text-[11px] font-semibold text-white flex items-center justify-center gap-2 shadow-inner">
        <span>🔑 Mode Démo actif :</span>
        <span className="bg-white/10 px-1.5 py-0.5 rounded font-mono">
          {currentRole === 'candidat' ? "Vous testez l'expérience Candidat (Jean Dupont)" : "Vous testez l'expérience Recruteur/RH (Sophie Martin)"}
        </span>
        <button
          onClick={() => setCurrentRole(currentRole === 'candidat' ? 'recruteur' : 'candidat')}
          className="underline font-bold hover:text-blue-150 decoration-wavy pl-1.5 cursor-pointer"
        >
          Inverser le profil d'essai
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'accueil' && (
              <Hero
                offres={offres}
                entreprises={INITIAL_ENTREPRISES}
                onSearch={handleSearchFromHero}
                setCurrentTab={setCurrentTab}
                candidateCount={1}
              />
            )}

            {currentTab === 'offres' && (
              <OffresList
                offres={offres}
                activeFilters={activeFilters}
                onApply={handleApplyToJob}
                currentCandidat={currentRole === 'candidat' ? candidatProfile : null}
                hasApplied={handleCheckHasApplied}
              />
            )}

            {currentTab === 'candidat' && (
              <CandidatDashboard
                candidat={candidatProfile}
                onUpdateCandidat={handleUpdateCandidat}
                candidatures={candidatures}
                notifications={notifications}
                onClearNotification={handleClearNotification}
              />
            )}

            {currentTab === 'rh' && (
              <RHDashboard
                offres={offres}
                candidatures={candidatures}
                entreprises={INITIAL_ENTREPRISES}
                onAddOffre={handleAddOffre}
                onEditOffre={handleUpdateOffre}
                onDeleteOffre={handleDeleteOffre}
                onUpdateCandidatureStatus={handleUpdateCandidatureStatus}
              />
            )}

            {currentTab === 'sql' && (
              <SqlScriptsView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Custom Designed Humanized Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 shrink-0 mt-auto">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-medium text-gray-500">
            <div>
              <span className="font-extrabold text-gray-950">RecrutPlatform © 2026.</span> Tous droits réservés.
            </div>
            <div className="flex gap-4 font-mono text-[10px]">
              <span>ADMIN PORT: 3000</span>
              <span>•</span>
              <span>DATABASE: LOCAL STORAGE MOCKED</span>
              <span>•</span>
              <button 
                onClick={() => setCurrentTab('sql')} 
                className="text-emerald-600 font-bold hover:underline"
              >
                MYSQL SCRIPT READY
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-sans tracking-wide">
            Cette application a été optimisée avec soin sous Vite + React 19 pour afficher les statuts des candidats de façon fluide et instantanée.
          </p>
        </div>
      </footer>

    </div>
  );
}
