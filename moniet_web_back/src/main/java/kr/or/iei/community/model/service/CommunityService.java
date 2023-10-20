package kr.or.iei.community.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.PageInfo;
import kr.or.iei.Pagination;
import kr.or.iei.community.model.dao.CommunityDao;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityBoard;
import kr.or.iei.community.model.vo.CommunityBoardFile;
import kr.or.iei.community.model.vo.CommunityBoardType;
import kr.or.iei.community.model.vo.CommunityType;
import kr.or.iei.community.model.vo.ComuBoardComment;
import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.vo.Member;

@Service
public class CommunityService {

	@Autowired
	private CommunityDao communityDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private Pagination pagination;
	
	public List communityList(int reqPage, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("reqPage", reqPage);
		map.put("memberNo", member.getMemberNo());
		
		List list = communityDao.communityList(map);
		return list;
	}

	@Transactional
	public int insertCommunity(Community c, String communityType) {
		
		System.out.println(c);
		System.out.println("서비스에서 스플릿 전 : "+communityType);
		
		int result = communityDao.insertCommunity(c);
		
		if (result > 0) {
			if(!communityType.equals("")) {
				String[] arr = communityType.split("/");
				int[] typeArr = new int[arr.length];
				System.out.println(communityType);
				for(int i = 0; i < typeArr.length; i++) {
					typeArr[i] = Integer.parseInt(arr[i]);
					
					CommunityType type = new CommunityType();
					type.setCommunityNo(c.getCommunityNo());
					type.setCommunityTypeDiv(typeArr[i]);
					System.out.println(type);
					result += communityDao.insertCommunityType(type);
				}
			}
			return result;
		} else {
			return 0;
		}
	}

	public Community selectOneCommunity(int communityNo, String memberId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberId", memberId);
		System.out.println("map : "+map);
		Community c = communityDao.selectOneCommunity(map);
		return c;
	}

