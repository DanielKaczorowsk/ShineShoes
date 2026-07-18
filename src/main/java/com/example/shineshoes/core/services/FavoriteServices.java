package com.example.shineshoes.core.services;

import com.example.shineshoes.core.dto.SimpleLittleProductDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.model.favorite.Favorite;
import com.example.shineshoes.core.model.product.ProductVariant;
import com.example.shineshoes.core.repository.FavoriteRepository;
import com.example.shineshoes.core.repository.UserRepository;
import com.example.shineshoes.core.repository.VariantRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteServices
{
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final VariantRepository productVariantRepository;
    /**
     * Services is adding new record to Favorite
     * @param idUser id user
     * @param basketDTO data transfer object of product
     */
    @Transactional
    public void addFavorite(Long idUser, SimpleLittleProductDTO basketDTO)
    {
        Favorite favorite = favoriteRepository.findByUserId(idUser)
                .orElseGet(()->{
                    Favorite favoriteNew = new Favorite();
                    User user = userRepository.findById(idUser).orElseThrow(()->new ShopException(ErrorCode.USER_NOT_FOUND));
                    favoriteNew.withUser(user);
                    return new Favorite();
                });
        ProductVariant productVariant = productVariantRepository.findById(basketDTO.idVariant()).orElseThrow(()->new ShopException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        favorite.withProductVariant(productVariant, basketDTO.quantity());
        favoriteRepository.save(favorite);
    }
}
