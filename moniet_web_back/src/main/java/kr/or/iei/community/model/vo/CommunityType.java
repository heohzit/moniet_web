package kr.or.iei.community.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="communityType")
public class CommunityType {
	
	private int communityTypeNo;
	private int communityNo;
	private int communityTypeDiv;
	
}
