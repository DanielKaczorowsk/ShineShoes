package com.example.shineshoes.core.repository;

import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.model.product.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;


@Repository
public interface VariantRepository extends JpaRepository<ProductVariant,Long>
{
    Optional<ProductVariant> findByProductAndColorAndSize(Product product,String color,BigDecimal size);
    ProductVariant getById(Long id);
}