package com.example.fooddelivery.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService
{
    @Value("${spring.mail.username}")
    private String fromAddress;

    @Autowired
    JavaMailSender mailSender;

    public void sendMail(String email,String code,String subject,String heading,String message,int validMinutes)
    {
        try
        {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg,true,"UTF-8");

            helper.setFrom(fromAddress,"Food Delivery");
            helper.setTo(email);
            helper.setSubject(subject);

            String plainText = message + "\n\n Your code: " + code + "\n" + "It is valid for " + validMinutes + " minutes. Do not share this code with anyone.";

            helper.setText(plainText,buildHtml(heading,message,code,validMinutes));

            mailSender.send(msg);
        }
        catch (Exception e)
        {
            throw new RuntimeException("Failed to send email : ",e);
        }
    }

//    For Sign-Up
    public void signUpMail(String email,String code)
    {
        sendMail(email,code,"Your Food Delivery verification code","Registration","Use the code below to verify your account:",5);
    }

//    For Log-In
    public void logInMail(String email,String otp)
    {
        sendMail(email,otp,"Your Food Delivery OTP","Log in","Use the OTP below to verify your account:",5);
    }

//    Reset Password
    public void resetPasswordMail(String email,String code)
    {
        sendMail(email,code,"Your Food Delivery reset password code","Reset password","Use the code below to reset your account's password:",5);
    }

//    Change Password
    public void changePasswordMail(String email,String otp)
    {
        sendMail(email,otp,"Your Food Delivery change password OTP","Change password","Use the OTP below to change your account's password:",5);
    }

    private String buildHtml(String heading, String message, String code, int minutes)
    {
        return """
                <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;padding:24px;">
                      <h2 style="color:#f97316;margin:0 0 16px;">%s</h2>
                      <p style="color:#111827;font-size:14px;">
                      	    %s
                      </p>
                      <div style="text-align:center;margin:24px 0;">
                      	<span style="display:inline-block;background:#FFEDD5;color:#f97316;font-size:32px;font-weight:bold;letter-spacing:8px;padding:12px 24px;border-radius:8px;">
                      	    %s
                      	</span>
                      </div>
                      <p style="color:#374151;font-size:13px;">
                      	This code is valid for <b style="color:#f97316">%d minutes</b>.Never share it with anyone, our team will never ask for it.
                      </p>
                      <p style="color:#9ca3af;font-size:12px;">
                      	If you didn't request this, you can safely ignore this email.
                      </p>
                </div>
            """.formatted(heading, message, code, minutes);
    }

    @Async
    public void sendRegistrationMail(String toEmail, String name, String userCode, String password)
    {
        try
        {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress);
            helper.setTo(toEmail);
            helper.setSubject("Welcome! Your account details");
            helper.setText(buildHtml(name, userCode, password), true);

            mailSender.send(message);
        }
        catch(MessagingException e)
        {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String buildHtml(String name, String userCode, String password)
    {
        return """
            <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;
                        border:1px solid #e5e7eb;border-radius:8px;padding:24px;">
              <h2 style="color:#111827;">Welcome, %s 👋</h2>
              <p>Your account has been created successfully. Here are your login details:</p>
              <table style="width:100%%;border-collapse:collapse;margin:16px 0;">
                <tr>
                  <td style="padding:8px;background:#f3f4f6;"><b>User Code</b></td>
                  <td style="padding:8px;background:#f3f4f6;">%s</td>
                </tr>
                <tr>
                  <td style="padding:8px;"><b>Password</b></td>
                  <td style="padding:8px;">%s</td>
                </tr>
              </table>
              <p style="color:#b91c1c;">Please change your password after your first login.</p>
              <p>Regards,<br/>Your App Team</p>
            </div>
            """.formatted(name, userCode, password);
    }
}
