package com.example.shineshoes.core.services;


import com.example.shineshoes.core.dto.SimpleProductDTO;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServices
{
    public final ProductRepository productRepository;
    @Transactional
    public List<SimpleProductDTO> getNewBoots()
    {
        return productRepository.findTop30ByOrderByCreatedAtDesc();
    }
    @Transactional
    public List<Product> getTopProduct(String name)
    {
        Pageable topTen = PageRequest.of(0, 30);
        return productRepository.findProductByCategoryWithTop(name,topTen);
    }
    @Transactional
        public List<String> findDistinctNames()
    {
        Pageable model = PageRequest.of(0, 30);
        return productRepository.findDistinctNames(model);
    }

}
