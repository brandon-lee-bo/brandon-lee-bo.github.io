'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import TextPage from '@/components/pages/TextPage';
import CopyButton from '@/components/ui/CopyButton';
import { TextPageConfig } from '@/types/page';

export default function PromptBodyPanel({
    config,
    content,
    rawContent,
}: {
    config: TextPageConfig;
    content: string;
    rawContent: string;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="skill-body-panel rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
                    aria-expanded={expanded}
                >
                    <ChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
                    />
                    {expanded ? 'Collapse Full Prompt' : 'Expand Full Prompt'}
                </button>
                <CopyButton text={rawContent} label="Copy Prompt" size="sm" />
            </div>

            {expanded ? (
                <div className="p-4 sm:p-5">
                    <TextPage config={config} content={content} compact />
                </div>
            ) : (
                <div className="px-4 py-5 text-sm text-neutral-600 dark:text-neutral-500 sm:px-5">
                    The full prompt is collapsed by default. Expand it to review or copy the complete template.
                </div>
            )}
        </section>
    );
}
