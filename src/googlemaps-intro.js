import {introJs} from 'intro.js';
import styles from 'intro.js/introjs.css';

let intro = null;

function initTutorial() {
    intro = introJs();
    intro.setOptions({
        positionPrecedence: ['top', 'right', 'left', 'bottom'],
        showBullets: false,
        showButtons: true,
        keyboardNavigation: false,
        disableInteraction: false,
        overlayOpacity: 0.7,
        showStepNumbers: true,
        hideNext: true,
        hidePrev: true,
        steps: [
            {
                intro: "Hi! Welcome to the Surfly Tutorials experiment!"
            },
            {
                intro: "This page is a real content served from the Google Maps website. This tutorial is added by Surfly in real time."
            },
            {
                // element: menuBar,
                intro: "We can add some automation to make the tutorial simpler...",
                // position: 'right'
            },
            {
                // element: menuBar,
                intro: "...or, we can let the user click around to make the process interactive. Isn't it awesome? :)",
                // position: 'right'
            },
            {
                // element: menuBar,
                intro: "Click the search button to continue!",
            }
        ]
        
    });

    intro.start();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', e => {
        initTutorial();
    });
} else {
    initTutorial();
}
