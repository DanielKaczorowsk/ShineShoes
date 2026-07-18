package com.example.shineshoes.core.repository;

import com.example.shineshoes.core.model.favorite.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long>
{
    Optional<Favorite> findByUserId(Long id);
}
