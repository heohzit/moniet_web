package kr.or.iei;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	//암호화 토큰 생성 
	//로그인한 아이디,암호화코드(jwt enc key),로그인유지 시간
	public String createToken(String memberId, String secretKey, long expiredMs) {
		System.out.println(memberId);
		System.out.println(secretKey);
		System.out.println(expiredMs);
		
		Claims claims = Jwts.claims();
		claims.put("memberId",memberId);
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+expiredMs))
				.signWith(key,SignatureAlgorithm.HS256)
				.compact();
	}
}
