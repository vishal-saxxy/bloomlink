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
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      scale: type === 'flower' ? 1.5 : 1,
      rotation: type === 'flower' ? (Math.random() - 0.5) * 30 : 0,
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
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
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
          Generate Link ✨
        </motion.button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-border/30 bg-card/30 flex flex-col order-2 md:order-1 max-h-[40vh] md:max-h-none">
          {/* Tabs */}
          <div className="flex border-b border-border/30">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs font-medium transition-colors ${
                  activeTab === tab.id
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
                  <div className="grid grid-cols-5 gap-2">
                    {STICKERS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => addElement('sticker', s.id)}
                        className="aspect-square rounded-xl bg-secondary/50 hover:bg-secondary flex items-center justify-center text-2xl transition-colors hover:scale-110"
                        title={s.name}
                      >
                        {s.emoji}
                      </button>
                    ))}
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
        </div>

        {/* Canvas */}
        <div className="flex-1 relative order-1 md:order-2 min-h-[50vh]">
          <BouquetCanvas
            elements={bouquet.elements}
            wrapId={bouquet.wrapId}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
          />

          {/* Element customization floating panel */}
          <AnimatePresence>
            {selectedElement && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
              >
                <CustomizationPanel
                  element={selectedElement}
                  onUpdate={(updates) => updateElement(selectedElement.id, updates)}
                  onDelete={() => deleteElement(selectedElement.id)}
                  onDeselect={() => setSelectedElementId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Builder;
