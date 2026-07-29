package com.example.shineshoes.core.builders.user.register;

import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import java.util.UUID;

@Component
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
    public void build(UserRegisterDTO userRegisterDTO)
    {
        try
        {
            String html = this.createTemplate(userRegisterDTO.getName());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(userRegisterDTO.getEmail());
            helper.setSubject("Weryfikacja Email");
            helper.setText(html,true);
            mailSender.send(message);
        }
        catch (MessagingException e)
        {
            throw new ShopException(ErrorCode.EMAIL_ERROR);
        }
    }
}
