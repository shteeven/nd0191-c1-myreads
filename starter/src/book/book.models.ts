
export type ShelfOption = 'currentlyReading' | 'read' | 'wantToRead' | 'none';

export class BookInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
    id: string;
    shelf?: ShelfOption;
}