package kr.or.iei.community.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.community.model.dao.CommunityDao;
import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityType;

@Service
public class CommunityService {

	@Autowired
	private CommunityDao communityDao;
	
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

}
