package kr.or.iei.community.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="comuBoardComment")
public class ComuBoardComment {

	private int comuBoardCommentNo;
	private int comuBoardCommentWriter;
	private String comuBoardCommentContent;
	private	String comuBoardCommentDate;
	private int comuBoardRef;
	private int comuBoardCommentRef;
	
	private String memberId;
}
