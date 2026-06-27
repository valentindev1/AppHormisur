package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    private final Environment environment;

    public MailConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        String host = environment.getProperty("spring.mail.host", "smtp.hostinger.com");
        int port = environment.getProperty("spring.mail.port", Integer.class, 587);
        String username = getRequiredProperty("spring.mail.username", "MAIL_USER");
        String password = getRequiredProperty("spring.mail.password", "MAIL_PASS");

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", host);

        return mailSender;
    }

    private String getRequiredProperty(String primaryName, String fallbackName) {
        String value = environment.getProperty(primaryName);

        if (value == null || value.isBlank()) {
            value = environment.getProperty(fallbackName);
        }

        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Missing mail configuration: " + primaryName + " or " + fallbackName);
        }

        return value;
    }
}
