package com.example.shineshoes.core.services;

import com.example.shineshoes.core.dto.SimpleLittleProductDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.basket.Basket;
import com.example.shineshoes.core.model.product.ProductVariant;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.repository.BasketRepository;
import com.example.shineshoes.core.repository.UserRepository;
import com.example.shineshoes.core.repository.VariantRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class BasketServices
{
    private final VariantRepository variantRepository;
    private final BasketRepository basketRepository;
    private final UserRepository userRepository;

    /**
     * Services is adding new record to Basket
     * @param idUser id user
     * @param basketDTO data transfer object of product
     */
    @Transactional
    public void addToBasket(Long idUser, SimpleLittleProductDTO basketDTO)
    {
        Basket basket = basketRepository.findByUserId(idUser).orElseGet(()->{
                    Basket newBasket = new Basket();
                    User user = userRepository.findById(idUser).orElseThrow(() -> new ShopException(ErrorCode.USER_NOT_FOUND));
                    newBasket.withUser(user);
                    return newBasket;
                });


        ProductVariant variant = variantRepository.findById(basketDTO.idVariant()).orElseThrow(()->new ShopException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));

        basket.withProductVariant(variant, basketDTO.quantity());
        basketRepository.save(basket);
    }
}
