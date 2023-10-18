package kr.or.iei.community.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityBoard;
import kr.or.iei.community.model.vo.CommunityBoardFile;
import kr.or.iei.community.model.vo.CommunityBoardType;
import kr.or.iei.community.model.vo.CommunityType;
import kr.or.iei.community.model.vo.ComuBoardComment;

@Mapper
public interface CommunityDao {

	List communityList();

	int insertCommunity(Community c);

	int insertCommunityType(CommunityType type);

	Community selectOneCommunity(int communityNo);
	
	List selectOneCommunityType(int communityNo);

	List communityBoardList(int communityNo);

	int insertBoard(CommunityBoard c);

	int insertBoardFile(CommunityBoardFile communityBoardFile);

	int insertCommunityBoardType(CommunityBoardType type);

	List boardCommentList(int communityBoardNo);

	int insertBoardComment(ComuBoardComment c);

	List recommentList(ComuBoardComment cbc);

	int boardlike(CommunityBoard c, int communityBoardNo);

	int removeComment(int comuBoardCommentNo);

	List<CommunityBoardFile> selectBoardFileList(int communityBoardNo);

	List<CommunityBoardType> selectBoardTypeList(int communityBoardNo);

	int deleteBoard(int communityBoardNo);

	int insertCommunityLike(int communityNo, int memberNo);

	int removeCommunityLike(int communityNo, int memberNo);

}
