export type Role = 'candidat' | 'recruteur';

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: Role;
  dateInscription: string;
}

export interface Candidat {
  id: string;
  utilisateurId: string;
  titreProfessionnel: string;
  ville: string;
  telephone: string;
  photoUrl: string;
  cvFilename: string;
  cvDataUrl?: string; // Standard base64 simulation
  competences: string[];
  formations: {
    diplome: string;
    etablissement: string;
    annee: string;
  }[];
  experiences: {
    poste: string;
    entreprise: string;
    debut: string;
    fin: string;
    description: string;
  }[];
  langues: string[];
}

export interface Recruteur {
  id: string;
  utilisateurId: string;
  entrepriseId: string;
  posteOccupe: string;
}

export interface Entreprise {
  id: string;
  nom: string;
  description: string;
  siteWeb: string;
  logoUrl: string;
  localisation: string;
  secteur: string;
}

export interface OffreEmploi {
  id: string;
  titre: string;
  entrepriseId: string;
  entrepriseNom: string;
  entrepriseLogo: string;
  localisation: string;
  secteur: string;
  typeContrat: 'CDI' | 'CDD' | 'Stage' | 'Alternance' | 'Freelance';
  salaire: string; // Ex: "45k - 55k €/an" or similar
  description: string;
  datePublication: string;
}

export interface Candidature {
  id: string;
  offreId: string;
  offreTitre: string;
  entrepriseNom: string;
  candidatId: string;
  candidatNom: string;
  candidatEmail: string;
  cvFilename: string;
  lettreMotivation: string;
  statut: 'En attente' | 'En cours d\'examen' | 'Acceptée' | 'Refusée';
  dateCandidature: string;
}

export interface Competence {
  id: string;
  nom: string;
}

export interface AppNotification {
  id: string;
  utilisateurId: string;
  message: string;
  date: string;
  lue: boolean;
}
