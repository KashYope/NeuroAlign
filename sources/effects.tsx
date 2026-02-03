
import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { EffectType, Particle } from '../types';

interface EffectCanvasProps {
    activeEffect: EffectType;
    aiConfig: any | null;
}

export interface EffectCanvasHandle {
    spawnParticles: (x: number, y: number) => void;
    clear: () => void;
}

const EffectCanvas = forwardRef<EffectCanvasHandle, EffectCanvasProps>(({ activeEffect, aiConfig }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const nextIdRef = useRef(0);

    const spawnParticles = useCallback((x: number, y: number) => {
        const newParticles: Particle[] = [];
        let count = 20;

        // Custom logic per effect type
        switch (activeEffect) {
            case 'ripple':
                newParticles.push({
                    id: nextIdRef.current++,
                    x, y, vx: 0, vy: 0, size: 5, color: '#60a5fa', life: 1, maxLife: 1, type: 'ripple'
                });
                break;

            case 'firework':
                count = 60;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 4 + 1; // Slowed down speed
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: Math.random() * 4 + 2,
                        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                        life: 1, maxLife: 1, type: 'firework'
                    });
                }
                break;

            case 'starburst':
                count = 30;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 6 + 2; // Slowed down speed
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: Math.random() * 3 + 1,
                        color: '#fde047',
                        life: 1, maxLife: 1, type: 'starburst'
                    });
                }
                break;

            case 'hearts':
                count = 12;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 2,
                        vy: -Math.random() * 3 - 1,
                        size: Math.random() * 15 + 10,
                        color: `hsl(${340 + Math.random() * 40}, 100%, 60%)`,
                        life: 1, maxLife: 1, type: 'hearts'
                    });
                }
                break;

            case 'bubbles':
                count = 20;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 1.5, // Reduced velocity
                        vy: -Math.random() * 2 - 1,    // Reduced velocity
                        size: Math.random() * 10 + 5,
                        color: 'rgba(186, 230, 253, 0.6)',
                        life: 1, maxLife: 1, type: 'bubbles'
                    });
                }
                break;

            case 'confetti':
                count = 50;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.8) * 15,
                        size: Math.random() * 8 + 4,
                        color: `hsl(${Math.random() * 360}, 80%, 50%)`,
                        life: 1, maxLife: 1, type: 'confetti',
                        metadata: { rotation: Math.random() * Math.PI, rSpeed: (Math.random() - 0.5) * 0.2 }
                    });
                }
                break;

            case 'pixels':
                count = 40;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 12,
                        vy: (Math.random() - 0.5) * 12,
                        size: Math.random() * 6 + 2,
                        color: Math.random() > 0.5 ? '#4ade80' : '#22c55e',
                        life: 1, maxLife: 1, type: 'pixels'
                    });
                }
                break;

            case 'electric':
                count = 10;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: Math.cos(angle) * 15,
                        vy: Math.sin(angle) * 15,
                        size: 2,
                        color: '#a5f3fc',
                        life: 1, maxLife: 1, type: 'electric'
                    });
                }
                break;

            case 'snow':
                count = 15;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 2,
                        vy: Math.random() * 2 + 1,
                        size: Math.random() * 4 + 2,
                        color: '#ffffff',
                        life: 1, maxLife: 1, type: 'snow'
                    });
                }
                break;

            case 'fire':
                count = 25;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * 5 - 2,
                        size: Math.random() * 12 + 6,
                        color: Math.random() > 0.5 ? '#f97316' : '#ef4444',
                        life: 1, maxLife: 1, type: 'fire'
                    });
                }
                break;

            case 'plasma':
                count = 15;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 6,
                        vy: (Math.random() - 0.5) * 6,
                        size: 40,
                        color: `hsla(${280 + Math.random() * 60}, 100%, 50%, 0.3)`,
                        life: 1, maxLife: 1, type: 'plasma'
                    });
                }
                break;

            case 'geometric':
                count = 5;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        size: 20,
                        color: '#c084fc',
                        life: 1, maxLife: 1, type: 'geometric',
                        metadata: { sides: Math.floor(Math.random() * 3) + 3 }
                    });
                }
                break;

            case 'shockwave':
                newParticles.push({
                    id: nextIdRef.current++,
                    x, y, vx: 0, vy: 0, size: 10, color: 'rgba(255, 255, 255, 0.8)', life: 1, maxLife: 1, type: 'shockwave'
                });
                break;

            case 'sparkles':
                count = 40;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 8,
                        vy: (Math.random() - 0.5) * 8,
                        size: Math.random() * 3 + 1,
                        color: '#fef08a',
                        life: 1, maxLife: 1, type: 'sparkles'
                    });
                }
                break;

            case 'emoji':
                count = 10;
                const emojis = ['🚀', '🍕', '🎉', '🔥', '🌈', '💎', '🍦', '🛸', '👾', '🎸'];
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 6, // Slowed down horizontal
                        vy: -Math.random() * 8 - 4,   // Slowed down vertical
                        size: 30,
                        color: '#fff',
                        life: 1, maxLife: 1, type: 'emoji',
                        metadata: { emoji: emojis[Math.floor(Math.random() * emojis.length)] }
                    });
                }
                break;

            case 'matrix':
                count = 20;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y: y + (Math.random() - 0.5) * 100,
                        vx: 0,
                        vy: Math.random() * 2 + 1, // Slowed down descent
                        size: 14,
                        color: '#22c55e',
                        life: 1, maxLife: 1, type: 'matrix',
                        metadata: { char: String.fromCharCode(0x30A0 + Math.random() * 96) }
                    });
                }
                break;

            case 'ghost':
                count = 8;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 4,
                        vy: -Math.random() * 3 - 1,
                        size: 40,
                        color: 'rgba(226, 232, 240, 0.4)',
                        life: 1, maxLife: 1, type: 'ghost'
                    });
                }
                break;

            case 'rings':
                count = 3;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: 0, vy: 0,
                        size: 20 + i * 40,
                        color: 'rgba(168, 85, 247, 0.5)',
                        life: 1, maxLife: 1, type: 'rings'
                    });
                }
                break;

            case 'leaves':
                count = 12;
                for (let i = 0; i < count; i++) {
                    newParticles.push({
                        id: nextIdRef.current++,
                        x, y,
                        vx: (Math.random() - 0.5) * 2.5, // Slowed down
                        vy: Math.random() * 2 + 1,      // Slowed down
                        size: 15,
                        color: Math.random() > 0.5 ? '#f97316' : '#ea580c',
                        life: 1, maxLife: 1, type: 'leaves',
                        metadata: { rotation: Math.random() * Math.PI, rSpeed: (Math.random() - 0.5) * 0.1 }
                    });
                }
                break;

            case 'orbs':
                count = 10;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * 50;
                    newParticles.push({
                        id: nextIdRef.current++,
                        x: x + Math.cos(angle) * dist,
                        y: y + Math.sin(angle) * dist,
                        vx: 0, vy: 0,
                        size: 30,
                        color: 'rgba(45, 212, 191, 0.2)',
                        life: 1, maxLife: 1, type: 'orbs'
                    });
                }
                break;

            case 'ai_magic':
                if (aiConfig) {
                    count = aiConfig.particleCount || 30;
                    for (let i = 0; i < count; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * (aiConfig.velocityRange[1] - aiConfig.velocityRange[0]) + aiConfig.velocityRange[0];
                        newParticles.push({
                            id: nextIdRef.current++,
                            x, y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed - (aiConfig.gravity || 0) * 10,
                            size: Math.random() * (aiConfig.sizeRange[1] - aiConfig.sizeRange[0]) + aiConfig.sizeRange[0],
                            color: aiConfig.colors[Math.floor(Math.random() * aiConfig.colors.length)],
                            life: 1, maxLife: 1, type: 'ai_magic',
                            metadata: { ai: aiConfig }
                        });
                    }
                }
                break;
        }

        particlesRef.current = [...particlesRef.current, ...newParticles];
    }, [activeEffect, aiConfig]);

    useImperativeHandle(ref, () => ({
        spawnParticles,
        clear: () => { particlesRef.current = []; }
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const update = () => {
            particlesRef.current = particlesRef.current.map(p => {
                let { x, y, vx, vy, life, size, type, metadata } = p;

                // Behavior logic
                switch (type) {
                    case 'ripple':
                        life -= 0.02;
                        size += 4;
                        break;
                    case 'firework':
                        life -= 0.008; // Slower decay
                        vy += 0.15; // gravity
                        x += vx;
                        y += vy;
                        break;
                    case 'starburst':
                        life -= 0.01; // Slower decay
                        x += vx;
                        y += vy;
                        break;
                    case 'hearts':
                        life -= 0.008; // Slower decay
                        vy += 0.08;   // Gravity effect to make them fall back down
                        x += vx;
                        y += vy;
                        size *= 0.995; // Slower shrinking
                        break;
                    case 'bubbles':
                        life -= 0.008; // Slower decay
                        vy += 0.05;   // Gravity to make them fall back
                        x += vx;
                        y += vy;
                        size *= 0.99;
                        break;
                    case 'confetti':
                        life -= 0.01;
                        vy += 0.2;
                        x += vx;
                        y += vy;
                        metadata.rotation += metadata.rSpeed;
                        break;
                    case 'pixels':
                        life -= 0.02;
                        x += vx;
                        y += vy;
                        vx *= 0.95;
                        vy *= 0.95;
                        break;
                    case 'electric':
                        life -= 0.05;
                        x += vx + (Math.random() - 0.5) * 20;
                        y += vy + (Math.random() - 0.5) * 20;
                        break;
                    case 'snow':
                        life -= 0.01;
                        x += vx + Math.sin(Date.now() / 500) * 1;
                        y += vy;
                        break;
                    case 'leaves':
                        life -= 0.005; // Slower decay
                        x += vx + Math.sin(Date.now() / 500) * 1;
                        y += vy;
                        if (metadata?.rotation !== undefined) metadata.rotation += metadata.rSpeed;
                        break;
                    case 'fire':
                    case 'ghost':
                        life -= 0.015;
                        x += vx;
                        y += vy;
                        size *= 0.98;
                        break;
                    case 'plasma':
                        life -= 0.02;
                        x += vx;
                        y += vy;
                        size += 2;
                        break;
                    case 'orbs':
                        life -= 0.01; // Slower decay
                        x += vx;
                        y += vy;
                        size += 1; // Slower expansion
                        break;
                    case 'geometric':
                        life -= 0.02;
                        x += vx;
                        y += vy;
                        size += 5;
                        break;
                    case 'shockwave':
                        life -= 0.04;
                        size += 15;
                        break;
                    case 'sparkles':
                        life -= 0.03;
                        x += vx;
                        y += vy;
                        size *= 0.9;
                        break;
                    case 'emoji':
                        life -= 0.005; // Slower decay
                        vy += 0.4;
                        x += vx;
                        y += vy;
                        break;
                    case 'matrix':
                        life -= 0.01; // Slower decay
                        y += vy;
                        break;
                    case 'rings':
                        life -= 0.02;
                        size += 2;
                        break;
                    case 'ai_magic':
                        life -= 0.02;
                        x += vx;
                        y += vy;
                        vy += (metadata.ai.gravity || 0);
                        break;
                }

                return { ...p, x, y, vx, vy, life, size, metadata };
            }).filter(p => p.life > 0);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 2;

                switch (p.type) {
                    case 'ripple':
                    case 'shockwave':
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.stroke();
                        break;

                    case 'confetti':
                    case 'pixels':
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        if (p.metadata?.rotation) ctx.rotate(p.metadata.rotation);
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                        ctx.restore();
                        break;

                    case 'hearts':
                        ctx.font = `${p.size}px serif`;
                        ctx.fillText('❤️', p.x - p.size / 2, p.y);
                        break;

                    case 'bubbles':
                    case 'orbs':
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;

                    case 'starburst':
                    case 'sparkles':
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                        break;

                    case 'electric':
                        ctx.beginPath();
                        ctx.moveTo(p.x - p.vx, p.y - p.vy);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                        break;

                    case 'geometric':
                        const sides = p.metadata.sides;
                        ctx.beginPath();
                        for (let i = 0; i < sides; i++) {
                            const angle = (i / sides) * Math.PI * 2;
                            const px = p.x + Math.cos(angle) * p.size;
                            const py = p.y + Math.sin(angle) * p.size;
                            if (i === 0) ctx.moveTo(px, py);
                            else ctx.lineTo(px, py);
                        }
                        ctx.closePath();
                        ctx.stroke();
                        break;

                    case 'emoji':
                        ctx.font = `${p.size}px serif`;
                        ctx.fillText(p.metadata.emoji, p.x - p.size / 2, p.y);
                        break;

                    case 'matrix':
                        ctx.font = `bold ${p.size}px monospace`;
                        ctx.fillText(p.metadata.char, p.x - p.size / 2, p.y);
                        break;

                    case 'rings':
                        ctx.beginPath();
                        ctx.ellipse(p.x, p.y, p.size, p.size / 3, Math.PI / 4, 0, Math.PI * 2);
                        ctx.stroke();
                        break;

                    case 'leaves':
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate(p.metadata.rotation);
                        ctx.beginPath();
                        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                        break;

                    case 'ai_magic':
                        if (p.metadata.ai.shape === 'star') {
                            ctx.font = `${p.size}px serif`;
                            ctx.fillText('⭐', p.x - p.size / 2, p.y);
                        } else if (p.metadata.ai.shape === 'emoji') {
                            ctx.font = `${p.size}px serif`;
                            ctx.fillText(p.metadata.ai.emoji || '✨', p.x - p.size / 2, p.y);
                        } else if (p.metadata.ai.shape === 'square') {
                            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                        } else {
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        break;

                    default:
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                }
            });

            ctx.globalAlpha = 1;
        };

        const loop = () => {
            update();
            draw();
            animationId = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize);
        resize();
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
      ref= { canvasRef }
    className = "fixed inset-0 w-full h-full pointer-events-none z-[9999]"
        />
  );
});

export default EffectCanvas;
