package kr.or.iei.community.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.PageInfo;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityBoard;
import kr.or.iei.community.model.vo.CommunityBoardFile;
import kr.or.iei.community.model.vo.CommunityBoardType;
import kr.or.iei.community.model.vo.CommunityType;
import kr.or.iei.community.model.vo.ComuBoardComment;

@Mapper
public interface CommunityDao {

	List communityList(Map map);

	int insertCommunity(Community c);

	int insertCommunityType(CommunityType type);

	Community selectOneCommunity(Map map);
	
	List selectOneCommunityType(int communityNo);

	List communityBoardList(Map map);

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

	int insertCommunityLike(Map map);

	int removeCommunityLike(Map map);

	int insertBoardLike(Map map);

	int removeBoardLike(Map map);

	int updateLikeCount(int communityBoardNo);

	int downLikeCount(int communityBoardNo);

	int deleteCommunity(int communityNo);
	
	
	
	
	
	
	
	
	
	
	//관리자
	int totalCount();
	
	List allCommunityList(PageInfo pi);
	
	int modifyCommunityType(CommunityType type);

	int deleteCommunityType(Community c);

	int modifyCommunity(Community c);

	int insertParti(Map map);

	int updatePartiCount(int communityNo);

	int outParti(Map map);

	int downPartiCount(int communityNo);

	int communityTotalCount();




}
