import { OffreEmploi, Entreprise, Candidat, Candidature, AppNotification, Utilisateur } from './types';

export const INITIAL_ENTREPRISES: Entreprise[] = [
  {
    id: 'ent_1',
    nom: 'TechCorp Solutions',
    description: 'Leader européen de la transformation digitale et des services cloud innovants pour les entreprises.',
    siteWeb: 'https://techcorp-solutions.com',
    logoUrl: '⚡',
    localisation: 'Paris, France',
    secteur: 'Informatique & Tech'
  },
  {
    id: 'ent_2',
    nom: 'InnovHealth',
    description: 'Une startup révolutionnant le secteur médical grâce à l\'intelligence artificielle et la télémédecine.',
    siteWeb: 'https://innovhealth.io',
    logoUrl: '🏥',
    localisation: 'Lyon, France',
    secteur: 'Santé & Biotech'
  },
  {
    id: 'ent_3',
    nom: 'EcoEnergy Group',
    description: 'Producteur indépendant et développeur d\'énergies renouvelables (solaire, éolien, hydrogène).',
    siteWeb: 'https://ecoenergy-group.fr',
    logoUrl: '🌱',
    localisation: 'Nantes, France',
    secteur: 'Énergie & Environnement'
  },
  {
    id: 'ent_4',
    nom: 'Financia Bank',
    description: 'Banque d\'investissement moderne fournissant des services d\'épargne et d\'investissement éco-responsables.',
    siteWeb: 'https://financia.fr',
    logoUrl: '💼',
    localisation: 'Bordeaux, France',
    secteur: 'Finance & Assurances'
  }
];

