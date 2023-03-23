require('./bootstrap');

import { createInertiaApp } from '@inertiajs/svelte';
import { InertiaProgress } from '@inertiajs/progress';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Formidable';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => import(`./Pages/${name}.svelte`),
    setup({ el, App, props }) {
        new App({ target: el, props })
    },
});

InertiaProgress.init({ color: '#4B5563' });
