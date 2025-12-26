'use client';

import React, { useEffect, useRef } from 'react';

export const BlueShieldEye: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = 600;
            canvas.height = 600;
        };
        resize();

        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // --- Outer Shield Ring (Rotating) ---
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(time * 0.2);
            ctx.beginPath();
            ctx.arc(0, 0, 200, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 190, 255, 0.3)';
            ctx.lineWidth = 2;
            // Dashed effect
            ctx.setLineDash([20, 15, 5, 15]);
            ctx.stroke();

            // Inner marks
            for (let i = 0; i < 12; i++) {
                ctx.rotate(Math.PI / 6);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
                ctx.fillRect(180, -2, 10, 4);
            }
            ctx.restore();

            // --- Middle Logic Ring (Counter-rotating) ---
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(-time * 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, 140, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 100, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([50, 50]);
            ctx.stroke();

            // Arc Segments
            ctx.beginPath();
            ctx.arc(0, 0, 150, 0, Math.PI, false);
            ctx.strokeStyle = 'rgba(0, 200, 255, 0.2)';
            ctx.lineWidth = 4;
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.restore();

            // --- Core "Iris" (Breathing) ---
            const pulse = 1 + Math.sin(time * 2) * 0.05;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(pulse, pulse);

            // Hexagon Pupil
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const r = 60;
                ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();

            // Central glow point
            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 20;
            ctx.fill();

            ctx.restore();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,150,255,0.4)]"
            />
        </div>
    );
};
