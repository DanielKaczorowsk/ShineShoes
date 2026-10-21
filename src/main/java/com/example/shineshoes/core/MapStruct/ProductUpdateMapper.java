package com.example.shineshoes.core.MapStruct;

import com.example.shineshoes.core.dto.Product.ProductVariantDTO;
import com.example.shineshoes.core.dto.Product.UpdateProductDTO;
import com.example.shineshoes.core.model.product.Category;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.model.product.ProductVariant;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ProductUpdateMapper
{
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "variants",source = "productVariantDTO")
    Product toEntity(UpdateProductDTO dto);

    @Mapping(target = "category",source = "categories")
    @Mapping(target = "productVariantDTO",source = "variants")
    UpdateProductDTO toDTO(Product product);

    @Mapping(target = "categories",ignore = true)
    @Mapping(target = "variants",source = "productVariantDTO")
    void updateEntityFromDto(UpdateProductDTO updateProductDTO, @MappingTarget Product product);

    @AfterMapping
    default void linkVariants(@MappingTarget Product product) {
        if (product.getVariants() != null) {
            product.getVariants().forEach(variant -> variant.setProduct(product));
        }
    }
    default String mapCategoryToString(Category category)
    {
        if(category == null){
            return null;
        }
        return category.getName();
    }
    ProductVariant toProductVariant(ProductVariantDTO dto);
    ProductVariantDTO toProductVariantDTO(ProductVariant entity);
}
