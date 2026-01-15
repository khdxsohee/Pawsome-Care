
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PawPrint, 
  MessageSquareHeart, 
  ClipboardList, 
  Plus, 
  Bell, 
  Search,
  ChevronRight,
  Heart,
  Settings,
  X,
  Camera
} from 'lucide-react';
import { AppTab, Pet, Reminder, ChatMessage } from './types';
import Dashboard from './components/Dashboard';
import PetProfileList from './components/PetProfileList';
import AiExpert from './components/AiExpert';
import Records from './components/Records';
import AddPetModal from './components/AddPetModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Luna',
      type: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      weight: 28,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=300&h=300&auto=format&fit=crop',
      lastCheckup: '2023-11-15'
    },
    {
      id: '2',
      name: 'Milo',
      type: 'cat',
      breed: 'Siamese',
      age: 2,
      weight: 4.5,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300&h=300&auto=format&fit=crop',
      lastCheckup: '2024-01-10'
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'r1', petId: '1', title: 'Morning Walk', time: '08:00 AM', type: 'walk', completed: false },
    { id: 'r2', petId: '1', title: 'Heartworm Pill', time: '09:00 AM', type: 'medication', completed: false },
    { id: 'r3', petId: '2', title: 'Afternoon Treat', time: '02:00 PM', type: 'feeding', completed: true },
  ]);

  const addPet = (newPet: Omit<Pet, 'id'>) => {
    const petWithId = { ...newPet, id: Math.random().toString(36).substr(2, 9) };
    setPets([...pets, petWithId]);
    setIsAddPetOpen(false);
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard pets={pets} reminders={reminders} toggleReminder={toggleReminder} onAddPet={() => setIsAddPetOpen(true)} />;
      case AppTab.PETS:
        return <PetProfileList pets={pets} onAddPet={() => setIsAddPetOpen(true)} />;
      case AppTab.AI_EXPERT:
        return <AiExpert pets={pets} />;
      case AppTab.RECORDS:
        return <Records pets={pets} />;
      default:
        return <Dashboard pets={pets} reminders={reminders} toggleReminder={toggleReminder} onAddPet={() => setIsAddPetOpen(true)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 relative overflow-hidden shadow-2xl">
      {/* Header */}
      <header className="px-6 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PawsomeCare</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Premium Pet Care</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
            <Search className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto hide-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-20">
        <NavButton 
          active={activeTab === AppTab.DASHBOARD} 
          icon={<LayoutDashboard className="w-6 h-6" />} 
          label="Home" 
          onClick={() => setActiveTab(AppTab.DASHBOARD)} 
        />
        <NavButton 
          active={activeTab === AppTab.PETS} 
          icon={<PawPrint className="w-6 h-6" />} 
          label="My Pets" 
          onClick={() => setActiveTab(AppTab.PETS)} 
        />
        <div className="relative -top-8">
          <button 
            onClick={() => setIsAddPetOpen(true)}
            className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-8 h-8" />
          </button>
        </div>
        <NavButton 
          active={activeTab === AppTab.AI_EXPERT} 
          icon={<MessageSquareHeart className="w-6 h-6" />} 
          label="AI Chat" 
          onClick={() => setActiveTab(AppTab.AI_EXPERT)} 
        />
        <NavButton 
          active={activeTab === AppTab.RECORDS} 
          icon={<ClipboardList className="w-6 h-6" />} 
          label="Stats" 
          onClick={() => setActiveTab(AppTab.RECORDS)} 
        />
      </nav>

      {/* Add Pet Modal */}
      {isAddPetOpen && <AddPetModal onClose={() => setIsAddPetOpen(false)} onAdd={addPet} />}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-indigo-600' : 'text-slate-400'}`}
  >
    <div className={`p-1 rounded-xl transition-all ${active ? 'bg-indigo-50' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
  </button>
);

export default App;
