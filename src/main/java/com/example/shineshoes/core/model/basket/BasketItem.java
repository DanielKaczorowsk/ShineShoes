package com.example.shineshoes.core.model.basket;

import com.example.shineshoes.core.model.product.ProductVariant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "BasketItem")
@NoArgsConstructor
@Getter
@Setter
public class BasketItem
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;
    @ManyToOne
    @JoinColumn(name = "basket_id")
    private Basket basket;
    private int quantity;
}
