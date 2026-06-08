import React, { useState } from 'react';
import { Briefcase, Bell, User, Cpu, Database, LogIn, LogOut, Check } from 'lucide-react';
import { Role, AppNotification } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
  userEmail: string;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  currentRole,
  setCurrentRole,
  notifications,
  markNotificationAsRead,
  unreadCount,
  userEmail,
  onLogout,
  onOpenAuth,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2" 
          onClick={() => setCurrentTab('accueil')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-950">
              Recrut<span className="text-blue-600">Platform</span>
            </span>
            <span className="hidden sm:block text-[10px] text-gray-400 font-mono">WORKSPACE EDITION</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setCurrentTab('accueil')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === 'accueil'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Accueil
          </button>
          
          <button
            onClick={() => setCurrentTab('offres')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === 'offres'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Offres d'emploi
          </button>

          <button
            onClick={() => setCurrentTab('candidat')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === 'candidat'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Espace Candidat
          </button>

          <button
            onClick={() => setCurrentTab('rh')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === 'rh'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            Tableau RH
          </button>

          <button
            onClick={() => setCurrentTab('sql')}
            className={`flex items-center space-x-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === 'sql'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Database className="h-4 w-4 text-emerald-600" />
            <span>Scripts SQL</span>
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          
          {/* Quick tester role switcher */}
          <div className="flex items-center rounded-lg bg-gray-100 p-1 text-xs">
            <button
              onClick={() => {
                setCurrentRole('candidat');
                // Auto switch tabs to match if current tab isn't main/offres/sql
                if (currentTab === 'rh') setCurrentTab('candidat');
              }}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                currentRole === 'candidat'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Tester l'expérience Candidat"
            >
              Candidat
            </button>
            <button
              onClick={() => {
                setCurrentRole('recruteur');
                if (currentTab === 'candidat') setCurrentTab('rh');
              }}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                currentRole === 'recruteur'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Tester l'expérience Recruteur"
            >
              Recruteur
            </button>
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-100 bg-white py-1 shadow-xl ring-1 ring-black/5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-50">
                  <span className="text-xs font-bold text-gray-950">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="rounded bg-red-50 px-1.5 py-0.5 text-[9px] font-semibold text-red-600">
                      {unreadCount} nouvelle(s)
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-gray-400">
                      Aucune notification
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`flex flex-col gap-0.5 border-b border-gray-50 px-4 py-2.5 text-left text-xs transition-colors cursor-pointer hover:bg-gray-50 ${
                          !notif.lue ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-gray-700 font-medium">{notif.message}</p>
                          {!notif.lue && (
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono mt-1">{notif.date}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-2 border-l border-gray-100 pl-3">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-semibold text-gray-900">{currentRole === 'candidat' ? 'Jean Dupont' : 'Sophie Martin'}</span>
              <span className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">{userEmail}</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 text-xs">
              {currentRole === 'candidat' ? 'JD' : 'SM'}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile nav indicator bar */}
      <div className="md:hidden flex items-center justify-around border-t border-gray-50 bg-gray-50 px-2 py-2">
        <button
          onClick={() => setCurrentTab('accueil')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${currentTab === 'accueil' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          Accueil
        </button>
        <button
          onClick={() => setCurrentTab('offres')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${currentTab === 'offres' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          Offres
        </button>
        <button
          onClick={() => setCurrentTab('candidat')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${currentTab === 'candidat' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          Candidat
        </button>
        <button
          onClick={() => setCurrentTab('rh')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${currentTab === 'rh' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
        >
          RH
        </button>
        <button
          onClick={() => setCurrentTab('sql')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-0.5 ${currentTab === 'sql' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
        >
          <Database className="h-3 w-3" /> SQL
        </button>
      </div>

    </header>
  );
}
