package com.example.shineshoes.core.services;

import com.example.shineshoes.core.dto.Product.SimpleProductDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.model.favorite.Favorite;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.repository.FavoriteItemsRepository;
import com.example.shineshoes.core.repository.FavoriteRepository;
import com.example.shineshoes.core.repository.ProductRepository;
import com.example.shineshoes.core.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServices
{
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final ProductRepository productRepository;
    private final FavoriteItemsRepository favoriteItemsRespository;

    /**
     * Services is adding new record to Favorite
     * @param productId id product
     * @param userId id user
     */
    @Transactional
    public void addFavorite(Long productId,Long userId)
    {
        Favorite favorite = favoriteRepository.findByUserId(userId)
                .orElseGet(()->{
                    Favorite favoriteNew = new Favorite();
                    User user = userRepository.findById(userId).orElseThrow(()->new ShopException(ErrorCode.USER_NOT_FOUND));
                    favoriteNew.withUser(user);
                    return favoriteNew;
                });
        Product product = productRepository.findById(productId).orElseThrow(()->new ShopException(ErrorCode.PRODUCT_NOT_FOUND));
        favorite.withProduct(product);
        favoriteRepository.save(favorite);
    }
    /**
     * Services is delete  record from Favorite
     * @param productId id product
     * @param userId id user
     */
    @Transactional
    public void deleteFavorite(Long productId,Long userId)
    {
        favoriteItemsRespository.deleteByProductIdAndUserId(productId,userId);
    }
    @Transactional
    public List<SimpleProductDTO> favoritesProduct(Long idUser)
    {
        return favoriteRepository.findProductByUserId(idUser);
    }
}
