import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import TextPage from '@/components/pages/TextPage';
import SkillBodyPanel from '@/components/pages/SkillBodyPanel';
import { getCollectionItem, getCollectionItems } from '@/lib/content';
import { TextPageConfig } from '@/types/page';

const COLLECTIONS = {
    skills: {
        directory: 'skill',
        title: 'Skills',
        basePath: '/skills',
    },
    blog: {
        directory: 'blog',
        title: 'Blog',
        basePath: '/blog',
    },
} as const;

type CollectionKey = keyof typeof COLLECTIONS;

function collectionConfig(slug: string) {
    return COLLECTIONS[slug as CollectionKey] || null;
}

function removeDuplicateTitle(content: string, title: string): string {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return content.replace(new RegExp(`^#\\s+${escaped}\\s*\\n+`, 'i'), '');
}

function frontmatterValue(content: string, key: string): string {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return '';

    for (const line of match[1].split('\n')) {
        const separator = line.indexOf(':');
        if (separator === -1) continue;
        if (line.slice(0, separator).trim() !== key) continue;
        return line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    }

    return '';
}

function skillMarkdownContent(content: string, rawContent: string, title: string): string {
    const name = frontmatterValue(rawContent, 'name') || title;
    const description = frontmatterValue(rawContent, 'description');
    const header = [
        `name: ${name}`,
        description ? `description: ${description}` : '',
    ].filter(Boolean).join('  \n');

    return `${header}\n\n${removeDuplicateTitle(content, title)}`;
}

export function generateStaticParams() {
    return Object.entries(COLLECTIONS).flatMap(([slug, config]) =>
        getCollectionItems(config.directory).map((entry) => ({
            slug,
            item: entry.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; item: string }> }): Promise<Metadata> {
    const { slug, item } = await params;
    const config = collectionConfig(slug);
    if (!config) return {};

    const entry = getCollectionItem(config.directory, item);
    if (!entry) return {};

    return {
        title: entry.title,
        description: entry.description,
    };
}

export default async function CollectionItemPage({ params }: { params: Promise<{ slug: string; item: string }> }) {
    const { slug, item } = await params;
    const config = collectionConfig(slug);
    if (!config) notFound();

    const entry = getCollectionItem(config.directory, item);
    if (!entry) notFound();

    const pageConfig: TextPageConfig = {
        type: 'text',
        title: entry.title,
        description: entry.description,
        source: entry.source,
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
                <Link href={`${config.basePath}/`} className="inline-flex text-sm font-medium text-accent hover:underline">
                    Back to {config.title}
                </Link>
            </div>
            {slug === 'skills' ? (
                <article>
                    <header className="mb-6">
                        <h1 className="mb-3 font-serif text-4xl font-bold text-primary">{entry.title}</h1>
                        {entry.description && (
                            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-500">
                                {entry.description}
                            </p>
                        )}
                    </header>
                    <SkillBodyPanel
                        config={pageConfig}
                        content={skillMarkdownContent(entry.content, entry.rawContent, entry.title)}
                        rawContent={entry.rawContent}
                    />
                </article>
            ) : (
                <TextPage config={pageConfig} content={removeDuplicateTitle(entry.content, entry.title)} />
            )}
        </div>
    );
}
