import {IBook} from "@/data/types";
import {ICartItem} from "@/store/profile";

export function removeDuplicates(books: IBook[]): IBook[] {
    const uniqueBooks: Map<string, IBook> = new Map();

    for (const book of books) {
        uniqueBooks.set(book.id, book);
    }

    return Array.from(uniqueBooks.values());
}

export function getTotalPrice(items: ICartItem[]): number {
    return items.reduce(
        (acc, item) => acc + item.book.saleInfo.listPrice!.amount * 100 * item.quantity / 100, 0
    );
}