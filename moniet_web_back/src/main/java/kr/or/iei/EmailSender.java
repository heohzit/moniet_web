package kr.or.iei;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
	@Autowired
	private JavaMailSender sender;

	public String sendPw(String memberEmail) {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		
		StringBuffer sb = new StringBuffer();
		
		Random r = new Random();
		
		for(int i=0; i<8; i++) { 
			
			int flag = r.nextInt(3);
			if(flag == 0) {
				int num = r.nextInt(10);
				sb.append(num);
			}else if(flag == 1) {
				char ch = (char)(r.nextInt(26)+65);
				sb.append(ch);
			}else if(flag == 2) {
				char ch = (char)(r.nextInt(26)+97);
				sb.append(ch);
			}
			
			try {
				helper.setSentDate(new Date());
				helper.setFrom(new InternetAddress("tnsgus1104@gmail.com", "머니어트"));
				helper.setTo(memberEmail);
				helper.setSubject("[머니어트] 임시 비밀번호가 생성되었습니다.");
				helper.setText("<h1>안녕하세요 머니어트 입니다.</h1>"
						+"<h3>임시비밀번호는 [<span style='color:#323673;'>"+sb.toString()+"</span>] 입니다. </h3>"
						,true);
				sender.send(message);
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		}
		return sb.toString();
	}
	

}
