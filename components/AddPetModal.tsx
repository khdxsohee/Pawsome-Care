
import React, { useState } from 'react';
import { X, Camera, Upload, Dog, Cat, Bird, Rabbit, HelpCircle } from 'lucide-react';
import { Pet, PetType } from '../types';

interface AddPetModalProps {
  onClose: () => void;
  onAdd: (pet: Omit<Pet, 'id'>) => void;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Omit<Pet, 'id'>>({
    name: '',
    type: 'dog',
    breed: '',
    age: 0,
    weight: 0,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300&h=300&auto=format&fit=crop',
  });

  const petTypes: { label: string, value: PetType, icon: React.ReactNode }[] = [
    { label: 'Dog', value: 'dog', icon: <Dog className="w-5 h-5" /> },
    { label: 'Cat', value: 'cat', icon: <Cat className="w-5 h-5" /> },
    { label: 'Bird', value: 'bird', icon: <Bird className="w-5 h-5" /> },
    { label: 'Rabbit', value: 'rabbit', icon: <Rabbit className="w-5 h-5" /> },
    { label: 'Other', value: 'other', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.breed) {
      onAdd(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-8 space-y-8 animate-in slide-in-from-bottom-10 duration-500 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">New Companion</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Fill in the details</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-28 h-28 rounded-[2.5rem] bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden group">
              <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <button type="button" className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
              <Upload className="w-3 h-3" /> Change Photo
            </button>
          </div>

          {/* Type Selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Species</label>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {petTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t.value })}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all ${
                    formData.type === t.value 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100'
                  }`}
                >
                  {t.icon}
                  <span className="text-xs font-bold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="What's their name?" 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-indigo-300 focus:bg-white transition-all text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Age (Years)</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-indigo-300 transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Weight (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-indigo-300 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Breed</label>
              <input 
                type="text" 
                required
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="e.g. Golden Retriever" 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-indigo-300 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-indigo-600 rounded-[2rem] text-white font-bold uppercase tracking-widest text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all mt-4"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
