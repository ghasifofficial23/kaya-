import { useState } from 'react';
import { Reveal } from './Reveal';
import { Booking3D } from './Booking3D';
import { Table } from '../types';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Reservations = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00 — Prime Time',
    guests: '4'
  });

  const handleBooking = () => {
    if (!formData.fname || !formData.email || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }
    setShowModal(true);
  };

  return (
    <section id="booking" className="pt-24 md:pt-36 bg-[#2E2822] overflow-hidden">
      <div className="px-6 md:px-12 mb-16 text-center">
        <Reveal direction="up" className="space-y-4">
          <p className="font-jost text-[10px] tracking-[0.6em] uppercase text-[#D4A44C]">Reservations</p>
          <h2 className="font-bebas text-5xl md:text-8xl leading-none tracking-tight text-[#F5EFE0]">
            BOOK<br />YOUR TABLE
          </h2>
          <p className="font-serif text-lg italic text-[#8A8278] mt-4">
            Select your preferred table from our 3D floor plan
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:min-h-[700px]">
        <div className="p-8 md:p-16 bg-[#1A1612] flex flex-col justify-center space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">First Name</label>
              <input 
                value={formData.fname}
                onChange={(e) => setFormData({...formData, fname: e.target.value})}
                className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm" 
                placeholder="Alessandro" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Last Name</label>
              <input 
                value={formData.lname}
                onChange={(e) => setFormData({...formData, lname: e.target.value})}
                className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm" 
                placeholder="Mori" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Email Address</label>
            <input 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              type="email" 
              className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm" 
              placeholder="guest@ember.com" 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Date</label>
              <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Time</label>
              <select 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm appearance-none"
              >
                <option className="bg-[#1A1612]">17:30 — Early Evening</option>
                <option className="bg-[#1A1612]">18:00 — Sunset Seating</option>
                <option className="bg-[#1A1612]">19:00 — Prime Time</option>
                <option className="bg-[#1A1612]">19:30 — Chef's Hour</option>
                <option className="bg-[#1A1612]">20:00 — Late Evening</option>
                <option className="bg-[#1A1612]">21:00 — After Theatre</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Guests</label>
              <input 
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 text-[#F5EFE0] p-3.5 focus:border-[#D4A44C] outline-none transition-colors rounded-sm text-sm"
                placeholder="Number of guests"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#8A8278]">Selected Table</label>
              <div 
                className={cn(
                  "w-full bg-[#F5EFE0]/5 border border-[#D4A44C]/15 p-3.5 rounded-sm text-sm font-medium transition-all",
                  selectedTable ? "text-[#D4A44C] border-[#D4A44C]/50" : "text-[#8A8278]"
                )}
              >
                {selectedTable ? `Table ${selectedTable.label} — ${selectedTable.area}` : 'Click table on 3D plan →'}
              </div>
            </div>
          </div>

          <button 
            onClick={handleBooking}
            className="w-full bg-[#C8442A] text-[#F5EFE0] py-5 font-bebas text-xl tracking-[0.2em] hover:bg-[#D4563E] transition-all transform active:scale-[0.98] mt-4 rounded-sm"
          >
            CONFIRM RESERVATION
          </button>
        </div>

        <div className="relative min-h-[60vh] lg:min-h-full border-b lg:border-b-0 border-[#D4A44C]/15">
          <Booking3D 
            selectedTableId={selectedTable?.id || null} 
            onSelect={(table) => setSelectedTable(table)} 
          />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#2E2822] border border-[#D4A44C]/30 p-10 md:p-16 max-w-lg w-full text-center space-y-6"
            >
              <div className="w-16 h-16 bg-[#C8442A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-[#F5EFE0] w-8 h-8" />
              </div>
              <h3 className="font-bebas text-4xl tracking-widest text-[#D4A44C]">
                RESERVATION<br />CONFIRMED
              </h3>
              <p className="font-serif italic text-[#8A8278] leading-relaxed">
                Dear {formData.fname || 'Guest'}, your table {selectedTable ? `(${selectedTable.label})` : ''} is reserved for {formData.date} at {formData.time}. A confirmation will be sent to your email. We look forward to welcoming you.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="px-10 py-3 border border-[#D4A44C]/30 text-[#F5EFE0] font-bebas tracking-widest hover:bg-[#C8442A] hover:border-[#C8442A] transition-all rounded-sm uppercase text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
