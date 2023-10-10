package kr.or.iei.challenge.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="challenge")
public class Challenge {
	private int challengeNo;
	private int memberNo2;
	private String challengeTitle;
	private String challengeContent;
	private int challengeKind;
	private int challengeAmount;
	private String challengeStart;
	private String challengeEnd;
	private int challengeState;
	private int challengeResult;
	
	private String memberId;
}
