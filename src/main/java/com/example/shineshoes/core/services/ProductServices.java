package com.example.shineshoes.core.services;

import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.model.product.Category;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.model.product.ProductVariant;
import com.example.shineshoes.core.repository.CategoryRepository;
import com.example.shineshoes.core.repository.ProductRepository;
import com.example.shineshoes.core.repository.VariantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j

public class ProductServices
{
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final CategoryRepository categoryRepository;
    /**
     * Adds a product and a list of its variants to the database.
     * Updates quantities if the variant already exists.
     * @param productDTO product data with variant list
     */
    @Transactional

    /*public List<String> sendImg(List<MultipartFile> files)
    {
        files
    }
    */

    public void addProduct(ProductDTO productDTO)
    {

        Product product = productRepository.findByNameAndModel(productDTO.getName(), productDTO.getModel()).orElseGet(()->{
            Product newProduct = new Product();
            newProduct.setName(productDTO.getName());
            newProduct.setDescription(productDTO.getDescription());
            newProduct.setModel(productDTO.getModel());
            newProduct.setPrice(productDTO.getPrice());
            newProduct.setTop(false);
            newProduct.setCreatedAt(LocalDateTime.now());
            return productRepository.save(newProduct);
        });

        List<Category> categories = productDTO.getCategory().stream()
                .map(name ->categoryRepository.findByName(name)
                        .orElseGet(()->{
                            Category newCategory = new Category();
                            newCategory.setName(name);
                            return categoryRepository.save(newCategory);
                        })).collect(Collectors.toList());
        product.setCategories(categories);

        productDTO.getProductVariantDTO()
            .forEach(variant -> variantRepository.
                findByProductAndColorAndSize(product,variant.getColor(),variant.getSize())
                    .ifPresentOrElse((existingVariant)->
                            {
                                int q = existingVariant.getQuantity() + variant.getQuantity();
                                existingVariant.setQuantity(q);
                                variantRepository.save(existingVariant);
                            },
                            ()->{
                                ProductVariant newproductVariant = new ProductVariant();
                                newproductVariant.setProduct(product);
                                newproductVariant.setColor(variant.getColor());
                                newproductVariant.setSize(variant.getSize());
                                newproductVariant.setQuantity(variant.getQuantity());
                                product.getVariants().add(newproductVariant);
                                variantRepository.save(newproductVariant);
                }));
        productRepository.save(product);
    }
}
