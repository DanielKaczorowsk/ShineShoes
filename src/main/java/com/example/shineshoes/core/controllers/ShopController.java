package com.example.shineshoes.core.controllers;
import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.dto.Product.SimpleLittleProductDTO;
import com.example.shineshoes.core.dto.Product.SimpleProductDTO;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.services.BasketServices;
import com.example.shineshoes.core.services.ProductServices;
import com.example.shineshoes.core.services.HomeServices;
import com.example.shineshoes.security.UserPrincipal;
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
    public ShopController (HomeServices homeServices, BasketServices basketServices, ProductServices productServices){
        this.homeServices = homeServices;
        this.basketServices = basketServices;
        this.productServices = productServices;
    }
    @GetMapping("/newproduct")
    public ResponseEntity<List<SimpleProductDTO>> newBoots()
    {
        List<SimpleProductDTO> newBoots = this.homeServices.getNewBoots();
        return ResponseEntity.ok(newBoots);
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
     * Controller function for adding products and their variants and adding existing variants
     * Data sent from the frontend with product data
     * @param productDTO data of product sent from the frontend
     * @return Reply http to frontend
     */
    @PostMapping(value = "/addproduct",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@RequestPart("managementDTO") ProductDTO productDTO)
                                            /*,
                                             @RequestPart("images") List<MultipartFile> images)*/
    {
            productServices.addProduct(productDTO);
            return ResponseEntity.ok(Map.of("message", "The product has been added for consideration!"));
    }
}
