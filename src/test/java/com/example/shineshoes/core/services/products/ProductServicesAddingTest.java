package com.example.shineshoes.core.services.products;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.dto.Product.ProductVariantDTO;
import com.example.shineshoes.core.model.product.Category;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.model.product.ProductVariant;
import com.example.shineshoes.core.repository.CategoryRepository;
import com.example.shineshoes.core.repository.ProductRepository;
import com.example.shineshoes.core.repository.VariantRepository;
import com.example.shineshoes.core.services.ProductServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServicesAddingTest
{
    @Mock
    private ProductRepository productRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private VariantRepository variantRepository;

    @InjectMocks
    private ProductServices productServices;

    private ProductDTO productDTO;

    ProductVariantDTO productVariantDTO;

    @Captor
    private ArgumentCaptor<Product> captorProduct;

    @BeforeEach
    public void setupProduct()
    {
        productVariantDTO = ProductVariantDTO.builder().color("Green").size(BigDecimal.valueOf(44)).quantity(3).build();
        List<ProductVariantDTO> productVariantList = new ArrayList<>();
        productVariantList.add(productVariantDTO);
        List<String> category = new ArrayList<>();
        category.add("Sportowe");
        productDTO = ProductDTO.builder().name("Nike").model("AirMax")
                .description("Test Description")
                .price(BigDecimal.valueOf(300))
                .productVariantDTO(productVariantList)
                .category(category)
                .build();

    }
    private static void processEquals(Product saveProduct,ProductDTO productDTO,ProductVariantDTO productVariantDTO)
    {

        ProductVariant productVariant = saveProduct.getVariants().getFirst();
        assertEquals(productDTO.getName(),saveProduct.getName());
        assertEquals(productDTO.getModel(),saveProduct.getModel());
        assertEquals(productDTO.getPrice(),saveProduct.getPrice());
        assertEquals(productDTO.getDescription(),saveProduct.getDescription());
        assertEquals(productVariantDTO.getColor(),productVariant.getColor());
        assertEquals(productVariantDTO.getSize(),productVariant.getSize());
        assertEquals(productVariantDTO.getQuantity(),productVariant.getQuantity());

    }
    private static void checkingVariantProductRepository(ProductVariantDTO productVariantDTO,Product product,VariantRepository variantRepository){
        ProductVariant productVariant = new ProductVariant();
        productVariant.setProduct(product);
        productVariant.setSize(productVariantDTO.getSize());
        productVariant.setColor(productVariantDTO.getColor());
        productVariant.setQuantity(productVariantDTO.getQuantity());
        when(variantRepository.findByProductAndColorAndSize(product,productVariantDTO.getColor(),productVariantDTO.getSize())).thenReturn(Optional.of(productVariant));
    }
    @Test
    public void shouldCreateAndSaveNewProductWhenCategoryDoesNotExist()
    {

        when(categoryRepository.findByName("Sportowe")).thenReturn(Optional.empty());
        when(productRepository.save(any(Product.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(categoryRepository.save(any(Category.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        productServices.addProduct(productDTO);

        verify(variantRepository).save(any(ProductVariant.class));
        verify(categoryRepository).save(any(Category.class));
        verify(productRepository,times(2)).save(captorProduct.capture());

        Product saveProduct = captorProduct.getValue();

        processEquals(saveProduct,productDTO,productVariantDTO);
        assertEquals(productDTO.getCategory().getFirst(),saveProduct.getCategories().getFirst().getName());
    }
    @Test
    public void shouldCreateAndSaveNewProductWhenCategoryAlreadyExists()
    {
        Category existingCategory = new Category();
        existingCategory.setName("Sportowe");

        when(categoryRepository.findByName("Sportowe")).thenReturn(Optional.of(existingCategory));
        when(productRepository.save(any(Product.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        productServices.addProduct(productDTO);

        verify(productRepository,times(2)).save(captorProduct.capture());

        Product saveProduct = captorProduct.getValue();

        processEquals(saveProduct,productDTO,productVariantDTO);
        assertSame(existingCategory,saveProduct.getCategories().getFirst());
    }
}