	public List communityBoardList(int reqPage, int communityNo, String memberId) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberId", memberId);
		List list = communityDao.communityBoardList(map);
		return list;
	}

	@Transactional
	public int insertBoard(CommunityBoard c, ArrayList<CommunityBoardFile> fileList) {
		
		Member member = memberDao.selectOneMember(c.getMemberId());
		c.setCommunityBoardWriter(member.getMemberNo());
		
		int result = communityDao.insertBoard(c);
		for (CommunityBoardFile communityBoardFile : fileList) {
			communityBoardFile.setCommunityBoardNo(c.getCommunityBoardNo());
			result += communityDao.insertBoardFile(communityBoardFile);
		}
		
		System.out.println(result);
		
		if(result == 1+fileList.size()) {
			
			String stringType = String.valueOf(c.getCommunityBoardTypeList().get(0));
			int intType = Integer.parseInt(stringType);
			
//			int typeList = (Integer)c.getCommunityBoardTypeList().get(0);
			
			CommunityBoardType type = new CommunityBoardType();
			type.setCommunityBoardNo(c.getCommunityBoardNo());
			type.setCommunityBoardTypeDiv(intType);
			result += communityDao.insertCommunityBoardType(type);
			return result;
		}else {
			return 0;
		}
	}

	public List boardCommentList(int reqPage, int communityBoardNo) {
		List list = communityDao.boardCommentList(communityBoardNo);
		return list;
	}

	@Transactional
	public int insertBoardComment(ComuBoardComment c) {
		Member member = memberDao.selectOneMember(c.getMemberId());
		c.setComuBoardCommentWriter(member.getMemberNo());
		System.out.println("service : "+c);
//		String comuBoardCommentRefString = c.getComuBoardCommentRef() == 0 ? null : String.valueOf(c.getComuBoardCommentRef());
//		int comuBoardCommentRef = Integer.parseInt(comuBoardCommentRefString);
//		Object comuBoardCommentRef = comuBoardCommentRefString;
//		c.setComuBoardCommentRef(comuBoardCommentRefString);
		
//		int comuBoardCommentRef = Integer.parseInt(comuBoardCommentRefString);
//		c.setComuBoardCommentRef(comuBoardCommentRef);
//		System.out.println("c : "+c);
		
		int result = communityDao.insertBoardComment(c);
		return result;
	}

	public List recommentList(ComuBoardComment cbc) {
		
		List list = communityDao.recommentList(cbc);
		System.out.println("cbc : "+cbc);
		return list;
	}

	@Transactional
	public int boardlike(CommunityBoard c, int communityBoardNo) {
		System.out.println("service c : "+c);
		System.out.println("service communityBoardNo : "+c);
//		int result = communityDao.boardlike(c, communityBoardNo);
		return 0;
	}

	@Transactional
	public int removeComment(int comuBoardCommentNo) {
		int result = communityDao.removeComment(comuBoardCommentNo);
		return result;
	}

	@Transactional
	public List<CommunityBoardFile> delete(int communityBoardNo) {
		List<CommunityBoardFile> fileList = communityDao.selectBoardFileList(communityBoardNo);
		List<CommunityBoardType> typeList = communityDao.selectBoardTypeList(communityBoardNo);
		int result = communityDao.deleteBoard(communityBoardNo);
		if(result > 0) {
			return fileList;
		}
		return null;
	}

	@Transactional
	public int insertCommunityLike(int communityNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberNo", member.getMemberNo());
		
		int result = communityDao.insertCommunityLike(map);
		return result;
	}

	@Transactional
	public int removeCommunityLike(int communityNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberNo", member.getMemberNo());
		int result = communityDao.removeCommunityLike(map);
		return result;	}

	@Transactional
	public int insertBoardLike(int communityBoardNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityBoardNo", communityBoardNo);
		map.put("memberNo", member.getMemberNo());
		int result = communityDao.insertBoardLike(map);
		int updateLikeCount = communityDao.updateLikeCount(communityBoardNo);
		return result;
	}

	@Transactional
	public int removeBoardLike(int communityBoardNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityBoardNo", communityBoardNo);
		map.put("memberNo", member.getMemberNo());
		int result = communityDao.removeBoardLike(map);
		int downLikeCount = communityDao.downLikeCount(communityBoardNo);
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//관리자
	public Map allCommunityList(int reqPage) {
		int numPerPage = 2; //한 페이지당 게시물 수
		int pageNaviSize = 3;
		int totalCount = communityDao.totalCount(); //전체페이지수 
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List communityList = communityDao.allCommunityList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityList", communityList);
		map.put("pi",pi);
		return map;
	}

	@Transactional
	public int deleteCommunity(int communityNo) {
		int result = communityDao.deleteCommunity(communityNo);
		return result;
	}

	public int modifyCommunity(Community c, String communityType) {
		int result = communityDao.deleteCommunityType(c);
		
		if (result > 0) {
			
			String[] arr = communityType.split("/");
			int[] typeArr = new int[arr.length];
			
			for(int i = 0; i < typeArr.length; i++) {
				typeArr[i] = Integer.parseInt(arr[i]);
				
				CommunityType type = new CommunityType();
				type.setCommunityNo(c.getCommunityNo());
				type.setCommunityTypeDiv(typeArr[i]);
				result += communityDao.modifyCommunityType(type);
				result += communityDao.modifyCommunity(c);
			}
			return 1;
		} else {
			return 0;
		}
	}

	@Transactional
	public int insertParti(int communityNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberNo", member.getMemberNo());
				
		int result = communityDao.insertParti(map);
		int updatePartiCount = communityDao.updatePartiCount(communityNo);
		return result;
	}

	public int outParti(int communityNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("communityNo", communityNo);
		map.put("memberNo", member.getMemberNo());
		
		int result = communityDao.outParti(map);
		int downPartiCount = communityDao.downPartiCount(communityNo);
		return result;
	}

	
	@Transactional
	public boolean checkDelete(String community) {
	StringTokenizer sT1 = new StringTokenizer(community,"/");
	boolean result = true;
		while(sT1.hasMoreTokens()) {
			int communityNo = Integer.parseInt(sT1.nextToken());
			int deleteResult = deleteCommunity(communityNo);
			if(deleteResult == 0) {
				result = false;
				break;
			}
		}
		return result;
		 
	}
	


}
