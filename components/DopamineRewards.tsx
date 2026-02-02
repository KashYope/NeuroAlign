
import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    y: number;
    type: 'firework' | 'star' | 'ripple';
    color: string;
    size: number;
    rotation: number;
}

const COLORS = [
    '#f43f5e', // rose-500
    '#ec4899', // pink-500
    '#a855f7', // purple-500
    '#6366f1', // indigo-500
    '#3b82f6', // blue-500
    '#06b6d4', // cyan-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
];

const DopamineRewards: React.FC<{ active: boolean }> = ({ active }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    const addReward = useCallback((x: number, y: number) => {
        const newParticles: Particle[] = [];
        const count = 5 + Math.floor(Math.random() * 5);
        const types: ('firework' | 'star' | 'ripple')[] = ['firework', 'star', 'ripple'];
        const selectedType = types[Math.floor(Math.random() * types.length)];

        if (selectedType === 'ripple') {
            newParticles.push({
                id: Date.now() + Math.random(),
                x,
                y,
                type: 'ripple',
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: 50 + Math.random() * 100,
                rotation: 0
            });
        } else {
            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: Date.now() + Math.random() + i,
                    x: x + (Math.random() - 0.5) * 40,
                    y: y + (Math.random() - 0.5) * 40,
                    type: selectedType,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    size: 15 + Math.random() * 20,
                    rotation: Math.random() * 360
                });
            }
        }

        setParticles(prev => [...prev, ...newParticles]);

        // Cleanup after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
    }, []);

    useEffect(() => {
        if (!active) return;

        const handleClick = (e: MouseEvent) => {
            // Don't trigger on clicks inside buttons or interactive elements to avoid overload
            // although the request says "around clicks", let's keep it fun but not distracting
            addReward(e.clientX, e.clientY);
        };

        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, [active, addReward]);

    if (!active || particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {particles.map(p => {
                if (p.type === 'ripple') {
                    return (
                        <div
                            key={p.id}
                            className="absolute rounded-full border-4 animate-out fade-out zoom-out duration-1000"
                            style={{
                                left: p.x,
                                top: p.y,
                                width: p.size,
                                height: p.size,
                                borderColor: p.color,
                                transform: 'translate(-50%, -50%)',
                                opacity: 0.5
                            }}
                        />
                    );
                }

                return (
                    <div
                        key={p.id}
                        className="absolute animate-in fade-in zoom-in slide-out-to-top-24 duration-700 ease-out"
                        style={{
                            left: p.x,
                            top: p.y,
                            color: p.color,
                            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
                        }}
                    >
                        {p.type === 'firework' ? (
                            <Sparkles size={p.size} className="animate-pulse" />
                        ) : (
                            <Star size={p.size} fill="currentColor" stroke="none" className="drop-shadow-lg" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DopamineRewards;
