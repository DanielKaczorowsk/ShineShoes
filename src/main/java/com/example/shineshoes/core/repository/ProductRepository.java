package com.example.shineshoes.core.repository;

import com.example.shineshoes.core.dto.Product.SimpleProductDTO;
import com.example.shineshoes.core.model.product.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product,Long>
{
    Optional<Product> findByNameAndModel(String name,String model);

    @Query("SELECT p FROM Product p JOIN FETCH p.categories c WHERE c.name = :categoryName AND p.top = true ORDER BY p.createdAt DESC")
    List<Product> findProductByCategoryWithTop(@Param("categoryName") String categoryName, Pageable pageable);

    List<SimpleProductDTO> findTop30ByOrderByCreatedAtDesc();

    @Query("SELECT DISTINCT p.name FROM Product p")
    List<String> findDistinctNames(Pageable pageable);
}

