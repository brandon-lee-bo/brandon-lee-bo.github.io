'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy', size = 'default' }: { text: string; label?: string; size?: 'default' | 'sm' }) {
    const [copied, setCopied] = useState(false);

    async function copyText() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    }

    return (
        <button
            type="button"
            onClick={copyText}
            className={`${size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'} rounded bg-accent font-semibold text-white shadow-sm transition hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
        >
            {copied ? 'Copied' : label}
        </button>
    );
}
