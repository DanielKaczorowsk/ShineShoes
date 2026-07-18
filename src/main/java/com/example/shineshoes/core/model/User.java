package com.example.shineshoes.core.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

    @Entity
    @Table(name = "users")
    @Getter
    @Setter
    @NoArgsConstructor
    public class User
    {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 100)
        private String name;

        @Column(nullable = false, length = 100)
        private String password;

        @Column(unique = true)
        private String email;
        @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        private List<Order> orders = new ArrayList<>();

        public void withOrders(Order order)
        {
            this.orders.add(order);
            order.setUser(this);
        }
    }
