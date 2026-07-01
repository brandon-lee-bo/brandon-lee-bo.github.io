import Image from 'next/image';
import Link from 'next/link';
import { CollectionItem, CollectionPageConfig } from '@/types/page';

function groupedItems(items: CollectionItem[]): Array<[string, CollectionItem[]]> {
    const groups = new Map<string, CollectionItem[]>();
    for (const item of items) {
        const category = item.category || 'Other';
        groups.set(category, [...(groups.get(category) || []), item]);
    }
    return Array.from(groups.entries());
}

function itemInitials(title: string): string {
    return title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join('') || 'N';
}

function CollectionVisual({ item }: { item: CollectionItem }) {
    if (item.image) {
        return (
            <Image
                src={item.image}
                alt=""
                width={220}
                height={150}
                className="h-full w-full object-cover"
            />
        );
    }

    return (
        <div className="collection-visual h-full w-full">
            <span>{itemInitials(item.title)}</span>
        </div>
    );
}

function InstallGuide({ value }: { value: string }) {
    const lines = value.trim().split('\n');

    return (
        <div className="mt-10 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <pre className="overflow-x-auto font-mono text-xs leading-snug">
                <code>
                    {lines.map((line, index) => {
                        const isLabel = line.endsWith(':');
                        const isCommand = line.startsWith('$');
                        const isUrl = line.startsWith('https://');
                        return (
                            <span
                                key={`${line}-${index}`}
                                className={
                                    isLabel
                                        ? "font-semibold text-accent"
                                        : isCommand
                                            ? "text-emerald-700 dark:text-emerald-300"
                                            : isUrl
                                                ? "text-blue-700 dark:text-blue-300"
                                                : "text-neutral-700 dark:text-neutral-300"
                                }
                            >
                                {line || ' '}
                                {index < lines.length - 1 ? '\n' : ''}
                            </span>
                        );
                    })}
                </code>
            </pre>
        </div>
    );
}

export default function CollectionPage({ config, items }: { config: CollectionPageConfig; items: CollectionItem[] }) {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-primary mb-4">{config.title}</h1>
                {config.description && (
                    <p className="text-lg text-neutral-600 dark:text-neutral-500 max-w-2xl">
                        {config.description}
                    </p>
                )}
            </div>

            {items.length === 0 ? (
                <p className="text-neutral-600 dark:text-neutral-500">No entries yet.</p>
            ) : (
                <div className="space-y-10">
                    {groupedItems(items).map(([category, groupItems]) => (
                        <section key={category}>
                            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-sm font-semibold uppercase tracking-normal text-neutral-500 dark:border-neutral-800">
                                {category}
                            </h2>
                            <div className="grid gap-5">
                                {groupItems.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`${config.basePath}/${item.slug}/`}
                                        className="group grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 md:grid-cols-[190px_1fr]"
                                    >
                                        <div className="min-h-[150px] bg-neutral-100 dark:bg-neutral-800">
                                            <CollectionVisual item={item} />
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                {item.type && (
                                                    <span className="rounded border border-accent/30 bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                                                        {item.type}
                                                    </span>
                                                )}
                                                {item.date && (
                                                    <span className="text-xs font-medium text-neutral-500">{item.date}</span>
                                                )}
                                            </div>
                                            <h3 className="mb-2 text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                                                {item.title}
                                            </h3>
                                            {item.description && (
                                                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                                                    {item.description}
                                                </p>
                                            )}
                                            {item.tags.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 5).map((tag) => (
                                                        <span key={tag} className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-500 dark:border-neutral-800">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {config.install_guide && <InstallGuide value={config.install_guide} />}
        </div>
    );
}
