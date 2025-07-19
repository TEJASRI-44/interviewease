package com.interviewease.interviewease_backend;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.interviewease.interviewease_backend.model.Internship;
import com.interviewease.interviewease_backend.model.InterviewSlot;
import com.interviewease.interviewease_backend.repository.InternshipRepository;
import com.interviewease.interviewease_backend.repository.InterviewSlotRepository;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class IntervieweaseBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntervieweaseBackendApplication.class, args);
    }

    // ✅ Bean method for slots
    @Bean
    CommandLineRunner loadSlots(InterviewSlotRepository slotRepo) {
        return args -> {
            if (slotRepo.count() == 0) {
                slotRepo.saveAll(List.of(
                    new InterviewSlot(null, "2025-07-01", "10:00", false, null),
                    new InterviewSlot(null, "2025-07-01", "11:00", false, null),
                    new InterviewSlot(null, "2025-07-01", "12:00", false, null)
                ));
            }
        };
    }

    // ✅ Bean method for internships
    @Bean
    CommandLineRunner loadInternships(InternshipRepository internshipRepo) {
        return args -> {
            if (internshipRepo.count() == 0) {
                internshipRepo.saveAll(List.of(
                    new Internship(null, "Frontend Developer", "CodeLabs", "Hyderabad", "remote", "React, JavaScript"),
                    new Internship(null, "Backend Developer", "TechWave", "Hyderabad", "in-office", "Spring, Java"),
                    new Internship(null, "ML Intern", "AI Inc", "Remote", "remote", "Python, ML, Flask")
                ));
            }
        };
    }
    @Bean
    public WebMvcConfigurer configurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/resumes/**")
                        .addResourceLocations("file:resumes/");
            }
        };
    }
    @Configuration
    public class AppConfig {

        @Bean
        public RestTemplate restTemplate(RestTemplateBuilder builder) {
            return builder.build();
        }
    }

}
