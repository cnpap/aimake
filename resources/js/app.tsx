import '../css/app.css';

import NiceModal from '@ebay/nice-modal-react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

if (import.meta.env.DEV) {
    // Dynamically import the vtjump-react19-client only in development, ignore type checking errors if module is missing.
    // @ts-expect-error - ignore type checking errors if module is missing.
    import('virtual:vtjump-react19-client').catch(() => {
        // Optional: fail silently if the module does not exist in dev.
    });
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <NiceModal.Provider>
                    <App {...props} />
                </NiceModal.Provider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
