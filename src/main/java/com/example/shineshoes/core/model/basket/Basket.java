package com.example.shineshoes.core.model.basket;

import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.model.product.ProductVariant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Basket")
@NoArgsConstructor
@Getter
@Setter
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "basket", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BasketItem> items = new ArrayList<>();
    /**
     * Adds a product variant to the basket or updates its quantity if it already exists.
     *
     * @param productVariant the product variant to add
     * @param quantity the quantity to increase by
     */
    public void withProductVariant(ProductVariant productVariant, int quantity) {
        for (BasketItem item : this.items)
        {
            if (item.getProductVariant().getId().equals(productVariant.getId()))
            {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        BasketItem basketitem = new BasketItem();
        basketitem.setBasket(this);
        basketitem.setProductVariant(productVariant);
        basketitem.setQuantity(quantity);
        this.items.add(basketitem);
    }
    /**
     * Associates the basket with a specific user.
     *
     * @param user the user who owns this basket
     */
    public void withUser(User user) {
        this.user = user;
    }
}
