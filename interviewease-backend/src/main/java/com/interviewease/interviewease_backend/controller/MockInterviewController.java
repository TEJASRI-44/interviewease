package com.interviewease.interviewease_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "*")
public class MockInterviewController {

    private final RestTemplate restTemplate;

    @Autowired
    public MockInterviewController(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    // Endpoint to handle job description and generate questions
    @PostMapping("/jd")
    public ResponseEntity<?> generateQuestions(@RequestBody Map<String, String> jdMap) {
        String flaskUrl = "http://127.0.0.1:5000/generate-questions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(jdMap, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, request, Map.class);
        return ResponseEntity.ok(response.getBody());
    }

    // Endpoint to handle video upload and get AI feedback
    @PostMapping(value = "/feedback", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> getVideoFeedback(@RequestPart("video") MultipartFile video) throws IOException {
        String flaskUrl = "http://127.0.0.1:5000/video-feedback";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        File tempFile = File.createTempFile("response", ".webm");
        video.transferTo(tempFile);

        body.add("video", new FileSystemResource(tempFile));
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, requestEntity, Map.class);

        tempFile.delete(); // Clean up temp file
        return ResponseEntity.ok(response.getBody());
    }
}
