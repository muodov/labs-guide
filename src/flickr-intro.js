import hopscotch from 'hopscotch/src/js/hopscotch.js';
import styles from 'hopscotch/src/less/hopscotch.less';

let intro = null;

function initTutorial() {
    let searchInput = document.querySelector('#search-field');
    let menuBar = document.querySelector('.global-nav');
    let searchBut = document.querySelector('form.search-form input[type=submit]');

    if (!searchInput || !menuBar || !searchBut) {
        console.log('waiting for the page to load...');
        setTimeout(initTutorial, 500);
        return;
    }

    let tour = {
        id: "Surflytour",
        steps: [
            {
                title: "My Header",
                content: "This is the header of my page.",
                target: menuBar,
                placement: "right"
            },
            {
                title: "My content",
                content: "Here is where I put my content.",
                target: searchInput,
                placement: "bottom"
            },
            {
                title: "My content",
                content: "Here is where I put my content.",
                target: searchBut,
                placement: "bottom"
            }
        ]
    };

    // Start the tour!
    hopscotch.startTour(tour);
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', e => {
        initTutorial();
    });
} else {
    initTutorial();
}
