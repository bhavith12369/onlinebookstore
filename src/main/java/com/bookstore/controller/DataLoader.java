package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() == 0) {
            bookRepository.save(new Book(null, "The Great Gatsby", "F. Scott Fitzgerald", "A classic novel about the American Dream.", 10.99, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"));
            bookRepository.save(new Book(null, "1984", "George Orwell", "A dystopian social science fiction novel and cautionary tale.", 12.99, "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop"));
            bookRepository.save(new Book(null, "To Kill a Mockingbird", "Harper Lee", "A novel about the serious issues of rape and racial inequality.", 14.50, "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"));
            bookRepository.save(new Book(null, "Pride and Prejudice", "Jane Austen", "An 1813 novel of manners written by Jane Austen.", 9.99, "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop"));
            bookRepository.save(new Book(null, "The Catcher in the Rye", "J.D. Salinger", "A classic novel of teenage angst and alienation.", 11.20, "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop"));
            bookRepository.save(new Book(null, "Moby-Dick", "Herman Melville", "The epic tale of a captain's obsessive quest.", 15.00, "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop"));
        }
    }
}
