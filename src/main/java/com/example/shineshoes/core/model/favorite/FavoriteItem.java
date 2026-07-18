package com.example.shineshoes.core.model.favorite;

import com.example.shineshoes.core.model.product.ProductVariant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="FavoriteItem")
@NoArgsConstructor
@Getter
@Setter
public class FavoriteItem
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="product_variant_id")
    private ProductVariant productVariant;

    @ManyToOne
    @JoinColumn(name="favorite_id")
    private Favorite favorite;

    private int quantity;
}
