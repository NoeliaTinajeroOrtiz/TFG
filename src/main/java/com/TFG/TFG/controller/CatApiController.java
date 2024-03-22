package com.TFG.TFG.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TFG.TFG.services.CatApiService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class CatApiController {

    private final CatApiService catApiService;

    @Autowired
    public CatApiController(CatApiService catApiService) {
        this.catApiService = catApiService;
    }

    @GetMapping("/cat/image")
    public Object getImages() {
        return catApiService.getImages();
    }  
    
    @GetMapping("/cat/images")
    public Object getImagesLimit(@RequestParam(defaultValue = "10") int limit) {
        return catApiService.getImagesLimit(limit);
    } 
}


