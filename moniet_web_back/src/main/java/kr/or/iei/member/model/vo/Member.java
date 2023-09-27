package kr.or.iei.member.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="member")
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberName;
	private int memberGender;
	private String memberPhone;
	private String memberEmail;
	private int memberGrade;
	private String regDate;
	private String memberProfile;
	private int socialLogin;
}
