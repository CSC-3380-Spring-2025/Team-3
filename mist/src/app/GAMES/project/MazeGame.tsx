import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GamePanel } from './GamePanel';

function MazeGame() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const panel = new GamePanel();
        container.current!.appendChild(panel.canvas);
        container.current!.appendChild(panel.statusLabel);
        return () => {
            panel.canvas.remove();
            panel.statusLabel.remove();
        };
    }, []);

    return <div ref={container} />;
}

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<MazeGame />);
}

export default MazeGame;