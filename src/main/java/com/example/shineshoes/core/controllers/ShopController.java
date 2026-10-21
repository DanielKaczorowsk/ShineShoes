package com.example.shineshoes.core.controllers;
import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.dto.Product.SimpleLittleProductDTO;
import com.example.shineshoes.core.dto.Product.SimpleProductDTO;
import com.example.shineshoes.core.dto.Product.UpdateProductDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.services.BasketServices;
import com.example.shineshoes.core.services.FavoriteServices;
import com.example.shineshoes.core.services.ProductServices;
import com.example.shineshoes.core.services.HomeServices;
import com.example.shineshoes.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/shopSite")
@CrossOrigin(origins = "${app.cors.allowed-origins}", allowCredentials = "true")
public class ShopController
{
    private final HomeServices homeServices;
    private final BasketServices basketServices;
    private final ProductServices productServices;
    private final FavoriteServices favoriteServices;
    public ShopController (HomeServices homeServices, BasketServices basketServices, ProductServices productServices, FavoriteServices favoriteServices){
        this.homeServices = homeServices;
        this.basketServices = basketServices;
        this.productServices = productServices;
        this.favoriteServices = favoriteServices;
    }
    @GetMapping("/newestData")
    public ResponseEntity<List<SimpleProductDTO>> newBoots(@AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long userId = (currentUser != null) ? currentUser.getId() : null;
        List<SimpleProductDTO> newBoots = this.homeServices.getNewBoots(userId);
        return ResponseEntity.ok(newBoots);
    }
    @GetMapping("/favorites/get")
    public ResponseEntity<List<SimpleProductDTO>> favoritesProduct(@AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long idUser = currentUser.getId();
        List<SimpleProductDTO> favoritesProduct = favoriteServices.favoritesProduct(idUser);
        return ResponseEntity.ok(favoritesProduct);
    }
    @GetMapping("/names")
    public ResponseEntity<List<String>> allNames()
    {
        List<String> allModels = this.homeServices.findDistinctNames();
        return ResponseEntity.ok(allModels);
    }
    @GetMapping("/top/{name}")
    public ResponseEntity<List<Product>> topBoots(@PathVariable String name)
    {
        List<Product> topSneakers = this.homeServices.getTopProduct(name);
        return ResponseEntity.ok(topSneakers);
    }
    /**
     * Controller function for adding products and their variants to basket
     * Data sent from the frontend with product data
     * @param basket data of product sent from the frontend
     * @param currentUser id users
     * @return Reply http to frontend
     */
    @PostMapping("/basket/add")
    public ResponseEntity<?> addToBasket(@RequestBody SimpleLittleProductDTO basket,
                                         @AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long userId = currentUser.getId();
        basketServices.addToBasket(userId,basket);
        return ResponseEntity.ok(Map.of("message", "Product added to cart"));
    }
    /**
     * Controller function for adding products and product to favorites list
     * Data sent from the frontend with product data
     * @param idProduct id of product sent from the frontend
     * @param currentUser id users
     * @return Reply http to frontend
     */
    @PostMapping("/favorites/add/{idProduct}")
    public  ResponseEntity<?> addToFavorites(@PathVariable Long idProduct, @AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long userId = currentUser.getId();
        favoriteServices.addFavorite(idProduct,userId);
        return ResponseEntity.ok(Map.of("message","Product added to favorite"));
    }
    /**
     * Controller function for delete product from favorites list
     * @param idProduct id of product sent from the frontend
     * @param currentUser id users
     * @return None
     */
    @DeleteMapping("/favorites/delete/{idProduct}")
    public ResponseEntity<Void> deleteFavoriteItems(@PathVariable Long idProduct,@AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long userId = currentUser.getId();
        favoriteServices.deleteFavorite(idProduct,userId);
        return ResponseEntity.noContent().build();
    }
    /**
     * Controller function for adding products and their variants and adding existing variants
     * Data sent from the frontend with product data
     * @param productDTO data of product sent from the frontend
     * @return Reply http to frontend
     */
    @PostMapping(value = "/addproduct",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@Valid @RequestPart("managementDTO") ProductDTO productDTO)
                                            /*,
                                             @RequestPart("images") List<MultipartFile> images)*/
    {
            productServices.addProduct(productDTO);
            return ResponseEntity.ok(Map.of("message", "The product has been added for consideration!"));
    }
    /**
     * Controller function for update products and their variants and adding existing variants
     * Data sent from the frontend with product data
     * @param updateProductDTO data of product sent from the frontend
     * @return Reply http to frontend
     */
    @PatchMapping(value = "/updateproduct",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@Valid @RequestPart("managementDTO") UpdateProductDTO updateProductDTO)
    {
        productServices.updateProduct(updateProductDTO);
        return ResponseEntity.ok(Map.of("message","Update Successes"));
    }
    /**
     * Controller function for delete product
     * @param idProduct id product
     * @return None
     */
    @DeleteMapping(value = "/product/delete/{idProduct}")
    public ResponseEntity<Void> deleteItemProduct(@PathVariable long idProduct)
    {
        productServices.deleteProduct(idProduct);
        return ResponseEntity.noContent().build();
    }
}
