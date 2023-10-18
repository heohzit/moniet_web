package kr.or.iei.community.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="communityBoard")
public class CommunityBoard {

	private int communityBoardNo;
	private int communityBoardWriter;
	private String communityBoardContent;
	private String communityBoardDate;
	private int communityRef;
	private int communityBoardRef;
	private int communityBoardLike;
	
	private int isLike;
	private int likeCount;
	
	private List fileList;
	private String memberId;
	private List communityBoardTypeList;
	
	private int comuBoardCommentCount;
	
}
