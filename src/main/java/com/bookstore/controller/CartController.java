package com.bookstore.controller;

import com.bookstore.model.Book;
import com.bookstore.model.CartItem;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<CartItem> getCart() {
        return cartItemRepository.findAll();
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItemRequest request) {
        Optional<Book> bookOpt = bookRepository.findById(request.getBookId());
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            // Check if item already in cart
            List<CartItem> cartItems = cartItemRepository.findAll();
            for (CartItem item : cartItems) {
                if (item.getBook().getId().equals(book.getId())) {
                    item.setQuantity(item.getQuantity() + request.getQuantity());
                    return cartItemRepository.save(item);
                }
            }
            // Add new cart item
            CartItem newItem = new CartItem();
            newItem.setBook(book);
            newItem.setQuantity(request.getQuantity());
            return cartItemRepository.save(newItem);
        }
        return null; // Handle proper error in real app
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
    }

    // DTO for request
    public static class CartItemRequest {
        private Long bookId;
        private Integer quantity;

        public Long getBookId() { return bookId; }
        public void setBookId(Long bookId) { this.bookId = bookId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}
