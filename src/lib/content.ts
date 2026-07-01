import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import { CollectionItem } from '@/types/page';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function stripFrontmatter(content: string): string {
    return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
}

function parseFrontmatter(content: string): Record<string, string | string[]> {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!match) return {};

    const data: Record<string, string | string[]> = {};
    for (const line of match[1].split('\n')) {
        const separator = line.indexOf(':');
        if (separator === -1) continue;

        const key = line.slice(0, separator).trim();
        const rawValue = line.slice(separator + 1).trim();
        if (!key || !rawValue) continue;

        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            data[key] = rawValue
                .slice(1, -1)
                .split(',')
                .map((item) => item.trim().replace(/^["']|["']$/g, ''))
                .filter(Boolean);
        } else if (key === 'tags') {
            data[key] = rawValue.split(',').map((item) => item.trim()).filter(Boolean);
        } else {
            data[key] = rawValue.replace(/^["']|["']$/g, '');
        }
    }
    return data;
}

function firstHeading(content: string): string {
    const match = stripFrontmatter(content).match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : '';
}

function slugFromFilename(filename: string): string {
    return path.basename(filename, path.extname(filename))
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function stringValue(value: string | string[] | undefined): string {
    return typeof value === 'string' ? value : '';
}

function arrayValue(value: string | string[] | undefined): string[] {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
    return [];
}

export function getMarkdownContent(filename: string): string {
    try {
        const filePath = path.join(CONTENT_DIR, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        return stripFrontmatter(content);
    } catch (error) {
        console.error(`Error loading markdown file ${filename}:`, error);
        return '';
    }
}

export function getBibtexContent(filename: string): string {
    try {
        const filePath = path.join(CONTENT_DIR, filename);
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error loading bibtex file ${filename}:`, error);
        return '';
    }
}

export function getTomlContent<T>(filename: string): T | null {
    try {
        const filePath = path.join(CONTENT_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return parse(fileContent) as unknown as T;
    } catch (error) {
        console.error(`Error loading TOML file ${filename}:`, error);
        return null;
    }
}

export function getPageConfig<T = unknown>(pageName: string): T | null {
    return getTomlContent<T>(`${pageName}.toml`);
}

export function getCollectionItems(directory: string): CollectionItem[] {
    const dirPath = path.join(CONTENT_DIR, directory);
    try {
        return fs.readdirSync(dirPath)
            .filter((filename) => filename.endsWith('.md'))
            .sort((a, b) => a.localeCompare(b))
            .map((filename) => {
                const source = path.join(directory, filename);
                const raw = fs.readFileSync(path.join(CONTENT_DIR, source), 'utf-8');
                const data = parseFrontmatter(raw);
                const content = stripFrontmatter(raw);
                const title = stringValue(data.title) || stringValue(data.name) || firstHeading(raw) || slugFromFilename(filename);
                return {
                    slug: stringValue(data.slug) || slugFromFilename(filename),
                    title,
                    description: stringValue(data.description),
                    type: stringValue(data.type),
                    category: stringValue(data.category),
                    date: stringValue(data.date),
                    image: stringValue(data.image),
                    tags: arrayValue(data.tags),
                    source,
                    content,
                    rawContent: raw,
                };
            });
    } catch (error) {
        console.error(`Error loading collection ${directory}:`, error);
        return [];
    }
}

export function getCollectionItem(directory: string, slug: string): CollectionItem | null {
    return getCollectionItems(directory).find((item) => item.slug === slug) || null;
}
