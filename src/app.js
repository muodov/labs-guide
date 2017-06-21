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
        positionPrecedence: ['top', 'right', 'left', 'bottom'],
        showBullets: false,
        showButtons: true,
        keyboardNavigation: false,
        disableInteraction: false,
        overlayOpacity: 0.1,
        showStepNumbers: true,
        hideNext: true,
        hidePrev: true,
        steps: [
            {
                intro: "Hi! Welcome to the Surfly Tutorials experiment!"
            },
            {
                intro: "This page is a real content served from the Flickr website. This tutorial is added by Surfly in real time."
            },
            {
                element: menuBar,
                intro: "We can add some automation to make the tutorial simpler...",
                // position: 'right'
            },
            {
                element: menuBar,
                intro: "...or, we can let the user click around to make the process interactive. Isn't it awesome? :)",
                // position: 'right'
            },
            {
                element: menuBar,
                intro: "Click the search button to continue!",
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
                
                function initIntro2() {
                    let searchResults = document.querySelector('.search-slender-advanced-panel-view');
                    if (searchResults) {
                        console.log(searchResults);

                        intro.addSteps([
                            {
                                element: document.body,
                                intro: "These capybaras are gorgeous, aren't they?"
                            },
                            {
                                // element: searchResults,
                                element: document.body,
                                intro: "Note that this tutorial is completely independent, but all content is served live from Flickr, so the search results are always up-to-date"
                            }
                        ]);
                        intro.goToStep(5).start();
                    } else {
                        console.log('waiting for search results...');
                        setTimeout(initIntro2, 1000);
                    }
                }
                setTimeout(initIntro2, 1000);
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
