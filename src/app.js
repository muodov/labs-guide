import {introJs} from 'intro.js';
import styles from 'intro.js/introjs.css';

let intro = null;

function initTutorial() {
    let searchInput = document.querySelector('#search-field');
    let menuBar = document.querySelector('.global-nav');
    let searchBut = document.querySelector('form.search-form input[type=submit]');

    let typed = false;
    let intro2Shown = false;

    intro = introJs();
    intro.setOptions({
        showBullets: false,
        showButtons: true,
        keyboardNavigation: false,
        disableInteraction: false,
        // overlayOpacity: 0.5
        showStepNumbers: true,
        hideNext: true,
        hidePrev: true,
        steps: [
            {
                intro: "Hi! Welcome to the Surfly Tutorials experiment!"
            },
            {
                intro: "This page is a real content served from the Flickr website. The tutorial you see here is added by Surfly in real time."
            },
            {
                element: menuBar,
                intro: "We can add some automation to make the tutorial simpler",
                // position: 'right'
            },
            {
                element: menuBar,
                intro: "...or, we can let the user click around to make the process interactive. Isn't it awesome? :) Click the search button to continue!",
                // position: 'right'
            }
        ]
        
    });
    intro.onafterchange(el => {
        if (!typed && el === menuBar) {
            typed = true;
            let searchTerm = 'CAPYBARA';
            function typeChar(el, l) {
                console.log('typing', l);
                if (l <= searchTerm.length) {
                    el.value = searchTerm.slice(0, l);
                    setTimeout(typeChar, 200, el, l + 1);
                }
            }

            typeChar(searchInput, 1);

            document.querySelector('form.search-form').addEventListener('submit', () => {
                console.log('intro2', intro2Shown, intro);
                if (intro2Shown || !intro) {
                    return;
                }
                intro2Shown = true;
                intro.addStep({
                    intro: "Great! Now that we know what capybara looks like, we can continue"
                });
                intro.goToStep(4).start();
            });
        }
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
