'use client';

import { useState } from 'react';
import TextPage from '@/components/pages/TextPage';
import CopyButton from '@/components/ui/CopyButton';
import { TextPageConfig } from '@/types/page';

export default function SkillBodyPanel({
    config,
    content,
    rawContent,
    skillName,
    skillDescription,
}: {
    config: TextPageConfig;
    content: string;
    rawContent: string;
    skillName?: string;
    skillDescription?: string;
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
                    <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>{'>'}</span>
                    {expanded ? 'Collapse Full Skill.md' : 'Expand Full Skill.md'}
                </button>
                <CopyButton text={rawContent} label="Copy Skill" size="sm" />
            </div>

            {expanded ? (
                <div className="p-4 sm:p-5">
                    {(skillName || skillDescription) && (
                        <div className="mb-5 rounded-lg border border-accent/20 bg-accent/5 p-3 font-mono text-xs leading-relaxed">
                            {skillName && (
                                <div>
                                    <span className="font-semibold text-accent">name:</span>{' '}
                                    <span className="text-neutral-800 dark:text-neutral-200">{skillName}</span>
                                </div>
                            )}
                            {skillDescription && (
                                <div>
                                    <span className="font-semibold text-accent">description:</span>{' '}
                                    <span className="text-neutral-700 dark:text-neutral-300">{skillDescription}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <TextPage config={config} content={content} compact />
                </div>
            ) : (
                <div className="px-4 py-5 text-sm text-neutral-600 dark:text-neutral-500 sm:px-5">
                    Full Skill.md is collapsed by default. Expand it when you want to inspect the full prompt.
                </div>
            )}
        </section>
    );
}
