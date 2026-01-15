
import React from 'react';
import { Pet, Reminder } from '../types';
import { ChevronRight, Calendar, Heart, Weight, Activity, Bell } from 'lucide-react';

interface DashboardProps {
  pets: Pet[];
  reminders: Reminder[];
  toggleReminder: (id: string) => void;
  onAddPet: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ pets, reminders, toggleReminder, onAddPet }) => {
  const pendingReminders = reminders.filter(r => !r.completed);

  return (
    <div className="px-6 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Your Pet Family</h2>
          <button onClick={onAddPet} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">See All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {pets.map(pet => (
            <div key={pet.id} className="flex-shrink-0 w-32 space-y-2 group">
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-[1.02]">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                  <span className="text-[10px] font-bold text-slate-700 uppercase">{pet.breed.split(' ')[0]}</span>
                </div>
              </div>
              <p className="text-center font-bold text-slate-800">{pet.name}</p>
            </div>
          ))}
          <button 
            onClick={onAddPet}
            className="flex-shrink-0 w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="text-xs font-bold uppercase">Add New</span>
          </button>
        </div>
      </section>

      {/* Reminders Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Daily Tasks</h2>
          <div className="bg-indigo-100 px-2 py-1 rounded-lg">
            <span className="text-[10px] font-bold text-indigo-700 uppercase">{pendingReminders.length} Pending</span>
          </div>
        </div>

        <div className="space-y-3">
          {reminders.map(reminder => (
            <div 
              key={reminder.id} 
              onClick={() => toggleReminder(reminder.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                reminder.completed 
                ? 'bg-slate-50 border-slate-100 opacity-60' 
                : 'bg-white border-slate-200 shadow-sm hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${getReminderColor(reminder.type)}`}>
                  {getReminderIcon(reminder.type)}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${reminder.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {reminder.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{reminder.time} • {pets.find(p => p.id === reminder.petId)?.name}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                reminder.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'
              }`}>
                {reminder.completed && <CheckIcon className="w-4 h-4 text-white" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-indigo-600 rounded-[2.5rem] p-6 text-white overflow-hidden relative shadow-xl shadow-indigo-100">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-200" />
            <h2 className="text-lg font-bold">Health Insights</h2>
          </div>
          <p className="text-sm text-indigo-50 text-opacity-80 leading-relaxed">
            Luna has reached her step goal for 5 days in a row! Keep up the great work to maintain her ideal weight.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-indigo-50 transition-colors">
            View Analytics
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>
      </section>
    </div>
  );
};

const getReminderIcon = (type: string) => {
  switch (type) {
    case 'feeding': return <Activity className="w-5 h-5" />;
    case 'medication': return <Heart className="w-5 h-5" />;
    case 'grooming': return <Calendar className="w-5 h-5" />;
    case 'walk': return <Activity className="w-5 h-5" />;
    case 'vet': return <Activity className="w-5 h-5" />;
    default: return <Bell className="w-5 h-5" />;
  }
};

const getReminderColor = (type: string) => {
  switch (type) {
    case 'feeding': return 'bg-amber-100 text-amber-600';
    case 'medication': return 'bg-rose-100 text-rose-600';
    case 'grooming': return 'bg-sky-100 text-sky-600';
    case 'walk': return 'bg-emerald-100 text-emerald-600';
    case 'vet': return 'bg-indigo-100 text-indigo-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default Dashboard;
