import React, { useState } from 'react';
import { Database, Copy, Check, FileCode, CheckCircle, HelpCircle } from 'lucide-react';
import { SQL_CREATION_SCRIPT } from '../data';

export default function SqlScriptsView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_CREATION_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Intro info bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Scripts Schema SQL</h1>
          <p className="text-sm text-gray-500 mt-1">
            Modèle de données relationnel MySQL complet pour supporter l'architecture de la plateforme.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-700 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copié dans le presse-papier !</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copier le script SQL</span>
            </>
          )}
        </button>
      </div>

      {/* Grid: Code Terminal Left, Explanation Card Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* SQL Script Terminal rendering panel */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl border border-gray-800 bg-gray-950 text-gray-300 font-mono text-xs overflow-hidden shadow-2xl h-[600px]">
          {/* Mock Console Header */}
          <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-500/85" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/85" />
              <span className="h-3 w-3 rounded-full bg-green-500/85" />
              <span className="text-[10px] text-gray-500 font-sans font-bold pl-2">recrutement_db_schema.sql</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded">
              MySQL 8.0+
            </span>
          </div>

          {/* Core code block scroll */}
          <div className="flex-1 overflow-auto p-5 text-left leading-relaxed select-text selection:bg-blue-500/30">
            <pre className="text-gray-100 whitespace-pre font-mono">{SQL_CREATION_SCRIPT}</pre>
          </div>
        </div>

        {/* Explain Card Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Features check card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-1.5 border-b border-gray-50 pb-3 mb-4">
              <CheckCircle className="h-4.5 w-4.5 text-blue-600" />
              <span>Avantages du Modèle</span>
            </h3>

            <ul className="space-y-4 text-xs font-medium text-gray-650">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <strong className="text-gray-900 block">Clés étrangères et intégrité</strong>
                  Chutes de cascade automatiques <code className="bg-gray-100 font-mono text-[10px] px-1 rounded text-red-600">ON DELETE CASCADE</code> garantissant la cohérence en cas de suppression de comptes.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <strong className="text-gray-900 block">Stockage Polyvalent JSON</strong>
                  Utilisation optimisée de types natifs JSON de MySQL pour stocker des tableaux structurés modulaires (formations, expériences professionnelles) sans complexité excessive.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <strong className="text-gray-900 block">Index d'optimisation</strong>
                  Indexation stratégique pour accélérer les opérations de recherche multicritères par secteur d'activité, ville et adresse email d'authentification.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <strong className="text-gray-900 block">Données de Démo (Seeding)</strong>
                  Intègre une insertion de Données de Démo comprenant les profils "Jean Dupont" (Candidat) et "Sophie Martin" (Recruteur) pour tester instantanément.
                </div>
              </li>
            </ul>
          </div>

          {/* Quick FAQ / Guide */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-950 flex items-center gap-1.5 border-b border-gray-50 pb-3 mb-3">
              <HelpCircle className="h-4.5 w-4.5 text-blue-600" />
              <span>Comment l'utiliser ?</span>
            </h3>
            
            <ol className="list-decimal list-inside space-y-3.5 text-xs text-gray-500 font-medium">
              <li>Cliquez sur le bouton <strong>"Copier le script SQL"</strong> ci-dessus.</li>
              <li>Ouvrez votre gestionnaire SQL ou console Terminal de base de données (ex : phpMyAdmin, MySQL Workbench, DBeaver).</li>
              <li>Créez une base ou exécutez le script collé pour initialiser les relations instantanément.</li>
              <li>Assurez-vous de charger l'extension MySQL PDO o l'ORM de votre choix pour interagir fiablement.</li>
            </ol>
          </div>

        </div>

      </div>

    </div>
  );
}
