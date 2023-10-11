package kr.or.iei.community.model.vo;

import lombok.Data;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="communityBoardFile")
public class CommunityBoardFile {

	private int communityBoardFileNo;
	private int communityBoardNo;
	private String filename;
	private String filepath;
	
}