export const INITIAL_OFFRES: OffreEmploi[] = [
  {
    id: 'job_1',
    titre: 'Développeur Full-Stack React & Node.js',
    entrepriseId: 'ent_1',
    entrepriseNom: 'TechCorp Solutions',
    entrepriseLogo: '⚡',
    localisation: 'Paris (75) - Hybride',
    secteur: 'Informatique & Tech',
    typeContrat: 'CDI',
    salaire: '48k - 55k €/an',
    description: 'Nous recherchons un(e) Développeur Full-Stack passionné(e) pour rejoindre notre équipe produit. Vous participerez au développement de nos nouvelles architectures cloud et à l\'optimisation de l\'UX.\n\n### Vos Missions :\n- Concevoir et implémenter des fonctionnalités robustes en React 19 et Node.js.\n- Participer aux choix architecturaux et à l\'écriture des tests automatisés.\n- Collaborer étroitement avec les Product Owners et Designers UX/UI.\n\n### Profil recherché :\n- Vous maîtrisez TypeScript, React et Express (ou NestJS).\n- Vous avez le sens du détail, de l\'accessibilité, et de la performance.\n- Esprit d\'équipe et forte curiosité technique.',
    datePublication: '2026-06-05'
  },
  {
    id: 'job_2',
    titre: 'Product Business Analyst',
    entrepriseId: 'ent_1',
    entrepriseNom: 'TechCorp Solutions',
    entrepriseLogo: '⚡',
    localisation: 'Paris (75) - Présentiel',
    secteur: 'Informatique & Tech',
    typeContrat: 'CDD',
    salaire: '40k - 45k €/an',
    description: 'Dans le cadre d\'une forte croissance en Europe, TechCorp recherche un Business Analyst pour faire le pont entre nos équipes métier et l\'équipe tech.\n\n### Vos Missions :\n- Recueillir et analyser les besoins des utilisateurs.\n- Rédiger les cahiers des charges fonctionnels et les user stories.\n- Coordonner la recette des fonctionnalités livrées.\n\n### Profil recherché :\n- Formation Bac+5 école d\'ingénieur ou commerce.\n- Expérience de 2 ans minimum sur un poste similaire.\n- Excellente communication écrite et orale.',
    datePublication: '2026-06-07'
  },
  {
    id: 'job_3',
    titre: 'Ingénieur Machine Learning Médical',
    entrepriseId: 'ent_2',
    entrepriseNom: 'InnovHealth',
    entrepriseLogo: '🏥',
    localisation: 'Lyon (69) - Télétravail total',
    secteur: 'Santé & Biotech',
    typeContrat: 'CDI',
    salaire: '55k - 68k €/an',
    description: 'Au cœur de notre équipe R&D, vous développerez les algorithmes de computer vision permettant d\'analyser les imageries médicales en temps réel et d\'assister les radiologues dans leurs diagnostics.\n\n### Vos Missions :\n- Concevoir, entraîner et valider des modèles de deep learning (PyTorch, TensorFlow).\n- Améliorer l\'interprétabilité et la robustesse des classificateurs.\n- Publier et valoriser les innovations techniques auprès de la communauté scientifique.\n\n### Profil recherché :\n- Doctorat ou Master spécialisé en IA / Computer Vision.\n- Maîtrise avancée de Python et du traitement de données scientifiques.\n- Rigoureux, autonome avec un intérêt pour la santé numérique.',
    datePublication: '2026-06-04'
  },
  {
    id: 'job_4',
    titre: 'Chef de Projet Solaire & Éolien',
    entrepriseId: 'ent_3',
    entrepriseNom: 'EcoEnergy Group',
    entrepriseLogo: '🌱',
    localisation: 'Nantes (44) - Déplacements réguliers',
    secteur: 'Énergie & Environnement',
    typeContrat: 'CDI',
    salaire: '45k - 52k €/an',
    description: 'EcoEnergy Group recrute un Chef de Projet pour piloter le développement des futurs parcs photovoltaïques à l\'échelle nationale, de la prospection foncière au raccordement.\n\n### Vos Missions :\n- Conduire les études de faisabilité et d\'impact environnemental.\n- Assurer le dépôt et le suivi des demandes d\'autorisation administrative.\n- Gérer la relation avec les élus locaux, propriétaires terriens et sous-traitants.\n\n### Profil recherché :\n- Expérience de 3 ans dans la gestion de projets de parcs ENR.\n- Excellentes qualités relationnelles et de négociation.\n- Pratique courante des outils d\'analyse géographique (SIG).',
    datePublication: '2026-06-01'
  },
  {
    id: 'job_5',
    titre: 'Analyste Financier ISR (Investissement Responsable)',
    entrepriseId: 'ent_4',
    entrepriseNom: 'Financia Bank',
    entrepriseLogo: '💼',
    localisation: 'Bordeaux (33) - Hybride',
    secteur: 'Finance & Assurances',
    typeContrat: 'CDI',
    salaire: '42k - 49k €/an',
    description: 'Rejoignez notre cellule de notation ESG. Vous exercerez un rôle déterminant dans la sélection de nos portefeuilles d\'investissement afin de concilier performance financière et développement durable.\n\n### Vos Missions :\n- Évaluer la politique environnementale, sociale et de gouvernance des entreprises cotées.\n- Rédiger des synthèses sectorielles et participer aux comités d\'investissement.\n- Développer notre méthodologie de scoring d\'impact carbone.\n\n### Profil recherché :\n- Spécialisation en Finance Durable ou Audit RSE.\n- Rigueur analytique et excellent esprit de synthèse.\n- Maîtrise de l\'anglais indispensable.',
    datePublication: '2026-06-06'
  },
  {
    id: 'job_6',
    titre: 'Stagiaire Assistant(e) Recrutement et RH',
    entrepriseId: 'ent_1',
    entrepriseNom: 'TechCorp Solutions',
    entrepriseLogo: '⚡',
    localisation: 'Paris (75) - Présentiel',
    secteur: 'Informatique & Tech',
    typeContrat: 'Stage',
    salaire: '1 200 € / mois',
    description: 'Intégrez l\'équipe RH de TechCorp Solutions pour une immersion complète au sein des recrutements technologiques de pointe.\n\n### Vos Missions :\n- Rédaction et diffusion d\'annonces sur les jobboards partenaires.\n- Tri et pré-sélection des candidatures de développeurs et business analysts.\n- Planification des entretiens et participation aux événements écoles.\n\n### Profil recherché :\n- Étudiant(e) en Master RH ou Business School (Bac+4/5).\n- Dynamique, pédagogue, à l\'aise au téléphone.\n- Durée : 6 mois indispensable.',
    datePublication: '2026-06-08'
  }
];

export const INITIAL_CANDIDAT_USER: Utilisateur = {
  id: 'usr_candidat',
  email: 'jean.dupont@email.com',
  nom: 'Dupont',
  prenom: 'Jean',
  role: 'candidat',
  dateInscription: '2026-01-15'
};

