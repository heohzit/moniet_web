package kr.or.iei.community.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.community.model.dao.CommunityDao;

@Service
public class CommunityService {

	@Autowired
	private CommunityDao communityDao;
	
	public List communityList(int reqPage) {
		List list = communityDao.communityList();
		return list;
	}

}
