package com.example.shineshoes.core.builders.user.register;

import com.example.shineshoes.core.dto.UserDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class VerifyRegisterBuilder implements RegisterBuilderInterface
{
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private String createTemplate(String name)
    {
        UUID verifyToken = UUID.randomUUID();
        String link = "${app.cors.allowed-origins}/activate?token=" + verifyToken;
        Context context = new Context();
        context.setVariable("token",link);
        return templateEngine.process("email/ActiveAccount.html",context);
    }
    @Override
    @Async
    public void build(UserDTO dto)
    {
        try
        {
            String html = this.createTemplate(dto.getName());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(dto.getEmail());
            helper.setSubject("Weryfikacja Email");
            helper.setText(html,true);
            mailSender.send(message);
        }
        catch (MessagingException e)
        {
            log.error(e.getMessage());
            throw new ShopException(ErrorCode.EMAIL_ERROR);
        }
        catch (Exception e)
        {
            log.error("Błąd krytyczny podczas wysyłki: ", e);
            throw new RuntimeException(e);
        }
    }
}