export const INITIAL_CANDIDAT_PROFILE: Candidat = {
  id: 'cand_1',
  utilisateurId: 'usr_candidat',
  titreProfessionnel: 'Développeur Full-Stack JS Passionné',
  ville: 'Paris, France',
  telephone: '+33 6 12 34 56 78',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  cvFilename: 'Jean_Dupont_CV_2026.pdf',
  cvDataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...] (Simulé)',
  competences: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'MySQL', 'PostgreSQL', 'Git'],
  formations: [
    {
      diplome: 'Titre Professionnel Concepteur Développeur d\'Applications (CDA)',
      etablissement: 'École du Web Innovant',
      annee: '2025'
    },
    {
      diplome: 'Licence Informatique Générale',
      etablissement: 'Université de Technologie',
      annee: '2024'
    }
  ],
  experiences: [
    {
      poste: 'Développeur Front-End React (Alternance)',
      entreprise: 'Digital Growth',
      debut: '09/2024',
      fin: '09/2025',
      description: 'Conception d\'un tableau de bord de pilotage RH. Optimisation des temps de rendu React et mise en place de Tailwind CSS.'
    },
    {
      poste: 'Stagiaire Intégrateur Web',
      entreprise: 'CreativAgency',
      debut: '05/2024',
      fin: '08/2024',
      description: 'Intégration de maquettes Figma en HTML5/CSS3 valides et responsive. Création de scripts d\'animations.'
    }
  ],
  langues: ['Français (Natif)', 'Anglais (B2 - Professionnel)', 'Espagnol (Débutant)']
};

export const INITIAL_RECRUTEUR_USER: Utilisateur = {
  id: 'usr_recruteur',
  email: 'sophie.rh@techcorp.com',
  nom: 'Martin',
  prenom: 'Sophie',
  role: 'recruteur',
  dateInscription: '2025-10-10'
};

export const INITIAL_CANDIDATURES: Candidature[] = [
  {
    id: 'cand_apply_1',
    offreId: 'job_1',
    offreTitre: 'Développeur Full-Stack React & Node.js',
    entrepriseNom: 'TechCorp Solutions',
    candidatId: 'cand_1',
    candidatNom: 'Jean Dupont',
    candidatEmail: 'jean.dupont@email.com',
    cvFilename: 'Jean_Dupont_CV_2026.pdf',
    lettreMotivation: 'Madame, Monsieur, passionné par l\'écosystème web moderne, je souhaite ardemment mettre mon expertise React & Node au service de TechCorp. Mon parcours m\'a permis de réaliser des tableaux de bord interactifs appréciés par nos utilisateurs RH.',
    statut: 'En cours d\'examen',
    dateCandidature: '2026-06-06'
  },
  {
    id: 'cand_apply_2',
    offreId: 'job_5',
    offreTitre: 'Analyste Financier ISR (Investissement Responsable)',
    entrepriseNom: 'Financia Bank',
    candidatId: 'cand_1',
    candidatNom: 'Jean Dupont',
    candidatEmail: 'jean.dupont@email.com',
    cvFilename: 'Jean_Dupont_CV_2026.pdf',
    lettreMotivation: 'Bien que de profil plus technologique, j\'ai rédigé un mémoire de fin d\'études sur les impacts de la blockchain sur la transparence ESG. Je serais honoré d\'apporter mon esprit d\'analyse et ma rigueur mathématique.',
    statut: 'En attente',
    dateCandidature: '2026-06-07'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'not_1',
    utilisateurId: 'usr_candidat',
    message: 'Votre candidature pour le poste "Développeur Full-Stack React & Node.js" est passée au statut : En cours d\'examen.',
    date: '2026-06-06 14:30',
    lue: false
  },
  {
    id: 'not_2',
    utilisateurId: 'usr_candidat',
    message: 'Bienvenue sur la plateforme ! Complétez votre profil pour maximiser vos chances de recrutement.',
    date: '2026-06-05 09:00',
    lue: true
  }
];

