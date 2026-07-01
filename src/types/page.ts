export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text' | 'collection';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

export interface CollectionPageConfig extends BasePageConfig {
    type: 'collection';
    install_guide?: string;
    directory: string;
    basePath: string;
}

export interface CollectionItem {
    slug: string;
    title: string;
    description: string;
    type?: string;
    category?: string;
    date?: string;
    image?: string;
    tags: string[];
    source: string;
    content: string;
    rawContent: string;
}
