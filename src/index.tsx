import { useState, useEffect, useMemo, ReactNode } from 'react';
import { render } from 'react-dom';
import ReactTooltip from 'react-tooltip';
import './index.css'
import bg from './bg.jpg';
import bg2 from './bg2.jpg';
import bg3 from './bg3.jpg';
import bg4 from './bg4.jpg';
import bg5 from './bg5.jpg';
import bg6 from './bg6.jpg';
import organ from 'url:./out.mp3';

const bgs = {
    0: 'linear-gradient(black, black)',
    0.8: `url(${bg})`,
    1.9: `url(${bg2})`,
    2.8: `url(${bg3})`,
    3.8: `url(${bg4})`,
    4.8: `url(${bg5})`,
    5.8: `url(${bg6})`
};

const Help = ({ help, children }: { help: string, children: ReactNode }) => {
    const [hover, setHover] = useState(false);
    const tooltipID = useMemo(() => Math.random().toString().slice(2, 15), []);
    return <>
        <span data-tip data-for={tooltipID} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
            textDecoration: hover ? 'underline' : 'none'
        }}>{children}</span>
        <ReactTooltip id={tooltipID} effect="solid" multiline className="tooltip">
            <span style={{ fontSize: '1.5em', fontFamily: "'Roboto', Arial, sans-serif" }}>{help}</span>
        </ReactTooltip>
    </>;
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

const StartButton = () => {
    const [hover, setHover] = useState(false);
    return <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => {
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
        fontFamily: "'Roboto', Arial, sans-serif",
        background: `rgba(127, 127, 127, ${hover ? 0.8 : 0.4})`,
        transition: 'background-color 300ms ease-in-out',
        width: '100%',
        padding: '0.25em',
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        borderRadius: '0.1em',
        display: 'inline',
        marginTop: '2em',
        fontSize: '0.5em',
        cursor: 'pointer'
    }}>Start</div>
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
                    <StartButton />
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
                    That <Help help="Dickinson explains here that winter afternoons give her a sense of dread and melancholy. She compares this feeling to that of hearing an organ playing in a cathedral.">oppresses, like the Heft<br />
                    Of Cathedral Tunes –</Help>
                </div>

                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    <Help help="This oxymoronic statement reflects Dickinson's conflicted feelings about death, as she is uncertain about the existence of an afterlife. Indeed, Dickinson challenges the popular notion of Heaven in many of her poems.">Heavenly Hurt</Help>, it gives us –<br />
                    <Help help={'Most people conceal their feelings of existential dread, hence they bear no outward "scar".'}>We can find no scar,</Help><br />
                    But internal difference –<br />
                    Where the Meanings, are –
                </div>

                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    <Help help="The real impact of this feeling of hopelessness is very personal and can only be felt individually.">None may teach it – Any –<br />
                    'Tis the seal Despair –<br /></Help>
                    An imperial affliction<br />
                    Sent us <Help help="These feelings of despair occur for so many people seemingly out of nowhere. Dickinson finds them so abundant that they could only from something as ubiquitous as the air.">of the Air –</Help>
                </div>


                <div style={{
                    paddingBottom: '100vh',
                    height: 0
                }}>
                    When it comes, <Help help="Even the natural world is powerless to the cycle of life, Dickinson professes. Death is inevitable, and once a life is lived, it cannot be changed, and one cannot be sure of a chance at a new life after death. Dickinson's ideas, as usual, fly in the face of the Christian beliefs held by most people of the era, her family included.">the Landscape listens –<br />
                    Shadows – hold their breath –</Help>
                </div>

                <div style={{
                    paddingBottom: '60vh',
                    height: 0
                }}>
                    When it goes, 'tis like the <Help help="Even when she stops contemplating death, Dickinson's feeling of hopelessness leaves a psychological mark; she feels as empty and detached from reality as a corpse.">Distance<br />
                    On the look of Death –</Help>
                </div>
            </div>
        </div>
    );
}

render(<App />, document.getElementById('app'));
