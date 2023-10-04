package kr.or.iei.community.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="community")
public class Community {

	private int communityNo;
	private int memberNo;
	private String communityTitle;
	private String communitySubTitle;
	private String communityContent;
	private String communityDate;
	private String communityThumb;
	private int communityStatus;
	private int communityParti;
	
}