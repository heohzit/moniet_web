package kr.or.iei.community.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.community.model.dao.CommunityDao;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityBoard;
import kr.or.iei.community.model.vo.CommunityBoardFile;
import kr.or.iei.community.model.vo.CommunityBoardType;
import kr.or.iei.community.model.vo.CommunityType;
import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.vo.Member;

@Service
public class CommunityService {

	@Autowired
	private CommunityDao communityDao;
	
	@Autowired
	private MemberDao memberDao;
	
	public List communityList(int reqPage) {
		List list = communityDao.communityList();
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

	public Community selectOneCommunity(int communityNo) {
		Community c = communityDao.selectOneCommunity(communityNo);
		return c;
	}

	public List communityBoardList(int reqPage, int communityNo) {
		List list = communityDao.communityBoardList(communityNo);
		return list;
	}

	@Transactional
	public int insertBoard(CommunityBoard c, ArrayList<CommunityBoardFile> fileList) {
		System.out.println(c);
		System.out.println(fileList);
		
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

}
