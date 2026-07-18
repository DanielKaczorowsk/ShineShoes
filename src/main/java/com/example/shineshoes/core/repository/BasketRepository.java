package com.example.shineshoes.core.repository;
import com.example.shineshoes.core.model.basket.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BasketRepository extends JpaRepository<Basket, Long>
{
    Optional<Basket> findByUserId(Long id);
}