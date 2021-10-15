import { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';
import './index.css'
import bg from './bg.jpg';
import bg2 from './bg2.jpg';
import bg3 from './bg3.jpg';
import bg5 from './bg5.jpg';
import bg6 from './bg6.jpg';
import organ from 'url:./out.mp3';

const bgs = {
    0: 'linear-gradient(black, black)',
    0.8: `url(${bg})`,
    1.9: `url(${bg2})`,
    2.8: `url(${bg3})`,
    4.8: `url(${bg5})`,
    5.8: `url(${bg6})`
};

const bgVals = (Object.entries(bgs).map(([a, b]) => [+a, b]) as [number, string][]).sort((a, b) => a[0] - b[0]);

const getBG = (pos: number) => {
    let lastBg = bgVals[0];
    let slastBg = bgVals[0];
    const threshold = 0.3 * window.innerHeight;
    for (const [minPos, bg] of bgVals) {
        if (pos + threshold > minPos * window.innerHeight) {
            slastBg = lastBg;
            lastBg = [minPos * window.innerHeight, bg];
        } else {
            break;
        }
    }
    if (pos >= lastBg[0]) {
        return lastBg[1];
    }
    const crossRatio = (lastBg[0] - pos) / threshold;
    return `-webkit-cross-fade(${lastBg[1]}, ${slastBg[1]}, ${crossRatio * 100}%)`
}

const App = () => {
    const [scroll, setScroll] = useState(window.scrollY);
    useEffect(() => {
        const cb = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener('scroll', cb);
        return () => window.removeEventListener('scroll', cb);
    }, [setScroll]);

    return (
        <div style={{
            background: `fixed center/contain no-repeat ${getBG(scroll)}`,
            width: '100vw'
        }}>
            <div style={{
                width: '100vw',
                background: `rgba(0, 0, 0, 0.3)`,
                color: 'white',
                fontSize: '3vw',
                textAlign: 'center'
            }}>
                <div style={{
                    paddingBottom: '100vh',
                    paddingTop: '40vh',
                    height: 0
                }}>
                    <span style={{fontStyle: 'italic'}}>There's a certain Slant of <span style={{ textShadow: '0 0 3px white, 0 0 9px white, 0 0 15px white' }}>light</span>,</span> (320)<br />
                    <div style={{fontSize: '0.5em'}}>website by arjun barrett</div>
                    <button onClick={() => {
                        let lastScrollY = -1;
                        const organAudio = new Audio(organ);
                        organAudio.play();
                        organAudio.loop = true;
                        organAudio.volume = 0;
                        const onInterval = () => {
                            if (window.scrollY == lastScrollY) {
                                const int2 = setInterval(() => {
                                    if ((organAudio.volume -= 0.002) < 0.01) {
                                        organAudio.pause();
                                        clearInterval(int2);
                                    }
                                }, 10);
                            } else {
                                organAudio.volume = Math.min(1, window.scrollY / (window.innerHeight * 1.8));
                                lastScrollY = window.scrollY;
                                window.scrollTo({
                                    top: window.scrollY + 1,
                                    left: 0
                                });
                                setTimeout(onInterval, 16000 / window.innerHeight);
                            }
                        }
                        onInterval();
                    }} style={{

                    }}>Start</button>
                </div>

                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    There's a certain Slant of light,<br />
                    Winter Afternoons –
                </div>


                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    That oppresses, like the Heft<br />
                    Of Cathedral Tunes –
                </div>

                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    Heavenly Hurt, it gives us –<br />
                    We can find no scar,<br />
                    But internal difference –<br />
                    Where the Meanings, are –
                </div>

                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    None may teach it – Any –<br />
                    'Tis the seal Despair –<br />
                    An imperial affliction<br />
                    Sent us of the Air –
                </div>


                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    When it comes, the Landscape listens –<br />
                    Shadows – hold their breath –
                </div>

                <div style={{
                    paddingBottom: '60vh',
                    height: 0
                }}>
                    When it goes, 'tis like the Distance<br />
                    On the look of Death –
                </div>
            </div>
        </div>
    );
}

render(<App />, document.getElementById('app'));
