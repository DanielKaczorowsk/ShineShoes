package com.example.shineshoes.core.model.favorite;

import com.example.shineshoes.core.model.product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="favorite_items",
        uniqueConstraints = {
        @UniqueConstraint(name="uc_product_id_favorite_id",columnNames = {"product_id","favorite_id"})
        })
@NoArgsConstructor
@Getter
@Setter
public class FavoriteItem
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name="favorite_id")
    private Favorite favorite;

}
