import { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

const images = [
    "https://picsum.photos/500",
    "https://picsum.photos/501",
    "https://picsum.photos/502",
    "https://picsum.photos/503",
    "https://picsum.photos/504",
    "https://picsum.photos/505",
    "https://picsum.photos/506",
];

export default function Carousel() {
    const [pos, setPos] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [visible, setVisible] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(swap, 10000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    function swap() {
        setPos(p => (p + 1) % images.length);
        setTimeout(() => setVisible(true), 1500);
        setTimeout(() => setVisible(false), 9500);
        for(let i = 0; i < 10; i++) {
            setTimeout(() => setElapsed(i + 1), i * 1000);
        }
    }

    return (
        <div className="carousel">
            <div className="images">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`carousel-item${idx === pos ? '' : ' hide'}`}
                        style={{ backgroundImage: `url('${img}')` }}
                    >
                        <div className={`info ${!visible ? 'hide' : ''}`}>
                            <h1>{`Image #${idx + 1}`}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bar" style={{ "--p": (elapsed * 10) + "%" } as any}></div>
        </div>
    );
}