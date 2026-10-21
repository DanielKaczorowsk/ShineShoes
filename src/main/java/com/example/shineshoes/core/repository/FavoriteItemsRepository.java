package com.example.shineshoes.core.repository;

import com.example.shineshoes.core.model.favorite.FavoriteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface FavoriteItemsRepository extends JpaRepository<FavoriteItem,Long>
{
    void deleteByProduct_Id(Long product_id);
    @Modifying
    @Query("DELETE FROM FavoriteItem fi WHERE fi.product.id = :productId AND fi.favorite.id IN (SELECT f.id FROM Favorite f WHERE f.user.id = :userId)")
    void deleteByProductIdAndUserId(@Param("productId") Long productId,@Param("userId") Long userId);
}
