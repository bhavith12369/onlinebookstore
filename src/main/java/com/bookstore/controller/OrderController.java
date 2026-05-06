package com.bookstore.controller;

import com.bookstore.model.CartItem;
import com.bookstore.model.Order;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/checkout")
public class OrderController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public Order placeOrder() {
        List<CartItem> cartItems = cartItemRepository.findAll();
        if (cartItems.isEmpty()) {
            return null; // Cannot place empty order
        }

        double total = 0;
        for (CartItem item : cartItems) {
            total += item.getBook().getPrice() * item.getQuantity();
        }

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(total);
        order.setStatus("CONFIRMED");

        orderRepository.save(order);
        
        // Clear cart after order
        cartItemRepository.deleteAll();

        return order;
    }
}
