package com.TFG.TFG.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class CatApiService {

    @Value("${cat-api-key}")
    private String apiKey;

    private final WebClient webClient;

    public CatApiService() {
        this.webClient = WebClient.create("https://api.thecatapi.com/v1/images/");
    }

    public Object getImages() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/search")
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(Object.class)
                .block();
    }  

    public Object getImagesLimit(int limit) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/search")
                        .queryParam("limit", limit)
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(Object.class)
                .block();
    }
    
}

