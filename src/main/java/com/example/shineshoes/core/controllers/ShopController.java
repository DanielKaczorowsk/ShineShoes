package com.example.shineshoes.core.controllers;
import com.example.shineshoes.core.dto.ManagementDTO;
import com.example.shineshoes.core.dto.SimpleLittleProductDTO;
import com.example.shineshoes.core.dto.SimpleProductDTO;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.services.ManagementProduct;
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
@CrossOrigin(origins = "http://localhost:3000" , allowCredentials = "true")
public class ShopController
{
    private final HomeServices services;
    private final ManagementProduct managementProduct;
    public ShopController (HomeServices service, ManagementProduct managementProduct){this.services = service;
        this.managementProduct = managementProduct;
    }
    @GetMapping("/newproduct")
    public ResponseEntity<List<SimpleProductDTO>> newBoots()
    {
        List<SimpleProductDTO> newBoots = this.services.getNewsBoots();
        return ResponseEntity.ok(newBoots);
    }
    @GetMapping("/names")
    public ResponseEntity<List<String>> allNames()
    {
        List<String> allModels = this.services.findDistinctNames();
        return ResponseEntity.ok(allModels);
    }
    @PostMapping("/top/{name}")
    public ResponseEntity<List<Product>> topBoots(@PathVariable String name)
    {
        List<Product> topSneakers = this.services.getTopProduct(name);
        return ResponseEntity.ok(topSneakers);
    }
    @PostMapping("/basket/add")
    public ResponseEntity<?> addToBasket(@RequestBody SimpleLittleProductDTO basket,
                                         @AuthenticationPrincipal UserPrincipal currentUser)
    {
        Long userId = currentUser.getId();

        return ResponseEntity.ok(Map.of("message", "Product added to cart"));
    }
    /*@PostMapping("/models")
    public ResponseEntity<List<Product>> getNewsBoots()
    {
        List<Product> allModels = this.services.getNewsBoots();
        return ResponseEntity.ok(allModels);
    }*/
    /**
     * Controller function for adding products and their variants and adding existing variants
     * Data sent from the frontend with product data
     * @param managementDTO data of product sent from the frontend
     * @return Reply http to frontend
     */
    @PostMapping(value = "/addproduct",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addProduct(@RequestPart("managementDTO") ManagementDTO managementDTO)
                                            /*,
                                             @RequestPart("images") List<MultipartFile> images)*/
    {
            managementProduct.addProduct(managementDTO);
            return ResponseEntity.ok(Map.of("message", "The product has been added for consideration!"));
    }
}
