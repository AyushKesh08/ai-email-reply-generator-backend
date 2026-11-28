package com.email.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email.dtos.EmailRequest;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailService {
	
	private final WebClient webClient;
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	@Value("${gemini.api.url}")
	private String mainUrl;
	
	@Value("${gemini.api.key}")
	private String apiKey;
	
	public EmailService() {
	    this.webClient = WebClient.builder().build();
	}
	
	public String generateEmailResponse(EmailRequest emailRequest) {
		
		//Make a prompt...
		String prompt = buildPrompt(emailRequest);
		
		//Prepare raw json...
		Map<String, Object> requestBody = Map.of(
													"model", "gemini-3.8-flash",
													"input", prompt
												);
		
		//Send Request...
		String response = webClient.post()
			.uri(mainUrl)
			.header("x-goog-api-key", apiKey)
			.header("Content-Type", "application/json")
			.bodyValue(requestBody)
			.retrieve()
			.bodyToMono(String.class)
			.block();
		
		return ResponseContent(response);
	}
	
	//Response...
	private String ResponseContent(String response) {
	    try {
	        JsonNode root = objectMapper.readTree(response);
	
	        JsonNode steps = root.path("steps");
	
	        for (JsonNode step : steps) {
	            JsonNode contents = step.path("content");
	
	            for (JsonNode content : contents) {
	                if ("text".equals(content.path("type").asText())) {
	                    String text = content.path("text").asText();
	
	                    if (!text.isBlank()) {
	                        return text;
	                    }
	                }
	            }
	        }
	
	        throw new RuntimeException(
	            "Error in generated text response: " + response
	        );
	
	    } catch (Exception e) {
	        throw new RuntimeException(
	            "Error in getting generated text: " + e.getMessage(), e
	        );
	    }
	}
	
	private String buildPrompt(EmailRequest emailRequest) {
	
		StringBuilder prompt = new StringBuilder();
		prompt.append("Generate a professional email reply for the following email.");
		
		if(emailRequest.getTone() != null && emailRequest.getTone().isBlank()) 
			prompt.append("Use a").append(emailRequest.getTone()).append("tone");
		
		prompt.append("Original Email: \n").append(emailRequest.getEmailContent());
		
		return prompt.toString();
	}
}
