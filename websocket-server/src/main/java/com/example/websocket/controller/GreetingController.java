package com.example.websocket.controller;

import com.example.websocket.dto.Greeting;
import com.example.websocket.dto.HelloMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GreetingController {

    private final Logger logger = LoggerFactory.getLogger(GreetingController.class);

    private List<String> lstMessage = new ArrayList<>();

    @PutMapping("/put")
    public List<String> putGreet(HelloMessage message) throws InterruptedException {
        lstMessage.add(message.getName());
        return lstMessage;
    }


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public List<String> greet(HelloMessage message) throws InterruptedException {
        lstMessage.add(message.getName());
        return lstMessage;
    }

    @Scheduled(fixedRate = 2000)
    public void scheduleTaskWithFixedRate() {
        // call send email method here
        logger.info("Send email to producers to inform quantity sold items");
    }
}