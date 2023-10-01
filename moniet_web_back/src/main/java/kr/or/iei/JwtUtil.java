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
	
	//토큰 만료 체크 
	public boolean isExpired(String token, String secretKey) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody().getExpiration().before(new Date());
	}
	//토큰 정보를 이용해서 로그인한 회원 아이디 추출
	public String getMemberId(String token, String secretKey) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody().get("memberId",String.class);
	}
}
