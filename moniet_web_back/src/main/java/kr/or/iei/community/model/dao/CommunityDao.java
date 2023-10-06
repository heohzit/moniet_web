package kr.or.iei.community.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.community.model.vo.Community;
import kr.or.iei.community.model.vo.CommunityType;

@Mapper
public interface CommunityDao {

	List communityList();

	int insertCommunity(Community c);

	int insertCommunityType(CommunityType type);

}