export const SQL_CREATION_SCRIPT = `/*******************************************************************************
** PLATEFORME DE RECRUTEMENT - SCRIPT DE CRÉATION DE LA BASE DE DONNÉES MYSQL
** SGBD : MySQL / MariaDB
** Auteur : Plateforme Co-Pilot
** Date : Juin 2026
*******************************************************************************/

-- 1. Création de la Base de Données
CREATE DATABASE IF NOT EXISTS recrutement_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE recrutement_db;

-- Désactivation temporaire des contraintes pour réinitialisation propre
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS competences;
DROP TABLE IF EXISTS candidatures;
DROP TABLE IF EXISTS offres_emploi;
DROP TABLE IF EXISTS recruteurs;
DROP TABLE IF EXISTS candidats;
DROP TABLE IF EXISTS entreprises;
DROP TABLE IF EXISTS utilisateurs;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. Table : utilisateurs
-- Gère les informations d'authentification communes (Candidats et Recruteurs)
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(80) NOT NULL,
    prenom VARCHAR(80) NOT NULL,
    role ENUM('candidat', 'recruteur') NOT NULL DEFAULT 'candidat',
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- 3. Table : entreprises
-- Référence les sociétés qui proposent des postes
CREATE TABLE entreprises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    site_web VARCHAR(255),
    logo_url VARCHAR(255),
    localisation VARCHAR(150),
    secteur VARCHAR(100) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Table : candidats
-- Profil détaillé du candidat lié à son compte utilisateur
CREATE TABLE candidats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    titre_professionnel VARCHAR(150),
    ville VARCHAR(100),
    telephone VARCHAR(20),
    photo_url VARCHAR(255),
    cv_filename VARCHAR(255),
    formations JSON,                -- Stocke sous format JSON le tableau des diplômes
    experiences JSON,               -- Stocke sous format JSON le parcours professionnel
    langues JSON,                   -- Liste des langues parlées
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Table : recruteurs
-- Fiche recruteur liée à un compte utilisateur et une entreprise
CREATE TABLE recruteurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    entreprise_id INT,
    poste_occupe VARCHAR(100),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. Table : offres_emploi
-- Liste des annonces publiées par les entreprises (via les recruteurs)
CREATE TABLE offres_emploi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    entreprise_id INT NOT NULL,
    localisation VARCHAR(150) NOT NULL,
    secteur VARCHAR(100) NOT NULL,
    type_contrat ENUM('CDI', 'CDD', 'Stage', 'Alternance', 'Freelance') NOT NULL,
    salaire VARCHAR(80),
    description TEXT NOT NULL,
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(id) ON DELETE CASCADE,
    INDEX idx_secteur (secteur),
    INDEX idx_contrat (type_contrat)
) ENGINE=InnoDB;

-- 7. Table : candidatures
-- Suivi de l'envoi et du statut des CVs
CREATE TABLE candidatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    offre_id INT NOT NULL,
    candidat_id INT NOT NULL,
    cv_filename VARCHAR(255) NOT NULL,
    lettre_motivation TEXT,
    statut ENUM('En attente', 'En cours d\\'examen', 'Acceptée', 'Refusée') NOT NULL DEFAULT 'En attente',
    date_candidature TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (offre_id) REFERENCES offres_emploi(id) ON DELETE CASCADE,
    FOREIGN KEY (candidat_id) REFERENCES candidats(id) ON DELETE CASCADE,
    UNIQUE KEY unique_candidat_offre (candidat_id, offre_id)
) ENGINE=InnoDB;

-- 8. Table : competences
-- Répertoire des compétences candidates pour filtres multicritères
CREATE TABLE competences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Table de liaison (n-n) entre candidats et compétences
CREATE TABLE candidat_competences (
    candidat_id INT NOT NULL,
    competence_id INT NOT NULL,
    PRIMARY KEY (candidat_id, competence_id),
    FOREIGN KEY (candidat_id) REFERENCES candidats(id) ON DELETE CASCADE,
    FOREIGN KEY (competence_id) REFERENCES competences(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Table : notifications
-- Alertes d'activité ou de changement de statut
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    lue BOOLEAN DEFAULT FALSE,
    date_notification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. Seeding : Insertion de Données de Démo Réalistes
INSERT INTO utilisateurs (id, email, mot_de_passe, nom, prenom, role) VALUES
(1, 'jean.dupont@email.com', '$2y$10$UnKeYOfPaSsWoRdHaSh...', 'Dupont', 'Jean', 'candidat'),
(2, 'sophie.rh@techcorp.com', '$2y$10$UnKeYOfPaSsWoRdHaSh...', 'Martin', 'Sophie', 'recruteur');

INSERT INTO entreprises (id, nom, description, site_web, logo_url, localisation, secteur) VALUES
(1, 'TechCorp Solutions', 'Leader de la transformation digitale et des services cloud.', 'https://techcorp-solutions.com', '⚡', 'Paris, France', 'Informatique & Tech'),
(2, 'InnovHealth', 'IA et télémédecine révolutionnaires.', 'https://innovhealth.io', '🏥', 'Lyon, France', 'Santé & Biotech'),
(3, 'EcoEnergy Group', 'Développeur indépendant d\\'énergies renouvelables.', 'https://ecoenergy-group.fr', '🌱', 'Nantes, France', 'Énergie & Environnement'),
(4, 'Financia Bank', 'Banque d\\'investissement éco-responsable.', 'https://financia.fr', '💼', 'Bordeaux, France', 'Finance & Assurances');

-- Profil Jean Dupont
INSERT INTO candidats (id, utilisateur_id, titre_professionnel, ville, telephone, photo_url, cv_filename, formations, experiences, langues) VALUES
(1, 1, 'Développeur Full-Stack JS Passionné', 'Paris, France', '+33 6 12 34 56 78', 
 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80', 'Jean_Dupont_CV_2026.pdf',
 '[{"diplome": "Titre CDA", "etablissement": "Ecole Web", "annee": "2025"}]',
 '[{"poste": "Dev React", "entreprise": "Digital Growth", "debut": "2024", "fin": "2025", "description": "Dashboard RH"}]',
 '["Français", "Anglais"]');

-- Liaison Recruteur
INSERT INTO recruteurs (id, utilisateur_id, entreprise_id, poste_occupe) VALUES
(1, 2, 1, 'Responsable Recrutement');

-- Offres
INSERT INTO offres_emploi (id, titre, entreprise_id, localisation, secteur, type_contrat, salaire, description) VALUES
(1, 'Développeur Full-Stack React & Node.js', 1, 'Paris (75) - Hybride', 'Informatique & Tech', 'CDI', '48k - 55k €/an', 'Description détaillée React / Node...'),
(2, 'Product Business Analyst', 1, 'Paris (75) - Présentiel', 'Informatique & Tech', 'CDD', '40k - 45k €/an', 'Cahier des charges...'),
(3, 'Ingénieur Machine Learning Médical', 2, 'Lyon (69) - Télétravail total', 'Santé & Biotech', 'CDI', '55k - 68k €/an', 'PyTorch, deep learning...'),
(4, 'Chef de Projet Solaire & Éolien', 3, 'Nantes (44)', 'Énergie & Environnement', 'CDI', '45k - 52k €/an', 'Énergie renouvelable...'),
(5, 'Analyste Financier ISR (Investissement Responsable)', 4, 'Bordeaux (33)', 'Finance & Assurances', 'CDI', '42k - 49k €/an', 'Critères ESG...'),
(6, 'Stagiaire Assistant(e) Recrutement et RH', 1, 'Paris (75)', 'Informatique & Tech', 'Stage', '1 200 € / mois', 'Tri de candidatures...');

-- Candidatures
INSERT INTO candidatures (id, offre_id, candidat_id, cv_filename, lettre_motivation, statut) VALUES
(1, 1, 1, 'Jean_Dupont_CV_2026.pdf', 'Passionné par l\\'innovation, je postule chez TechCorp.', 'En cours d\\'examen'),
(2, 5, 1, 'Jean_Dupont_CV_2026.pdf', 'Intérêt prononcé pour les investissements ISR.', 'En attente');

-- Table compétences de base
INSERT INTO competences (nom) VALUES ('React'), ('Node.js'), ('TypeScript'), ('JavaScript'), ('MySQL'), ('Python'), ('PyTorch'), ('Java');

-- Liaison des compétences au candidat
INSERT INTO candidat_competences (candidat_id, competence_id) VALUES (1, 1), (1, 2), (1, 3), (1, 5);

-- Notifications de départ
INSERT INTO notifications (utilisateur_id, message, lue) VALUES
(1, 'Votre candidature pour le poste "Développeur Full-Stack React & Node.js" est passée au statut : En cours d\\'examen.', FALSE),
(1, 'Bienvenue sur la plateforme ! Complétez votre profil pour maximiser vos chances de recrutement.', TRUE);
`;
