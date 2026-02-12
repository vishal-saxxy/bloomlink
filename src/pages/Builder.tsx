import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerLibrary } from "@/components/bouquet/FlowerLibrary";
import { BouquetCanvas } from "@/components/bouquet/BouquetCanvas";
import { CustomizationPanel } from "@/components/bouquet/CustomizationPanel";
import { NoteEditor } from "@/components/bouquet/NoteEditor";
import { WrapSelector } from "@/components/bouquet/WrapSelector";
import { BouquetConfig, PlacedElement, createEmptyBouquet, encodeBouquet } from "@/lib/bouquet-store";
import { FLOWERS, STICKERS } from "@/lib/flowers-data";
import { getStickerSVG } from "@/lib/sticker-svgs";
import Footer from "@/components/Footer";

type Tab = 'flowers' | 'stickers' | 'wrap' | 'note';

const Builder = () => {
  const navigate = useNavigate();
  const [bouquet, setBouquet] = useState<BouquetConfig>(createEmptyBouquet);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('flowers');
  const [searchQuery, setSearchQuery] = useState('');
  const nextZIndex = useRef(1);

  const selectedElement = bouquet.elements.find(e => e.id === selectedElementId) || null;

  const addElement = useCallback((type: 'flower' | 'sticker', dataId: string) => {
    const source = type === 'flower'
      ? FLOWERS.find(f => f.id === dataId)
      : STICKERS.find(s => s.id === dataId);
    if (!source) return;

    const newEl: PlacedElement = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      dataId,
      // Internal Canvas is 400x500. Center is 200, 250.
      // Wider spread for fuller look, but centered
      x: 200 + (Math.random() - 0.5) * 140, // Range 130-270
      y: 200 + (Math.random() - 0.5) * 100, // Range 150-250
      scale: type === 'flower' ? 1.2 + (Math.random() - 0.5) * 0.3 : 1.0, // Scale 1.05 - 1.35
      // Head-only flowers: Random rotation for natural variation
      rotation: (Math.random() - 0.5) * 60,
      color: 'emoji' in source && type === 'flower' ? (source as any).defaultColor || '' : '',
      emoji: source.emoji,
      zIndex: nextZIndex.current++,
      opacity: 1,
    };

    setBouquet(prev => ({ ...prev, elements: [...prev.elements, newEl] }));
    setSelectedElementId(newEl.id);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<PlacedElement>) => {
    setBouquet(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el),
    }));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setBouquet(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
    }));
    setSelectedElementId(null);
  }, []);

  const handleGenerate = () => {
    if (bouquet.elements.length === 0) return;
    const encoded = encodeBouquet(bouquet);
    navigate(`/view/${encoded}`);
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'flowers', label: 'Flowers', icon: '🌸' },
    { id: 'stickers', label: 'Stickers', icon: '✨' },
    { id: 'wrap', label: 'Wrap', icon: '🎀' },
    { id: 'note', label: 'Note', icon: '💌' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0">
        <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </button>
        <h1 className="font-display text-lg text-gradient-pink">bloomlink</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={bouquet.elements.length === 0}
          className="glow-button text-sm px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Generate ✨
        </motion.button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Canvas Area */}
        <div className="flex-1 relative order-1 min-h-[40vh] md:min-h-0 bg-secondary/5 flex flex-col">
          <BouquetCanvas
            elements={bouquet.elements}
            wrapId={bouquet.wrapId}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
          />
        </div>

        {/* Edit Panel (Independent Column/Row) */}
        <AnimatePresence mode="popLayout">
          {selectedElement && (
            <>
              {/* Desktop: Vertical Column (Width Animation) */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="hidden md:flex flex-col border-l border-border/30 bg-card/95 backdrop-blur-md h-full z-20 shadow-xl overflow-hidden order-2 relative"
              >
                <div className="flex-1 overflow-y-auto w-[320px]"> {/* Fixed width inner to prevent layout shift during anim */}
                  <CustomizationPanel
                    element={selectedElement}
                    onUpdate={(updates) => updateElement(selectedElement.id, updates)}
                    onDelete={() => deleteElement(selectedElement.id)}
                    onDeselect={() => setSelectedElementId(null)}
                  />
                </div>
              </motion.div>

              {/* Mobile: Horizontal Block (Height Animation) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden w-full border-t border-b border-border/30 bg-card/95 backdrop-blur-md z-20 shadow-xl overflow-hidden order-2"
              >
                <div className="p-2">
                  <CustomizationPanel
                    element={selectedElement}
                    onUpdate={(updates) => updateElement(selectedElement.id, updates)}
                    onDelete={() => deleteElement(selectedElement.id)}
                    onDeselect={() => setSelectedElementId(null)}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Library Sidebar */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-border/30 bg-card/40 flex flex-col order-3 max-h-[50vh] md:max-h-none h-full z-10">
          {/* Tabs */}
          <div className="flex border-b border-border/30 shrink-0 bg-background/60 backdrop-blur-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 md:py-3 text-xs font-medium transition-colors ${activeTab === tab.id
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
                  }`}
              >
                <span className="block text-base mb-0.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <AnimatePresence mode="wait">
              {activeTab === 'flowers' && (
                <motion.div key="flowers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FlowerLibrary
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelect={(id) => addElement('flower', id)}
                  />
                </motion.div>
              )}
              {activeTab === 'stickers' && (
                <motion.div key="stickers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                    {STICKERS.map(s => {
                      const svg = getStickerSVG(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => addElement('sticker', s.id)}
                          className="aspect-square rounded-xl hover:bg-secondary/40 flex items-center justify-center transition-colors hover:scale-110"
                          title={s.name}
                        >
                          {svg ? (
                            <div className="w-10 h-10 flex items-center justify-center">{svg}</div>
                          ) : (
                            <span className="text-2xl">{s.emoji}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
              {activeTab === 'wrap' && (
                <motion.div key="wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <WrapSelector
                    selectedWrapId={bouquet.wrapId}
                    onSelect={(id) => setBouquet(prev => ({ ...prev, wrapId: id }))}
                  />
                </motion.div>
              )}
              {activeTab === 'note' && (
                <motion.div key="note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <NoteEditor
                    recipientName={bouquet.recipientName}
                    note={bouquet.note}
                    noteFont={bouquet.noteFont}
                    noteColor={bouquet.noteColor}
                    onUpdate={(updates) => setBouquet(prev => ({ ...prev, ...updates }))}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Builder;
