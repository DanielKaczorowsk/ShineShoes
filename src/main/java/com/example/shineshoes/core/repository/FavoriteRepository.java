package com.example.shineshoes.core.repository;

import com.example.shineshoes.core.dto.Product.SimpleProductDTO;
import com.example.shineshoes.core.model.favorite.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long>
{
    Optional<Favorite> findByUserId(Long id);
    @Query("""
            SELECT new com.example.shineshoes.core.dto.Product.SimpleProductDTO(fi.product.id,
                    fi.product.name,
                    fi.product.description,
                    fi.product.model,
                    fi.product.price,true) FROM Favorite f JOIN f.items fi WHERE f.user.id = :userId""")
    List<SimpleProductDTO> findProductByUserId(@Param("userId") Long id);
}
