package kr.or.iei.community.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="communityBoardType")
public class CommunityBoardType {

	private int communityBoardTypeNo;
	private int communityBoardNo;
	private int communityBoardTypeDiv;
	
}
