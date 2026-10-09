package com.example.springbackend.controller;

import com.example.springbackend.model.Order;
import com.example.springbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody java.util.Map<String, Object> payload) {
        Order order = new Order();
        java.util.List<?> cart = (java.util.List<?>) payload.get("cart");
        if (cart != null && !cart.isEmpty()) {
            StringBuilder productNames = new StringBuilder();
            int totalQty = 0;
            for (Object cartItem : cart) {
                if (cartItem instanceof java.util.Map) {
                    java.util.Map<?,?> item = (java.util.Map<?,?>) cartItem;
                    Object nameObj = item.get("title");
                    if (nameObj == null) {
                        nameObj = item.get("name");
                    }
                    if (nameObj != null) {
                        if (productNames.length() > 0) productNames.append(", ");
                        productNames.append(nameObj.toString());
                    }
                    Object qty = item.get("qty");
                    if (qty == null) qty = item.get("quantity");
                    if (qty != null) {
                        totalQty += Integer.parseInt(qty.toString());
                    } else {
                        totalQty += 1;
                    }
                }
            }
            order.setProduct(productNames.toString());
            order.setQuantity(totalQty > 0 ? totalQty : 1);
        }
        if (payload.containsKey("username")) {
            order.setUserId(payload.get("username").toString());
        }
        if (payload.containsKey("paymentId")) {
            order.setPaymentId(payload.get("paymentId").toString());
        }
        if (payload.containsKey("userAddress")) {
            order.setUserAddress(payload.get("userAddress").toString());
        }
        order.setOrderDate(java.time.LocalDateTime.now());
        return orderRepository.save(order);
    }
}
