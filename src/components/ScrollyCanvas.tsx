'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ScrollOverlay from './ScrollOverlay';

const frameCount = 61;

// Helper to get image path based on frame index
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(2, '0');
  if (index === 60) {
    return `/sequence/frame_60_delay-1.005s.png`;
  }
  return `/sequence/frame_${paddedIndex}_delay-0.067s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw on canvas whenever frameIndex changes or images are loaded
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const currentIndex = Math.min(Math.max(Math.floor(frameIndex.get()), 0), frameCount - 1);
      const img = images[currentIndex];

      if (img && img.complete) {
        // Handle object-fit: cover logic manually on canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          // Canvas is taller than image
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetY = 0;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        // Scale by 6% to crop out the AI watermark in the bottom right corner
        const scaleFactor = 1.06;
        const originalWidth = drawWidth;
        const originalHeight = drawHeight;
        
        drawWidth *= scaleFactor;
        drawHeight *= scaleFactor;
        
        // Re-center the scaled image
        offsetX -= (drawWidth - originalWidth) / 2;
        offsetY -= (drawHeight - originalHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Update canvas size to match window in HD (High-DPI / Retina support)
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      render();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // initial draw

    const unsubscribe = frameIndex.on('change', () => {
      animationFrameId = requestAnimationFrame(render);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, frameIndex, images]);

  return (
    <div id="home" ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {/* Loading State fallback if needed */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50 text-white opacity-50">
            Loading sequence...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
        <ScrollOverlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
