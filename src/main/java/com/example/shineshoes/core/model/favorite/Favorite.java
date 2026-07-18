package com.example.shineshoes.core.model.favorite;

import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.model.product.ProductVariant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name="favorite")
@Getter
@Setter
@NoArgsConstructor
public class Favorite
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "favorite", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FavoriteItem> items = new ArrayList<>();

    /**
     * Adds a product variant to the favorite or updates its quantity if it already exists.
     *
     * @param productVariant the product variant to add
     * @param quantity the quantity to increase by
     */
    public void withProductVariant(ProductVariant productVariant,int quantity)
    {
        for(FavoriteItem item : this.items)
        {
            if(item.getProductVariant().getId().equals(productVariant.getId()))
            {
                item.setQuantity(item.getQuantity()+quantity);
                return;
            }
        }
        FavoriteItem favoriteItem = new FavoriteItem();
        favoriteItem.setFavorite(this);
        favoriteItem.setProductVariant(productVariant);
        favoriteItem.setQuantity(quantity);
        this.items.add(favoriteItem);
    }
    /**
     * Associates the favorite with a specific user.
     *
     * @param user the user who owns this favorite
     */
    public void withUser(User user)
    {
        this.user = user;
    }
}
